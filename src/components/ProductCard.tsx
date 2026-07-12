/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const selectedOption = product.weightOptions[selectedWeightIdx];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, selectedOption.label, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group bg-white rounded-2xl border border-light-beige/40 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:border-light-beige flex flex-col justify-between">
      
      {/* Visual Header / Image Container */}
      <div className="relative aspect-square overflow-hidden bg-brand-bg/50 group">
        
        {/* Lazy load image with referrerPolicy */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badges Column */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {product.bestseller && (
            <span className="inline-flex items-center space-x-1 bg-gold-accent text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
              <Sparkles className="w-2.5 h-2.5 fill-white stroke-none" />
              <span>Bestseller</span>
            </span>
          )}
          {product.freshlyPacked && (
            <span className="bg-forest-green text-white font-semibold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
              Freshly Packed
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isWishlisted
              ? 'bg-red-50 text-red-500 shadow-md scale-110'
              : 'bg-white/80 backdrop-blur-sm text-walnut-brown hover:bg-white hover:text-red-500 hover:scale-105'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>

        {/* Action Overlays for Hover States */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <Link
            to={`/product/${product.id}`}
            className="w-11 h-11 bg-white text-forest-green rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Category & Badge */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-accent">
              {product.category === 'flavored' ? '🌶️ Gourmet Flavors' : '🌾 Raw Organic'}
            </span>
          </div>

          {/* Name */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-lg font-bold text-forest-green hover:text-gold-accent transition-colors duration-200 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-walnut-brown/75 font-sans mt-2 line-clamp-2 h-8 leading-relaxed">
            {product.description}
          </p>

          {/* Weight Options Picker */}
          <div className="mt-4 flex flex-wrap gap-2">
            {product.weightOptions.map((opt, idx) => (
              <button
                key={opt.label}
                onClick={() => setSelectedWeightIdx(idx)}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all duration-200 ${
                  selectedWeightIdx === idx
                    ? 'bg-light-beige text-walnut-brown border-walnut-brown/40'
                    : 'bg-white text-walnut-brown/60 border-light-beige hover:border-walnut-brown/20'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing and CTA Button Row */}
        <div className="mt-6 pt-4 border-t border-light-beige/40 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-walnut-brown/50 font-bold leading-none">Price</span>
            <span className="text-lg font-bold text-forest-green font-serif mt-1">
              ₹{selectedOption.price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              added
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-forest-green text-white hover:bg-gold-accent hover:shadow-lg shadow-sm active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add To Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
