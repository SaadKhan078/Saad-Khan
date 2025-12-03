import React from 'react';
import { ArrowRight, Play, Star, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 bg-brand-950 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Blue Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        {/* Secondary Purple Glow */}
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Top Rated Agency 2025
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Digital Presence.</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
            SK Web Tech builds premium websites, AI solutions, and brand identities. We turn complex ideas into elegant, high-converting digital realities for US businesses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12">
            <a
              href="#contact"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-[0_10px_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Get Free Proposal
              <ArrowRight size={20} />
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <Play size={18} fill="currentColor" />
              View Our Work
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 border-t border-white/10 pt-8">
             <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://randomuser.me/api/portraits/men/${i+20}.jpg`} className="w-10 h-10 rounded-full border-2 border-brand-950" alt="Client" />
                  ))}
                </div>
                <div className="text-left ml-2">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">100+ Happy Clients</p>
                </div>
             </div>
             <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
             <div className="text-slate-400 text-sm font-medium">
               "Professional, fast, and simply <br/> the best developers."
             </div>
          </div>
        </div>
        
        {/* 3D Visual */}
        <div className="relative hidden lg:block perspective-1000">
           <div className="relative z-10 transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-all duration-700 ease-out">
              <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>
                <div className="flex items-center gap-2 mb-4 px-2 pt-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                  alt="Analytics Dashboard" 
                  className="rounded-lg w-full h-auto shadow-lg"
                />
                
                {/* Floating Stats Card */}
                <div className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Projects Done</div>
                      <div className="text-xl font-bold text-slate-900">100% Success</div>
                    </div>
                  </div>
                </div>
              </div>
           </div>
           
           {/* Decorative Elements */}
           <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
           <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;