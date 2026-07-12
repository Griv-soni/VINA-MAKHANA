/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div id="app-container" className="flex flex-col min-h-screen bg-brand-bg select-none selection:bg-gold-accent selection:text-white font-sans text-walnut-brown">
          
          {/* Main sticky top header/navigation */}
          <Navbar />
 
          {/* Core Page content rendered dynamically */}
          <main id="main-content" className="flex-grow pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/reviews" element={<Contact />} />
              
              {/* Fallback routing redirecting to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Sticky Mobile Bottom Navigation (only visible under md: breakpoint) */}
          <MobileNav />

          {/* Floating Action Buttons (Floating WhatsApp & Back to top) */}
          <FloatingButtons />

        </div>
      </Router>
    </AppProvider>
  );
}
