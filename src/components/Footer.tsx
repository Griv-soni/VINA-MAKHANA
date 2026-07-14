/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#1C3A2B] text-white border-t border-gold-accent/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gold-accent flex items-center justify-center text-forest-green shadow-md">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold tracking-wider text-white leading-none">
                  VINA MAKHANA
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-gold-accent uppercase font-medium">
                  Pure. Healthy. Delicious
                </span>
              </div>
            </Link>
            
            <p className="text-xs sm:text-sm text-light-beige/75 leading-relaxed font-sans">
              Crafting premium quality, handpicked Fox Nuts (Makhana) sourced directly from deep water lily farms. We represent organic integrity, hygienic packaging, and natural luxury in every gourmet crunch.
            </p>

            <div className="flex items-center space-x-3 text-xs text-gold-accent font-medium">
              <span>🌾 100% Organic</span>
              <span>•</span>
              <span>🛡️ Hygienically Packed</span>
              <span>•</span>
              <span>❤️ Clean Snacking</span>
            </div>
          </div>

          {/* Page Links Col */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-light-beige/80">
              <li>
                <Link to="/" className="hover:text-gold-accent transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-accent transition-colors duration-200">Our Collection</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-accent transition-colors duration-200">Our Story</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-accent transition-colors duration-200">Get In Touch</Link>
              </li>
            </ul>
          </div>

          {/* Products Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold-accent">Our Selection</h4>
            <ul className="space-y-2 text-sm text-light-beige/80">
              <li>
                <Link to="/products?category=flavored" className="hover:text-gold-accent transition-colors duration-200 flex items-center justify-between group">
                  <span>Spice & Cheese Flavored</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-gold-accent transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/products?category=raw" className="hover:text-gold-accent transition-colors duration-200 flex items-center justify-between group">
                  <span>Raw Organic 5 Suta Grade</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-gold-accent transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/products?category=raw" className="hover:text-gold-accent transition-colors duration-200 flex items-center justify-between group">
                  <span>Raw Luxury 6 Suta Grade</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-gold-accent transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-gold-accent">Connect With Us</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-light-beige/80">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                <span>+91 63563 90666</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                <span>vinamakhana1607@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                <span>Navkar Heights, Ognaj Circle, Ognaj, Ahmedabad - 380060</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Credentials */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-light-beige/60">
          <div>
            <span>© {currentYear} VINA MAKHANA. All rights reserved.</span>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-1 font-sans">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>by <strong className="text-gold-accent font-semibold">Griv J Soni</strong> for a healthy lifestyle.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
