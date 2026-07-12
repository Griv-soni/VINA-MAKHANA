/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Grid, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileNav: React.FC = () => {
  const { cart } = useApp();
  const location = useLocation();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isActive = (path: string) => location.pathname === path;

  // Since we want this to direct to WhatsApp or phone contact
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Vina Makhana team, I'm visiting your website and would like to ask a question.");
    window.open(`https://wa.me/916356390666?text=${message}`, '_blank');
  };

  return (
    <div id="sticky-mobile-bottom-nav" className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 backdrop-blur-md border-t border-light-beige/60 py-2 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-center">
        <Link
          id="mobile-nav-home"
          to="/"
          className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-lg transition-colors duration-200 ${
            isActive('/') ? 'text-gold-accent' : 'text-walnut-brown/70'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Home</span>
        </Link>

        <Link
          id="mobile-nav-products"
          to="/products"
          className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-lg transition-colors duration-200 ${
            isActive('/products') ? 'text-gold-accent' : 'text-walnut-brown/70'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Products</span>
        </Link>

        <Link
          id="mobile-nav-cart"
          to="/cart"
          className={`relative flex flex-col items-center space-y-1 py-1 px-3 rounded-lg transition-colors duration-200 ${
            isActive('/cart') ? 'text-gold-accent' : 'text-walnut-brown/70'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-forest-green rounded-full">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] uppercase font-semibold tracking-wider">Cart</span>
        </Link>

        <button
          id="mobile-nav-whatsapp"
          onClick={handleWhatsAppClick}
          className="flex flex-col items-center space-y-1 py-1 px-3 rounded-lg text-forest-green hover:text-gold-accent transition-colors duration-200"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] uppercase font-semibold tracking-wider">WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
