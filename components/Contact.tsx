import React from 'react';
import { Mail, Phone, MessageCircle, MapPin, ArrowRight, Facebook, Twitter, Linkedin, Instagram, Code2 } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <>
      <section id="contact" className="py-24 bg-brand-950 relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-900 transform -skew-x-12 opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="text-white">
              <span className="text-brand-500 font-bold tracking-wider uppercase text-xs mb-3 block">Get In Touch</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Let's Build Your <span className="text-brand-500">Future.</span></h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                Ready to transform your business? Contact us for a free consultation. We typically respond within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email Us</p>
                    <p className="font-bold text-lg">contact@skwebtech.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">WhatsApp</p>
                    <p className="font-bold text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>

                 <div className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="font-bold text-lg">New York, USA</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-white p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send Message</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Company</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Business Name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-600 text-white py-4 rounded-lg font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2">
                  Send Message <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 text-slate-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-brand-600 p-1.5 rounded-lg">
                  <Code2 className="text-white w-5 h-5" />
                </div>
                <span className="font-display font-bold text-xl text-white">
                  SK Web<span className="text-brand-500">Tech</span>
                </span>
              </div>
              <p className="mb-6 leading-relaxed text-sm">
                Empowering businesses with cutting-edge digital solutions. We design, develop, and grow your online presence.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-brand-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-brand-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-brand-500 transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">E-Commerce</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Digital Marketing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-sm mb-4">Subscribe to get the latest news and updates.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm w-full focus:border-brand-500 outline-none text-white" />
                <button className="bg-brand-600 px-3 py-2 rounded-lg text-white hover:bg-brand-700 transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2025 SK Web Tech. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" target="_blank" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" target="_blank" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;