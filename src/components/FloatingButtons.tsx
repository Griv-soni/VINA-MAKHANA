/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

export const FloatingButtons: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello VINA MAKHANA! I would like to know more about your premium products.");
    window.open(`https://wa.me/916356390666?text=${message}`, '_blank');
  };

  return (
    <div id="floating-action-container" className="fixed bottom-20 md:bottom-8 right-6 z-40 flex flex-col space-y-3 items-center">
      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          className="w-12 h-12 bg-white text-forest-green border border-light-beige hover:bg-light-beige hover:text-walnut-brown rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating WhatsApp Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={openWhatsApp}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
        <span className="absolute right-16 scale-0 bg-forest-green text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-md transition-all duration-200 origin-right group-hover:scale-100 whitespace-nowrap">
          Order on WhatsApp
        </span>
      </button>
    </div>
  );
};
