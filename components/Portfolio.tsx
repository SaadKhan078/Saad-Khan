import React from 'react';
import { Project } from '../types';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const projects: Project[] = [
  {
    title: 'Apex Plumbing Co.',
    category: 'Local Business Website',
    year: '2024',
    image: 'https://picsum.photos/800/600?random=1'
  },
  {
    title: 'Bella Vita Salon',
    category: 'Booking System & UI',
    year: '2024',
    image: 'https://picsum.photos/800/600?random=2'
  },
  {
    title: 'TechGear Store',
    category: 'Shopify E-Commerce',
    year: '2023',
    image: 'https://picsum.photos/800/600?random=3'
  },
  {
    title: 'GreenLeaf Landscaping',
    category: 'Brand Identity & Web',
    year: '2023',
    image: 'https://picsum.photos/800/600?random=4'
  },
  {
    title: 'Urban Cafe',
    category: 'Social Media Campaign',
    year: '2024',
    image: 'https://picsum.photos/800/600?random=5'
  },
  {
    title: 'Dr. Smith Dental',
    category: 'SEO & Website',
    year: '2023',
    image: 'https://picsum.photos/800/600?random=6'
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Selected Work</h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full mb-6"></div>
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              We build digital products that help businesses grow. Here is a selection of our recent projects across web development and branding.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-white font-semibold border-b border-blue-500 pb-1 hover:text-blue-400 transition-colors">
            View Full Portfolio
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-slate-800 cursor-pointer shadow-xl">
              {/* Image with Zoom Effect */}
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                />
              </div>
              
              {/* Dark Gradient Overlay - Fades in on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content Overlay - Slides Up */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold tracking-wider uppercase rounded-full mb-3 backdrop-blur-sm border border-blue-500/20">
                    {project.category}
                  </span>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-100 transition-colors">{project.title}</h3>
                      <p className="text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                        {project.year} • Case Study
                      </p>
                    </div>
                    
                    <div className="bg-white text-slate-900 p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 shadow-lg hover:bg-blue-500 hover:text-white">
                      <ExternalLink size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;