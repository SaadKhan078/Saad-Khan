import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Contact from './components/Contact';
import AiLab from './components/AiLab';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <AiLab />
      <Portfolio />
      <Team />
      {/* Why Choose Us & Testimonials could go here, simplified into Services/Contact for now for brevity, 
          but adding a quick Testimonial placeholder within flow */}
      <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-12">What Our Clients Say</h2>
              <div className="grid md:grid-cols-3 gap-8">
                  {[1,2,3].map(i => (
                      <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                          <div className="flex justify-center mb-4 text-yellow-400">★★★★★</div>
                          <p className="text-slate-600 mb-4">"SK Web Tech transformed our business online. The team is professional, fast, and delivered exactly what we needed."</p>
                          <p className="font-bold text-slate-900">- John Doe, Business Owner</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      <Contact />
    </div>
  );
}

export default App;
