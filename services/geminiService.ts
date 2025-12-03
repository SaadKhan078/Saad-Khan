import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

// Ensure API Key is available
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// --- Search Grounding ---
export const searchQueries = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return { text, groundingChunks };
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

// --- Image Editing (Gemini 2.5 Flash Image) ---
export const editImageWithPrompt = async (base64Image: string, prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/jpeg', // Assuming JPEG for simplicity from canvas/input
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Parse response for image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image edit error:", error);
    throw error;
  }
};

// --- Veo Video Generation ---
export const generateVeoVideo = async (imageBytes: string, prompt: string = "Animate this image") => {
    // Veo requires user-selected key
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
             throw new Error("API_KEY_MISSING");
        }
    }
    
    // Create new instance with potentially updated key environment
    const veoAi = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        let operation = await veoAi.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            image: {
                imageBytes: imageBytes,
                mimeType: 'image/png',
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9'
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
            operation = await veoAi.operations.getVideosOperation({ operation: operation });
        }

        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!videoUri) throw new Error("No video URI returned");

        // Fetch the actual video bytes
        const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        return URL.createObjectURL(blob);

    } catch (error) {
        console.error("Veo generation error:", error);
        throw error;
    }
};

// --- Live API Helpers ---
// Basic audio encoding/decoding helpers as per guidelines
function base64ToUint8Array(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// Live Session Class Wrapper
export class LiveSession {
    private sessionPromise: Promise<any> | null = null;
    private inputAudioContext: AudioContext | null = null;
    private outputAudioContext: AudioContext | null = null;
    private nextStartTime = 0;
    private sources = new Set<AudioBufferSourceNode>();
    private stream: MediaStream | null = null;
    private processor: ScriptProcessorNode | null = null;
    private sourceNode: MediaStreamAudioSourceNode | null = null;

    constructor(private onTranscription: (text: string, isUser: boolean) => void) {}

    async connect() {
        this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        this.sessionPromise = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            callbacks: {
                onopen: () => {
                    console.log("Live session connected");
                    this.startAudioStream();
                },
                onmessage: async (message: LiveServerMessage) => {
                   this.handleMessage(message);
                },
                onerror: (e) => console.error("Live session error", e),
                onclose: () => console.log("Live session closed"),
            },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
                },
                inputAudioTranscription: {},
                outputAudioTranscription: {},
                systemInstruction: "You are a helpful AI assistant for SK Web Tech. Be professional and concise.",
            },
        });
    }

    private startAudioStream() {
        if (!this.inputAudioContext || !this.stream || !this.sessionPromise) return;

        this.sourceNode = this.inputAudioContext.createMediaStreamSource(this.stream);
        this.processor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);
        
        this.processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBlob = this.createBlob(inputData);
            
            this.sessionPromise?.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
            });
        };

        this.sourceNode.connect(this.processor);
        this.processor.connect(this.inputAudioContext.destination);
    }

    private async handleMessage(message: LiveServerMessage) {
         // Transcriptions
        if (message.serverContent?.outputTranscription?.text) {
             this.onTranscription(message.serverContent.outputTranscription.text, false);
        }
        if (message.serverContent?.inputTranscription?.text) {
             this.onTranscription(message.serverContent.inputTranscription.text, true);
        }

        // Audio Output
        const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
        if (audioData && this.outputAudioContext) {
             this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
             
             const audioBytes = base64ToUint8Array(audioData);
             const audioBuffer = await this.decodeAudioData(audioBytes, this.outputAudioContext);
             
             const source = this.outputAudioContext.createBufferSource();
             source.buffer = audioBuffer;
             source.connect(this.outputAudioContext.destination);
             
             source.addEventListener('ended', () => this.sources.delete(source));
             source.start(this.nextStartTime);
             this.nextStartTime += audioBuffer.duration;
             this.sources.add(source);
        }

        if (message.serverContent?.interrupted) {
            this.sources.forEach(s => s.stop());
            this.sources.clear();
            this.nextStartTime = 0;
        }
    }

    private createBlob(data: Float32Array) {
        const l = data.length;
        const int16 = new Int16Array(l);
        for (let i = 0; i < l; i++) {
            int16[i] = data[i] * 32768;
        }
        const uint8 = new Uint8Array(int16.buffer);
        const base64 = arrayBufferToBase64(uint8.buffer);
        
        return {
            data: base64,
            mimeType: 'audio/pcm;rate=16000',
        };
    }

    private async decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
        const dataInt16 = new Int16Array(data.buffer);
        const frameCount = dataInt16.length; 
        const buffer = ctx.createBuffer(1, frameCount, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i] / 32768.0;
        }
        return buffer;
    }

    disconnect() {
        this.sources.forEach(s => s.stop());
        this.sources.clear();
        this.stream?.getTracks().forEach(t => t.stop());
        this.processor?.disconnect();
        this.sourceNode?.disconnect();
        this.inputAudioContext?.close();
        this.outputAudioContext?.close();
        this.sessionPromise?.then(session => session.close());
    }
}
