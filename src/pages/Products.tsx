/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Heart, Sparkles, AlertCircle } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

export const Products: React.FC = () => {
  const { searchQuery, setSearchQuery, wishlist, products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Local active filters
  const [activeCategory, setActiveCategory] = useState<'all' | 'flavored' | 'raw' | 'wishlist'>('all');

  // Read query params if any
  useEffect(() => {
    const catParam = searchParams.get('category');
    const filterParam = searchParams.get('filter');

    if (filterParam === 'wishlist') {
      setActiveCategory('wishlist');
    } else if (catParam === 'flavored' || catParam === 'raw') {
      setActiveCategory(catParam);
    } else {
      setActiveCategory('all');
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: 'all' | 'flavored' | 'raw' | 'wishlist') => {
    setActiveCategory(cat);
    
    // update URL search params
    if (cat === 'all') {
      searchParams.delete('category');
      searchParams.delete('filter');
    } else if (cat === 'wishlist') {
      searchParams.delete('category');
      searchParams.set('filter', 'wishlist');
    } else {
      searchParams.delete('filter');
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Filter products based on search queries and selected category
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    if (activeCategory === 'flavored' && product.category !== 'flavored') return false;
    if (activeCategory === 'raw' && product.category !== 'raw') return false;
    if (activeCategory === 'wishlist' && !wishlist.includes(product.id)) return false;

    // 2. Search Query Filter
    if (!searchQuery) return true;
    const normQuery = searchQuery.toLowerCase().trim();
    return (
      product.name.toLowerCase().includes(normQuery) ||
      product.description.toLowerCase().includes(normQuery) ||
      product.ingredients.some(ing => ing.toLowerCase().includes(normQuery)) ||
      product.category.toLowerCase().includes(normQuery)
    );
  });

  return (
    <div id="products-page" className="py-16 sm:py-24 animate-fade-in min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-3">
            Pure Indulgence
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-forest-green tracking-tight leading-tight">
            Our Premium Collections
          </h1>
          <div className="w-20 h-1 bg-gold-accent mx-auto my-6 rounded-full" />
          <p className="text-walnut-brown/75 font-sans text-sm sm:text-base">
            Browse our selections of freshly packed, nutrient-dense makhana. Pick between our gourmet slow-roasted flavored varieties or our premium graded raw selections.
          </p>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="bg-white rounded-2xl border border-light-beige/40 p-4 sm:p-6 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Category Tabs */}
          <div id="category-filter-tabs" className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                activeCategory === 'all'
                  ? 'bg-forest-green text-white border-forest-green shadow-sm'
                  : 'bg-brand-bg text-walnut-brown/85 border-light-beige hover:bg-light-beige/45'
              }`}
            >
              All Offerings
            </button>
            <button
              onClick={() => handleCategoryChange('flavored')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                activeCategory === 'flavored'
                  ? 'bg-forest-green text-white border-forest-green shadow-sm'
                  : 'bg-brand-bg text-walnut-brown/85 border-light-beige hover:bg-light-beige/45'
              }`}
            >
              🌶️ Flavored Makhana
            </button>
            <button
              onClick={() => handleCategoryChange('raw')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                activeCategory === 'raw'
                  ? 'bg-forest-green text-white border-forest-green shadow-sm'
                  : 'bg-brand-bg text-walnut-brown/85 border-light-beige hover:bg-light-beige/45'
              }`}
            >
              🌾 Raw Makhana
            </button>
            <button
              onClick={() => handleCategoryChange('wishlist')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border flex items-center space-x-1.5 ${
                activeCategory === 'wishlist'
                  ? 'bg-red-500 text-white border-red-500 shadow-sm'
                  : 'bg-brand-bg text-red-500 border-light-beige hover:bg-red-50/50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${activeCategory === 'wishlist' ? 'fill-white' : ''}`} />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>

          {/* Search bar widget */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <input
              id="product-search-input"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 text-xs rounded-xl border border-light-beige focus:outline-none focus:ring-2 focus:ring-gold-accent focus:border-transparent text-walnut-brown font-sans placeholder-walnut-brown/40"
            />
            <Search className="w-4 h-4 text-walnut-brown/45 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-light-beige/40 rounded-3xl max-w-2xl mx-auto p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-light-beige/40 flex items-center justify-center mx-auto text-walnut-brown/60">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest-green">No Products Found</h3>
            <p className="text-xs sm:text-sm text-walnut-brown/75 font-sans leading-relaxed">
              {activeCategory === 'wishlist'
                ? "Your wishlist is currently empty. Explore our collections and click the heart icon to save products to your favorites!"
                : "We couldn't find any products matching your search filters. Try adjusting your query or resetting the filters."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-5 py-2.5 bg-forest-green hover:bg-gold-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm transition-all duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Quality Standard Note */}
        <div className="mt-20 border-t border-light-beige/40 pt-16 text-center">
          <div className="inline-flex items-center space-x-1 bg-gold-accent/15 text-forest-green font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 fill-forest-green stroke-none" />
            <span>Our Uncompromising Promise</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-green mb-4">Pristine Hygienic Processing</h3>
          <p className="text-xs sm:text-sm text-walnut-brown/70 font-sans max-w-2xl mx-auto leading-relaxed">
            Every purchase represents non-GMO certified seeds, processed at zero-touch clinical grading sites, and sealed under inert modified atmospheric conditions. Your health is our ultimate benchmark.
          </p>
        </div>

      </div>
    </div>
  );
};
