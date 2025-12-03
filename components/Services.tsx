import React from 'react';
import { Layout, ShoppingBag, Clapperboard, Palette, PenTool, TrendingUp, ArrowRight } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    title: 'Custom Web Development',
    description: 'Blazing fast, secure, and scalable websites built with React and Next.js technology.',
    icon: <Layout className="w-6 h-6" />
  },
  {
    title: 'E-Commerce Solutions',
    description: 'High-converting Shopify and WordPress stores tailored to your brand.',
    icon: <ShoppingBag className="w-6 h-6" />
  },
  {
    title: 'Video Editing & Motion',
    description: 'Professional video production to tell your brand story and engage customers.',
    icon: <Clapperboard className="w-6 h-6" />
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive and beautiful interfaces that users love to interact with.',
    icon: <Palette className="w-6 h-6" />
  },
  {
    title: 'Content Strategy',
    description: 'SEO-rich content writing that ranks high and converts visitors into leads.',
    icon: <PenTool className="w-6 h-6" />
  },
  {
    title: 'Digital Marketing',
    description: 'Data-driven campaigns to grow your audience and increase revenue.',
    icon: <TrendingUp className="w-6 h-6" />
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-wider uppercase text-xs mb-3 block">What We Do</span>
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">Full-Service Digital Growth</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From code to content, we provide everything you need to succeed online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <a href="#contact" className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors">
                Learn More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;