import React from 'react';
import { TeamMember } from '../types';
import { Linkedin, Twitter, Github } from 'lucide-react';

const team: TeamMember[] = [
  {
    name: 'Saad Khan',
    role: 'Founder & Lead Developer',
    // USER INSTRUCTION: You can replace this URL with your own photo URL.
    // Ensure the URL is publicly accessible (like from Imgur, Unsplash, or your hosted assets).
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
  },
  {
    name: 'Muhammad Ali',
    role: 'Video Specialist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Hina Fatima',
    role: 'Content & SEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Ahmed Noor',
    role: 'Creative Designer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
];

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-wider uppercase text-xs mb-3 block">Our Team</span>
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">Meet The <span className="text-brand-600">Experts</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A dedicated team of developers, designers, and strategists ready to elevate your business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group relative">
              <div className="relative w-full aspect-[4/5] mb-4 rounded-2xl overflow-hidden shadow-lg bg-slate-100 border border-slate-100">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Social Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
                   <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-brand-500 transition-all hover:-translate-y-1"><Linkedin size={18} /></a>
                   <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-brand-500 transition-all hover:-translate-y-1"><Twitter size={18} /></a>
                   <a href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-brand-500 transition-all hover:-translate-y-1"><Github size={18} /></a>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{member.name}</h3>
                <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wide">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;