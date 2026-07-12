/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { cart, wishlist, searchQuery, setSearchQuery } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Makhana', path: '/products' },
    { name: 'Reviews', path: '/contact?reviews=true' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full transition-all duration-300 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link id="nav-logo" to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:rotate-12">
              <Leaf className="w-5 h-5 text-gold-accent" />
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold tracking-wider text-forest-green leading-none">
                VINA MAKHANA
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-gold-accent uppercase font-medium">
                Pure. Healthy. Delicious
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm font-medium uppercase tracking-widest hover:text-gold-accent transition-colors duration-200 ${
                  isActive(link.path) ? 'text-gold-accent' : 'text-walnut-brown/90'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-accent" />
                )}
              </Link>
            ))}
          </nav>

          {/* Utility Icons */}
          <div id="nav-utilities" className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Toggle */}
            <button
              id="search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-walnut-brown hover:text-gold-accent hover:bg-light-beige/30 rounded-full transition-colors duration-200 relative"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              id="wishlist-link"
              to="/products?filter=wishlist"
              className="p-2 text-walnut-brown hover:text-gold-accent hover:bg-light-beige/30 rounded-full transition-colors duration-200 relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-gold-accent rounded-full transform translate-x-1 -translate-y-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              id="cart-link"
              to="/cart"
              className="p-2 text-walnut-brown hover:text-gold-accent hover:bg-light-beige/30 rounded-full transition-colors duration-200 relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-forest-green rounded-full transform translate-x-1 -translate-y-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-walnut-brown hover:text-gold-accent hover:bg-light-beige/30 rounded-full transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Search Bar Drawer */}
      {searchOpen && (
        <div id="search-drawer" className="border-t border-light-beige/50 bg-white py-4 px-4 sm:px-6 lg:px-8 shadow-inner animate-fade-in">
          <div className="max-w-3xl mx-auto flex items-center relative">
            <input
              id="search-input"
              type="text"
              placeholder="Search premium flavored or raw makhana..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg bg-brand-bg border border-light-beige focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent text-walnut-brown font-sans placeholder-walnut-brown/40"
              autoFocus
            />
            <Search className="w-5 h-5 text-walnut-brown/40 absolute left-4" />
            <button
              id="close-search-btn"
              onClick={() => {
                setSearchQuery('');
                setSearchOpen(false);
              }}
              className="ml-3 px-4 py-2 text-sm text-walnut-brown hover:text-gold-accent"
            >
              Clear
            </button>
          </div>
          {searchQuery && (
            <div className="max-w-3xl mx-auto mt-2 text-xs text-walnut-brown/60 text-right">
              Showing search results in <Link to="/products" className="text-gold-accent underline">Our Collection</Link>
            </div>
          )}
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-light-beige bg-white/95 backdrop-blur-md transition-all duration-300">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-md text-base font-medium tracking-wider uppercase transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'bg-light-beige/50 text-gold-accent'
                    : 'text-walnut-brown hover:bg-brand-bg hover:text-gold-accent'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/products?filter=wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-md text-base font-medium tracking-wider uppercase text-walnut-brown hover:bg-brand-bg hover:text-gold-accent"
            >
              <span>Wishlist</span>
              <span className="bg-gold-accent text-white px-2 py-0.5 rounded-full text-xs">
                {wishlistCount}
              </span>
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-md text-base font-medium tracking-wider uppercase text-walnut-brown hover:bg-brand-bg hover:text-gold-accent"
            >
              <span>Cart</span>
              <span className="bg-forest-green text-white px-2 py-0.5 rounded-full text-xs">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
