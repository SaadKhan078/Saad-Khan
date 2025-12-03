import React, { useState, useRef, useEffect } from 'react';
import { Search, Image as ImageIcon, Mic, Film, Send, Sparkles, Loader2, StopCircle } from 'lucide-react';
import { searchQueries, editImageWithPrompt, generateVeoVideo, LiveSession } from '../services/geminiService';

const AiLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'edit' | 'veo' | 'live'>('search');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{ text: string; sources?: any[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Edit State
  const [editImage, setEditImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [editedResult, setEditedResult] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Veo State
  const [veoImage, setVeoImage] = useState<string | null>(null);
  const [veoResult, setVeoResult] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [veoKeyNeeded, setVeoKeyNeeded] = useState(false);

  // Live State
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [transcripts, setTranscripts] = useState<Array<{text: string, isUser: boolean}>>([]);
  const liveSessionRef = useRef<LiveSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Handlers ---

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await searchQueries(searchQuery);
      setSearchResult({ text: res.text, sources: res.groundingChunks });
    } catch (e) {
      console.error(e);
      alert("Search failed. Check console.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (s: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = async () => {
    if (!editImage || !editPrompt) return;
    setIsEditing(true);
    try {
      // Remove data URL prefix for API
      const base64 = editImage.split(',')[1];
      const result = await editImageWithPrompt(base64, editPrompt);
      if (result) setEditedResult(result);
    } catch (e) {
      console.error(e);
      alert("Editing failed.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleVeoGenerate = async () => {
    if (!veoImage) return;
    
    // Check key for Veo
    if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
            setVeoKeyNeeded(true);
            return;
        }
    }

    setIsGeneratingVideo(true);
    try {
        const base64 = veoImage.split(',')[1];
        const videoUrl = await generateVeoVideo(base64);
        setVeoResult(videoUrl);
    } catch (e: any) {
        console.error(e);
        if (e.message === "API_KEY_MISSING") {
             setVeoKeyNeeded(true);
        } else {
            alert("Video generation failed.");
        }
    } finally {
        setIsGeneratingVideo(false);
    }
  };

  const handleSelectKey = async () => {
      if(window.aistudio) {
          await window.aistudio.openSelectKey();
          setVeoKeyNeeded(false);
      }
  };

  const toggleLive = async () => {
    if (isLiveConnected) {
        liveSessionRef.current?.disconnect();
        setIsLiveConnected(false);
    } else {
        try {
            const session = new LiveSession((text, isUser) => {
                setTranscripts(prev => [...prev, { text, isUser }]);
            });
            await session.connect();
            liveSessionRef.current = session;
            setIsLiveConnected(true);
        } catch (e) {
            console.error(e);
            alert("Could not connect to Live API. Ensure microphone permissions are granted.");
        }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts]);

  useEffect(() => {
      // Cleanup live session on unmount
      return () => {
          liveSessionRef.current?.disconnect();
      }
  }, []);


  return (
    <section id="ai-lab" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">SK AI Innovation Lab</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Experience our cutting-edge AI capabilities powered by Google's Gemini models.
            We integrate these technologies into our client projects.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {[
              { id: 'search', label: 'Smart Search', icon: <Search size={18} /> },
              { id: 'edit', label: 'Image Editor', icon: <ImageIcon size={18} /> },
              { id: 'veo', label: 'Veo Animation', icon: <Film size={18} /> },
              { id: 'live', label: 'Voice Assistant', icon: <Mic size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 min-h-[400px]">
            {/* Search Tab */}
            {activeTab === 'search' && (
              <div className="max-w-3xl mx-auto">
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask about current web trends (uses Google Search)..."
                    className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSearching ? <Loader2 className="animate-spin" /> : <Search />}
                    Search
                  </button>
                </div>
                {searchResult && (
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <div className="prose text-slate-700 mb-4 whitespace-pre-wrap">{searchResult.text}</div>
                    {searchResult.sources && searchResult.sources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <h4 className="text-sm font-semibold text-slate-500 uppercase mb-2">Sources</h4>
                        <ul className="space-y-1">
                          {searchResult.sources.map((src, i) => (
                            src.web?.uri ? (
                              <li key={i}>
                                <a 
                                    href={src.web.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-600 hover:underline text-sm truncate block"
                                >
                                  {src.web.title || src.web.uri}
                                </a>
                              </li>
                            ) : null
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Image Edit Tab */}
            {activeTab === 'edit' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-xl h-64 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden group">
                    {editImage ? (
                      <img src={editImage} alt="Original" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="mx-auto h-10 w-10 text-slate-400 mb-2" />
                        <p className="text-slate-500">Upload an image to edit</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setEditImage)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="e.g., 'Add a retro filter', 'Make it cybernetic'"
                      className="flex-1 p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleEditImage}
                      disabled={!editImage || isEditing}
                      className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isEditing ? <Loader2 className="animate-spin" /> : <Sparkles />}
                    </button>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-xl h-64 md:h-auto flex items-center justify-center bg-slate-100">
                  {editedResult ? (
                    <img src={editedResult} alt="Edited" className="w-full h-full object-contain rounded-xl" />
                  ) : (
                    <p className="text-slate-400">Result will appear here</p>
                  )}
                </div>
              </div>
            )}

            {/* Veo Tab */}
            {activeTab === 'veo' && (
              <div className="max-w-3xl mx-auto space-y-6">
                 {veoKeyNeeded && (
                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-center justify-between">
                          <span className="text-amber-800">Veo requires a paid API key.</span>
                          <button onClick={handleSelectKey} className="text-sm bg-amber-200 text-amber-900 px-3 py-1 rounded hover:bg-amber-300">
                              Select Key
                          </button>
                           <a 
                             href="https://ai.google.dev/gemini-api/docs/billing" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="text-xs text-amber-700 hover:underline"
                            >
                                Billing Info
                            </a>
                      </div>
                  )}
                <div className="border-2 border-dashed border-slate-300 rounded-xl h-48 flex flex-col items-center justify-center bg-slate-50 relative">
                    {veoImage ? (
                         <img src={veoImage} alt="Input" className="h-full object-contain" />
                    ) : (
                        <div className="text-center">
                            <Film className="mx-auto h-10 w-10 text-slate-400 mb-2" />
                            <p className="text-slate-500">Upload image for video generation</p>
                        </div>
                    )}
                   <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setVeoImage)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                <button
                    onClick={handleVeoGenerate}
                    disabled={!veoImage || isGeneratingVideo}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {isGeneratingVideo ? <Loader2 className="animate-spin" /> : <Film />}
                    Generate Video (Veo)
                </button>
                {veoResult && (
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2 text-slate-700">Generated Video:</h4>
                        <video src={veoResult} controls autoPlay loop className="w-full rounded-lg shadow-lg" />
                    </div>
                )}
              </div>
            )}

            {/* Live Tab */}
            {activeTab === 'live' && (
              <div className="max-w-2xl mx-auto flex flex-col h-[500px]">
                <div className="flex-1 overflow-y-auto bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 space-y-4">
                  {transcripts.length === 0 && (
                      <div className="text-center text-slate-400 mt-20">
                          <Mic className="mx-auto h-12 w-12 mb-2 opacity-20" />
                          <p>Start a conversation to see live transcription.</p>
                      </div>
                  )}
                  {transcripts.map((t, i) => (
                    <div key={i} className={`flex ${t.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${t.isUser ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>
                        {t.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={toggleLive}
                    className={`h-16 w-16 rounded-full flex items-center justify-center transition-all ${
                      isLiveConnected 
                        ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                        : 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                    }`}
                  >
                    {isLiveConnected ? <StopCircle className="text-white h-8 w-8" /> : <Mic className="text-white h-8 w-8" />}
                  </button>
                </div>
                <p className="text-center text-sm text-slate-500 mt-2">
                    {isLiveConnected ? "Listening... (Gemini 2.5 Live)" : "Click mic to start"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiLab;