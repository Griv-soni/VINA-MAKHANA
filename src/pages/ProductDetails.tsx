/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  Award,
  Sparkles,
  Info,
  Leaf,
  ChevronLeft,
  ShieldCheck,
  PackageOpen,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, products } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'benefits' | 'ingredients'>('desc');
  const [activeImage, setActiveImage] = useState('');
  const [added, setAdded] = useState(false);

  // Load product details
  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      setActiveImage(found.image);
      setSelectedWeightIdx(0);
      setSelectedQty(1);
      setActiveTab('desc');
    } else {
      // Redirect to products if not found
      navigate('/products');
    }
  }, [id, navigate, products]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto" />
      </div>
    );
  }

  const selectedOption = product.weightOptions[selectedWeightIdx];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, selectedOption.label, selectedQty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleIncrement = () => setSelectedQty((prev) => prev + 1);
  const handleDecrement = () => setSelectedQty((prev) => (prev > 1 ? prev - 1 : 1));

  // Find related products (same category, excluding current)
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div id="product-details-page" className="py-12 sm:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold-accent hover:text-forest-green transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </Link>
        </div>

        {/* Product Visual & Buy Panel Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left: Interactive Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Active Display Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-brand-bg border border-light-beige shadow-md group">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Badges Column */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.bestseller && (
                  <span className="inline-flex items-center space-x-1 bg-gold-accent text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
                    <Sparkles className="w-3 h-3 fill-white stroke-none" />
                    <span>Bestseller</span>
                  </span>
                )}
                {product.freshlyPacked && (
                  <span className="bg-forest-green text-white font-semibold text-[10px] uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
                    Freshly Packed
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            {product.gallery && product.gallery.length > 0 && (
              <div id="gallery-thumbnails" className="flex gap-3">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === img
                        ? 'border-gold-accent scale-105 shadow-sm'
                        : 'border-light-beige/60 hover:border-gold-accent/40 bg-brand-bg'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} gallery ${i}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Purchase Details Panel */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Headers */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-accent block">
                {product.category === 'flavored' ? '🌶️ Gourmet Baked Series' : '🌾 Premium Graded Raw Series'}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price & Rating Header Row */}
            <div className="flex items-center justify-between pb-6 border-b border-light-beige/60">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-walnut-brown/50 font-bold leading-none">Selected Price</span>
                <span className="text-3xl font-bold text-forest-green font-serif mt-1">
                  ₹{selectedOption.price}
                </span>
              </div>
              
              {/* Star Rating Mock */}
              <div className="text-right">
                <div className="flex items-center text-gold-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                  <span className="text-xs text-walnut-brown/70 font-semibold ml-1.5">(4.9/5)</span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-walnut-brown/50 block mt-0.5 font-semibold">Genuine Reviews</span>
              </div>
            </div>

            {/* Short Descr */}
            <p className="text-xs sm:text-sm text-walnut-brown/85 font-sans leading-relaxed">
              {product.description}
            </p>

            {/* Weight Picker options */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-green block">
                Select Weight Option
              </span>
              <div id="details-weight-picker" className="flex flex-wrap gap-3">
                {product.weightOptions.map((opt, idx) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedWeightIdx(idx)}
                    className={`px-5 py-3 rounded-xl border-2 text-xs font-extrabold tracking-wider transition-all duration-300 flex flex-col items-center justify-center min-w-[90px] ${
                      selectedWeightIdx === idx
                        ? 'border-gold-accent bg-light-beige text-walnut-brown shadow-sm scale-102'
                        : 'border-light-beige bg-white text-walnut-brown/70 hover:border-gold-accent/40'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="text-[10px] font-sans font-medium text-walnut-brown/60 mt-1">₹{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action row */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              
              {/* Qty incrementer */}
              <div id="details-qty-selector" className="flex items-center border border-light-beige rounded-xl p-1 bg-white shrink-0 shadow-sm">
                <button
                  onClick={handleDecrement}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-walnut-brown hover:bg-light-beige transition-colors"
                  aria-label="Decrease Quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-forest-green">
                  {selectedQty}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-walnut-brown hover:bg-light-beige transition-colors"
                  aria-label="Increase Quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                id="details-add-to-cart-btn"
                onClick={handleAddToCart}
                className={`flex-grow flex items-center justify-center space-x-3 px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 shadow-md ${
                  added
                    ? 'bg-emerald-600 text-white shadow-inner'
                    : 'bg-forest-green text-white hover:bg-gold-accent hover:shadow-lg active:scale-95'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Cart successfully!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add To Cart • ₹{selectedOption.price * selectedQty}</span>
                  </>
                )}
              </button>

              {/* Wishlist Toggle Heart */}
              <button
                onClick={toggleWishlist.bind(null, product.id)}
                className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0 shadow-sm ${
                  isWishlisted
                    ? 'border-red-100 bg-red-50 text-red-500 scale-102'
                    : 'border-light-beige bg-white text-walnut-brown hover:border-gold-accent/40'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </button>

            </div>

            {/* Micro details bullets */}
            <div className="pt-6 border-t border-light-beige/40 grid grid-cols-2 gap-4 text-xs text-walnut-brown/70 font-sans">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-gold-accent" />
                <span>100% Sun-Dried Raw Seeds</span>
              </div>
              <div className="flex items-center space-x-2">
                <PackageOpen className="w-4 h-4 text-gold-accent" />
                <span>Eco-Friendly Premium Jar</span>
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Detail Tabs Row (Description, Benefits, Ingredients) */}
        <div id="details-tabs-container" className="border-t border-light-beige/60 pt-16 mb-20">
          
          {/* Tab buttons */}
          <div className="flex border-b border-light-beige max-w-lg mb-8">
            <button
              onClick={() => setActiveTab('desc')}
              className={`py-3.5 px-6 text-xs uppercase font-bold tracking-widest transition-all relative ${
                activeTab === 'desc' ? 'text-gold-accent' : 'text-walnut-brown/60 hover:text-walnut-brown'
              }`}
            >
              Description
              {activeTab === 'desc' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gold-accent" />}
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`py-3.5 px-6 text-xs uppercase font-bold tracking-widest transition-all relative ${
                activeTab === 'benefits' ? 'text-gold-accent' : 'text-walnut-brown/60 hover:text-walnut-brown'
              }`}
            >
              Health Benefits
              {activeTab === 'benefits' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gold-accent" />}
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`py-3.5 px-6 text-xs uppercase font-bold tracking-widest transition-all relative ${
                activeTab === 'ingredients' ? 'text-gold-accent' : 'text-walnut-brown/60 hover:text-walnut-brown'
              }`}
            >
              Ingredients
              {activeTab === 'ingredients' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gold-accent" />}
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="bg-white rounded-2xl border border-light-beige/40 p-6 sm:p-8 shadow-sm">
            
            {activeTab === 'desc' && (
              <div className="space-y-4 text-xs sm:text-sm text-walnut-brown/80 leading-relaxed font-sans max-w-3xl">
                <p className="font-serif italic text-lg text-forest-green font-bold mb-2">
                  Premium Sourcing Integrity
                </p>
                <p>{product.longDescription}</p>
                <p>
                  To preserve the delicate trace-mineral layers of magnesium and iron, we slow-toast our seeds at precise temperatures. VINA MAKHANA guarantees absolute purity and zero-chemical intervention. Ideal as a direct clean snack, or for tossing with custom seasonings, curries, and healthy desserts.
                </p>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="max-w-xl">
                <h3 className="font-serif text-lg font-bold text-forest-green mb-4">Five Projections of Organic Wellness</h3>
                <ul className="space-y-4">
                  {product.benefits.map((ben, i) => (
                    <li key={i} className="flex items-start text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-forest-green/10 flex items-center justify-center text-gold-accent shrink-0 mr-3 mt-0.5">
                        <Leaf className="w-3 h-3" />
                      </div>
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="max-w-xl">
                <h3 className="font-serif text-lg font-bold text-forest-green mb-4">100% Honest Ingredients List</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center space-x-2 text-xs sm:text-sm text-walnut-brown/80 font-sans">
                      <span className="w-1.5 h-1.5 bg-gold-accent rounded-full shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-light-beige/50 text-xs text-walnut-brown/60">
                  ⚠️ <strong>Allergy advice:</strong> Naturally packaged in a facility that strictly processes organic seeds, dry fruits, and spices. Preservative-free.
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div id="related-products-section" className="border-t border-light-beige/60 pt-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-1">
                  Complete the Experience
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-forest-green tracking-tight">
                  You May Also Like
                </h2>
              </div>
              <Link
                to="/products"
                className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-gold-accent hover:text-forest-green transition-colors"
              >
                <span>View All Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <div key={p.id} className="group bg-white rounded-2xl border border-light-beige/40 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
                  <div className="aspect-square bg-brand-bg/40 relative overflow-hidden">
                    <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-gold-accent">{p.category} series</span>
                      <h3 className="font-serif font-bold text-forest-green hover:text-gold-accent text-md mt-1 line-clamp-1">
                        <Link to={`/product/${p.id}`}>{p.name}</Link>
                      </h3>
                      <p className="text-[11px] text-walnut-brown/70 font-sans mt-2 line-clamp-2 leading-relaxed">{p.description}</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-light-beige/30 flex items-center justify-between">
                      <span className="text-sm font-bold text-forest-green font-serif">₹{p.weightOptions[0].price} <span className="text-[10px] text-walnut-brown/50">({p.weightOptions[0].label})</span></span>
                      <Link to={`/product/${p.id}`} className="text-xs uppercase font-extrabold tracking-wider text-gold-accent hover:text-forest-green flex items-center space-x-1">
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
