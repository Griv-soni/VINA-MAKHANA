/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, query, orderBy, limit, onSnapshot } from '../lib/firebase';
import {
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Heart,
  Truck,
  Sparkles,
  ChevronLeft,
  Star,
  ChevronRight,
  HelpCircle,
  Instagram,
  Plus,
  Minus,
  Leaf,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { PRODUCTS } from '../types';
import { ComparisonSection } from '../components/ComparisonSection';
import { RecipeSection } from '../components/RecipeSection';

// Reviews mock data
const TESTIMONIALS = [
  {
    name: "Aishwarya Sen",
    role: "Nutritionist & Fitness Consultant",
    rating: 5,
    text: "As a nutritionist, I am very picky about my snacking. VINA MAKHANA 6 Suta grade is exceptionally giant and clean. No stale seeds, and the crispiness is completely premium. The ghee-roasted peri-peri flavor is my absolute favorite guilt-free evening crisp."
  },
  {
    name: "Rohan Mehta",
    role: "Tech Lead & Mindful Snacker",
    rating: 5,
    text: "Absolutely mindblowing quality! Replacing potato chips with Vina's Himalaya Salt Makhana has lowered my daily sodium intake drastically. Sourced ethically and packed so hygienically, it feels like premium dry fruits. 10/10!"
  },
  {
    name: "Dr. Kavita Sharma",
    role: "Pediatrician & Mother",
    rating: 5,
    text: "Getting kids to eat healthily is a challenge. The Gourmet Cheese flavor is a savior. It has that creamy, delicious savory taste they love, but without any frying or artificial additives. I highly recommend it for parents who want natural snacks."
  }
];

// FAQS mock data
const FAQS = [
  {
    question: "What does '5 Suta' and '6 Suta' mean in Raw Makhana?",
    answer: "These terms describe the diameter and volume grading of the lotus seed pods. '5 Suta' makhana seeds are high-grade standard crisp seeds, perfect for regular roasting. '6 Suta' represents the premium luxury grade—the largest, plumpest, and roundest seeds available, offering maximum expansion, volume, and an exceptionally delicate premium crunch."
  },
  {
    question: "Is VINA MAKHANA completely gluten-free and vegan?",
    answer: "Yes, raw makhana is naturally 100% gluten-free and vegan. Our raw selections (5 Suta & 6 Suta) are raw organic plant seeds. For our flavored collections, we toast them in minimal cow ghee for active bio-absorption of turmeric, which contains trace dairy. If you require a strict vegan option, you can purchase our Raw variants and toast them in cold-pressed olive or coconut oil."
  },
  {
    question: "How is the WhatsApp Ordering System working?",
    answer: "It is extremely simple! You browse our premium makhana collections, select your desired weights and quantities, and add them to your cart. Once in your cart, you fill in basic details (Name, Contact, Address) and click 'Place Order on WhatsApp'. This automatically pre-formats a gorgeous detailed order invoice and opens WhatsApp. You send it to us, and we confirm the delivery details and share secure payment links!"
  },
  {
    question: "Are your snacks fried?",
    answer: "Never. All our flavored Makhana options are slowly slow-baked or dry-toasted with a gentle drizzle of premium cow ghee or cold-pressed oils to help organic spices adhere. We represent pristine healthy food integrity, so we never fry or inflate our snacks."
  }
];

// Instagram mocks (Using high-quality public domain looking food items or placeholders)
const INSTAGRAM_MOCKS = [
  { url: "/assets/images/peri_peri_makhana_1783608969419.jpg", tag: "@vinamakhana" },
  { url: "/assets/images/salt_makhana_1783608983772.jpg", tag: "#guiltfreesnacking" },
  { url: "/assets/images/cheese_makhana_1783609016694.jpg", tag: "@cleanliving" },
  { url: "/assets/images/raw_makhana_1783608954057.jpg", tag: "#organicmakhana" },
  { url: "/assets/images/makhana_banner_1783608940130.jpg", tag: "#vinafamily" },
  { url: "/assets/images/peri_peri_makhana_1783608969419.jpg", tag: "#ancientgrain" }
];

export const Home: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [homeReviews, setHomeReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Real-time listener for top 6 reviews
  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      orderBy('createdAt', 'desc'),
      limit(6)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setHomeReviews(list);
      setLoadingReviews(false);
    }, (error) => {
      console.error("Home reviews query error:", error);
      setLoadingReviews(false);
    });

    return () => unsubscribe();
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('brand-story-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div id="home-page" className="animate-fade-in">
      
      {/* 1. HERO BANNER SECTION */}
      <section id="hero-section" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-brand-bg py-20 overflow-hidden">
        {/* Background Image Container with parallax-like feel */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/makhana_banner_1783608940130.jpg"
            alt="VINA MAKHANA Premium Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/85 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-7 text-left">
            <div className="inline-flex items-center space-x-2 bg-forest-green/10 text-forest-green font-semibold text-xs tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-forest-green/20 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-gold-accent fill-gold-accent stroke-none animate-pulse" />
              <span>Gourmet Organic Superfood</span>
            </div>

            <div className="space-y-3 animate-fade-in">
              <span className="block text-walnut-brown/70 tracking-[0.3em] text-xs sm:text-sm uppercase font-bold">
                Welcome to VINA MAKHANA
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-forest-green leading-tight">
                100% Homemade<br />
                <span className="text-gold-accent font-extrabold relative inline-block">
                  Flavoured Makhana
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-walnut-brown/85 font-sans leading-relaxed max-w-xl font-medium animate-fade-in">
              Freshly handcrafted in small batches using premium ingredients.<br className="hidden sm:inline" />
              Healthy, crunchy and full of authentic homemade flavours.
            </p>

            {/* Premium Trust Lines */}
            <div className="space-y-2 py-2 border-y border-forest-green/10 max-w-xl animate-fade-in">
              <p className="text-xs sm:text-sm font-extrabold text-gold-accent tracking-wide flex items-center gap-1.5">
                <span>⭐</span> Freshly Made • Premium Quality • Homemade with Love
              </p>
              <p className="text-xs sm:text-sm font-bold text-forest-green tracking-wide flex items-center gap-1.5">
                <span>❤️</span> Every Pack is Handmade Fresh After Your Order
              </p>
            </div>

            {/* Premium Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl animate-fade-in pt-1">
              {[
                { label: "100% Homemade", icon: "🏠" },
                { label: "Premium Ingredients", icon: "🌿" },
                { label: "Made Fresh for Every Order", icon: "❤️" },
                { label: "No Artificial Preservatives", icon: "🚫" },
                { label: "100% Vegetarian", icon: "🌱" },
                { label: "Proudly Made in India", icon: "🇮🇳" },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span className="text-base group-hover:scale-110 transition-transform shrink-0">{badge.icon}</span>
                  <span className="text-[10px] sm:text-xs font-bold text-forest-green tracking-tight leading-tight">{badge.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                id="hero-cta-explore"
                to="/products"
                className="px-8 py-4 bg-forest-green hover:bg-gold-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                Explore Products
              </Link>
              <Link
                id="hero-cta-about"
                to="/about"
                className="px-8 py-4 bg-white/70 hover:bg-light-beige border border-light-beige text-walnut-brown font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Right Floating Card Mock */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="glass-panel p-8 rounded-3xl shadow-2xl border border-white/60 space-y-6 relative transform hover:rotate-1 transition-transform duration-500">
              <div className="aspect-square rounded-2xl overflow-hidden bg-brand-bg/50 border border-light-beige">
                <img
                  src="/assets/images/raw_makhana_1783608954057.jpg"
                  alt="Raw Premium 6 Suta Makhana"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-accent">Raw Luxury Grade</span>
                  <h3 className="font-serif text-lg font-bold text-forest-green">6 Suta Raw Makhana</h3>
                </div>
                <Link
                  to="/product/raw-6-suta"
                  className="w-10 h-10 rounded-full bg-forest-green hover:bg-gold-accent text-white flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Smooth Scroll Down Indicator */}
        <button
          id="scroll-indicator"
          onClick={handleScrollDown}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-walnut-brown hover:text-gold-accent flex flex-col items-center space-y-1 group transition-colors duration-200"
          aria-label="Scroll Down"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold">Discover Vina</span>
          <ChevronDown className="w-5 h-5 animate-bounce text-gold-accent group-hover:scale-110 transition-transform" />
        </button>
      </section>

      {/* 2. BRAND STORY SECTION */}
      <section id="brand-story-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Image Story collage */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-brand-bg shadow-xl border border-light-beige">
                <img
                  src="/assets/images/makhana_banner_1783608940130.jpg"
                  alt="Vina Makhana cultivation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Overlapping small circular floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-gold-accent text-white p-6 rounded-2xl shadow-xl border border-white max-w-[180px] hidden sm:block">
                <span className="block text-2xl font-serif font-bold">100%</span>
                <span className="block text-[10px] uppercase font-semibold tracking-wider mt-1 text-light-beige">Pure & Naturally Sun-Dried</span>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block">
                The Heritage of Purity
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-forest-green tracking-tight leading-tight">
                Crafted by Nature, Perfected for Wellness
              </h2>
              <div className="w-16 h-1 bg-gold-accent rounded-full my-4" />
              
              <div className="space-y-4 text-walnut-brown/80 font-sans text-sm sm:text-base leading-relaxed">
                <p>
                  VINA MAKHANA represents a commitment to premium health lifestyle. Born out of a desire to redefine convenience snacking, we harvest premium organic fox nuts directly from pesticide-free deep water wetlands of India. 
                </p>
                <p>
                  Each seed goes through a rigorous nine-step manual cleaning, sun-drying, and sizing process before arriving at our state-of-the-art grading facility. We dry-toast our fox nuts organically, ensuring zero loss of plant-based proteins, fiber, or minerals. 
                </p>
                <p className="font-serif italic font-semibold text-forest-green text-base">
                  &ldquo;We don’t just package snacks; we source luxurious longevity in its purest natural form.&rdquo;
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-accent hover:text-forest-green transition-colors duration-200"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE VINA MAKHANA */}
      <section id="why-choose-us" className="py-24 bg-brand-bg/50 border-t border-light-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-3">
              Standard of Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-forest-green tracking-tight">
              Why Choose VINA MAKHANA?
            </h2>
            <div className="w-20 h-1 bg-gold-accent mx-auto my-6 rounded-full" />
            <p className="text-walnut-brown/75 font-sans text-sm sm:text-base">
              Unlike generic, industrial snack alternatives, our products are tailored around pure artisan grading and rigorous health compliance.
            </p>
          </div>

          {/* Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-white p-8 rounded-2xl border border-light-beige/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-light-beige flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-forest-green/10 flex items-center justify-center text-forest-green mb-6 shrink-0">
                <Award className="w-6 h-6 text-gold-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest-green mb-3">Premium Quality</h3>
              <p className="text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed">
                Only the finest, plumpest seed grades earn the VINA brand seal. Uniform expansion ensures a delicate, airy bite with minimal hard kernels.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-8 rounded-2xl border border-light-beige/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-light-beige flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-forest-green/10 flex items-center justify-center text-forest-green mb-6 shrink-0">
                <ShieldCheck className="w-6 h-6 text-gold-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest-green mb-3">Hygienically Packed</h3>
              <p className="text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed">
                We maintain a strict zero-touch facility. Vacuum sorted and packed under inert gas to lock in fresh, crisp flavors without relying on preservatives.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-8 rounded-2xl border border-light-beige/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-light-beige flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-forest-green/10 flex items-center justify-center text-forest-green mb-6 shrink-0">
                <Heart className="w-6 h-6 text-gold-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest-green mb-3">Healthy Snack</h3>
              <p className="text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed">
                Organically baked and spiced. Zero cholesterol, extremely low in calories, making it the perfect heart-friendly companion for busy modern workdays.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-8 rounded-2xl border border-light-beige/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-light-beige flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-forest-green/10 flex items-center justify-center text-forest-green mb-6 shrink-0">
                <Zap className="w-6 h-6 text-gold-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest-green mb-3">Rich Nutrition</h3>
              <p className="text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed">
                A natural goldmine of vegan proteins, potassium, high dietary fiber, and active calcium. Essential macro-nutrients aligned with weight goals.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="bg-white p-8 rounded-2xl border border-light-beige/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-light-beige flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-forest-green/10 flex items-center justify-center text-forest-green mb-6 shrink-0">
                <Leaf className="w-6 h-6 text-gold-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest-green mb-3">Farm Fresh</h3>
              <p className="text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed">
                Sourced directly from native wetlands in sustainable cycles. Empowering local farming communities while keeping the supply chain transparent.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="bg-white p-8 rounded-2xl border border-light-beige/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-light-beige flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-forest-green/10 flex items-center justify-center text-forest-green mb-6 shrink-0">
                <Truck className="w-6 h-6 text-gold-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-forest-green mb-3">Trusted Quality</h3>
              <p className="text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed">
                Endorsed by thousands of wellness experts and wellness families across the country for our clean food standards and commitment to luxury organic snacking.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. OUR COLLECTION */}
      <section id="featured-collection" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-3">
              Explore Our Offerings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-forest-green tracking-tight">
              Two Premium Collections
            </h2>
            <div className="w-20 h-1 bg-gold-accent mx-auto my-6 rounded-full" />
            <p className="text-walnut-brown/75 font-sans text-sm sm:text-base">
              Indulge in our slow-baked gourmet flavored selection, or select our raw grading options for authentic culinary creations at home.
            </p>
          </div>

          {/* Collection Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Collection 1: Flavored */}
            <div className="rounded-3xl border border-light-beige p-8 sm:p-12 bg-brand-bg/40 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-forest-green/15 text-forest-green rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌶️</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-green">Gourmet Flavored Makhana</h3>
                  <p className="text-xs text-gold-accent uppercase tracking-widest font-bold mt-1">3 Decadent Variants</p>
                </div>
                <p className="text-xs sm:text-sm text-walnut-brown/85 font-sans leading-relaxed">
                  Carefully roasted to airy perfection using high-grade ghee and natural ingredients. Try our fiery <strong>Peri Peri</strong>, classic <strong>Himalaya Salt</strong>, or creamy <strong>Gourmet Cheese</strong>.
                </p>
                
                {/* Visual Quick Previews */}
                <div className="flex gap-3 pt-2">
                  {PRODUCTS.filter(p => p.category === 'flavored').map(p => (
                    <div key={p.id} className="w-16 h-16 rounded-xl overflow-hidden border border-light-beige shadow-sm">
                      <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-light-beige/60">
                <Link
                  to="/products?category=flavored"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-forest-green hover:bg-gold-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Collection 2: Raw */}
            <div className="rounded-3xl border border-light-beige p-8 sm:p-12 bg-brand-bg/40 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-forest-green/15 text-forest-green rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-green">Raw Organic Makhana</h3>
                  <p className="text-xs text-gold-accent uppercase tracking-widest font-bold mt-1">2 Graded Options</p>
                </div>
                <p className="text-xs sm:text-sm text-walnut-brown/85 font-sans leading-relaxed">
                  Pristine raw lotus seed pods sorted to precision volume standards. Select our highly crisp <strong>5 Suta Grade</strong> or our ultimate luxury bold-sized <strong>6 Suta Grade</strong>.
                </p>

                {/* Visual Quick Previews */}
                <div className="flex gap-3 pt-2">
                  {PRODUCTS.filter(p => p.category === 'raw').slice(0, 1).map(p => (
                    <div key={p.id} className="w-16 h-16 rounded-xl overflow-hidden border border-light-beige shadow-sm">
                      <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-16 h-16 rounded-xl border border-dashed border-light-beige flex items-center justify-center text-[10px] uppercase font-bold text-walnut-brown/40">
                    5 & 6 Suta
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-light-beige/60">
                <Link
                  to="/products?category=raw"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-forest-green hover:bg-gold-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. HEALTH BENEFITS INFOGRAPHIC */}
      <section id="health-benefits" className="py-24 bg-gradient-to-b from-brand-bg to-white border-t border-light-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-3">
              Holistic Wellness Metrics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-forest-green tracking-tight">
              An Incredible Wealth of Nutrition
            </h2>
            <div className="w-20 h-1 bg-gold-accent mx-auto my-6 rounded-full" />
            <p className="text-walnut-brown/75 font-sans text-sm sm:text-base">
              A nutritional superfood packed with nature’s purest restorative properties, helping you live lighter and fuel faster.
            </p>
          </div>

          {/* Six Infographic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Benefit 1 */}
            <div className="bg-white p-6 rounded-2xl border border-light-beige/40 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent shrink-0 font-bold text-sm">
                💪
              </div>
              <div>
                <h4 className="font-serif font-bold text-forest-green text-base mb-1">High Protein</h4>
                <p className="text-xs text-walnut-brown/75 font-sans leading-relaxed">
                  Excellent vegan source of muscle-repairing proteins to maintain sustained vitality.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-6 rounded-2xl border border-light-beige/40 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent shrink-0 font-bold text-sm">
                🌾
              </div>
              <div>
                <h4 className="font-serif font-bold text-forest-green text-base mb-1">Rich Fiber</h4>
                <p className="text-xs text-walnut-brown/75 font-sans leading-relaxed">
                  High dietary fibers support pristine digestive processes and slow nutrient release.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-6 rounded-2xl border border-light-beige/40 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent shrink-0 font-bold text-sm">
                📉
              </div>
              <div>
                <h4 className="font-serif font-bold text-forest-green text-base mb-1">Low Calories</h4>
                <p className="text-xs text-walnut-brown/75 font-sans leading-relaxed">
                  Ultra-light volume expansion lets you snack heavily with tiny calorie counts.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-6 rounded-2xl border border-light-beige/40 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent shrink-0 font-bold text-sm">
                🛡️
              </div>
              <div>
                <h4 className="font-serif font-bold text-forest-green text-base mb-1">Gluten Free</h4>
                <p className="text-xs text-walnut-brown/75 font-sans leading-relaxed">
                  Naturally 100% free of gluten, making it a safe option for celiac-friendly diets.
                </p>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="bg-white p-6 rounded-2xl border border-light-beige/40 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent shrink-0 font-bold text-sm">
                😋
              </div>
              <div>
                <h4 className="font-serif font-bold text-forest-green text-base mb-1">Healthy Snacking</h4>
                <p className="text-xs text-walnut-brown/75 font-sans leading-relaxed">
                  Baked lovingly without saturated industrial hydrogenated oils, preventing inflammation.
                </p>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="bg-white p-6 rounded-2xl border border-light-beige/40 shadow-sm flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent shrink-0 font-bold text-sm">
                ⚖️
              </div>
              <div>
                <h4 className="font-serif font-bold text-forest-green text-base mb-1">Weight Friendly</h4>
                <p className="text-xs text-walnut-brown/75 font-sans leading-relaxed">
                  Maintains feeling of fullness (satiety) over hours, suppressing calorie cravings.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. NUTRITION COMPARISON SECTION */}
      <ComparisonSection />

      {/* 7. RECIPE CORNER SECTION */}
      <RecipeSection />

      {/* 8. CUSTOMER REVIEWS (REAL-TIME LIVE COLLECTION) */}
      <section id="customer-reviews" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-12">
          
          <div className="space-y-3">
            <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block">
              Real Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-forest-green">
              Trusted by Wellness Lovers
            </h2>
            <div className="w-12 h-0.5 bg-gold-accent mx-auto rounded-full" />
          </div>

          {loadingReviews ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-accent border-t-transparent" />
              <p className="text-xs text-walnut-brown/50 mt-3 uppercase tracking-wider font-semibold">Retrieving latest reviews...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(homeReviews.length > 0 ? homeReviews : TESTIMONIALS.map((t, idx) => ({
                id: `mock-${idx}`,
                customerName: t.name,
                productName: idx === 0 ? 'Raw Makhana – 6 Suta' : idx === 1 ? 'Flavored Makhana – Himalayan Salt' : 'Flavored Makhana – Cheese',
                rating: t.rating,
                comment: t.text,
                createdAt: new Date(Date.now() - idx * 24 * 60 * 60 * 1000).toISOString()
              }))).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-brand-bg/25 border border-light-beige/40 p-6 rounded-3xl flex flex-col justify-between text-left hover:shadow-md transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex text-gold-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < rev.rating ? 'fill-gold-accent text-gold-accent' : 'text-light-beige'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold tracking-wider uppercase bg-gold-accent/10 text-gold-accent px-2 py-0.5 rounded-full truncate max-w-[150px]">
                        {rev.productName}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-walnut-brown/85 font-sans leading-relaxed italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-light-beige/30 flex items-center justify-between text-[10px] text-walnut-brown/50">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-5.5 h-5.5 rounded-full bg-forest-green/10 flex items-center justify-center font-bold text-forest-green text-[9px] shrink-0">
                        {rev.customerName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-serif font-bold text-forest-green truncate">{rev.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <Link
              to="/contact?reviews=true"
              className="px-8 py-3.5 bg-forest-green hover:bg-gold-accent text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all duration-300 flex items-center space-x-2"
            >
              <span>View All Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              to="/contact?write=true"
              className="px-8 py-3.5 bg-white border border-forest-green/40 hover:border-gold-accent hover:text-gold-accent text-forest-green font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-sm transition-all duration-300"
            >
              Write a Review
            </Link>
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section id="faq-section" className="py-24 bg-brand-bg/40 border-t border-light-beige/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-3">
              Knowledge Base
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-forest-green">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-gold-accent mx-auto my-5 rounded-full" />
          </div>

          {/* Accordion Container */}
          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-light-beige/50 overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between text-forest-green font-serif font-bold text-sm sm:text-base hover:text-gold-accent transition-colors duration-200"
                  >
                    <span>{faq.question}</span>
                    <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center shrink-0 ml-4">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-gold-accent" />
                      ) : (
                        <Plus className="w-4 h-4 text-gold-accent" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed border-t border-brand-bg animate-slide-down">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. INSTAGRAM GALLERY */}
      <section id="instagram-gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-3">
              Social Connection
            </span>
            <h2 className="font-serif text-3xl font-semibold text-forest-green flex items-center justify-center gap-2">
              <Instagram className="w-6 h-6 text-gold-accent" />
              <span>Stories From Our Circle</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INSTAGRAM_MOCKS.map((mock, idx) => (
              <div
                key={idx}
                className="group relative aspect-square overflow-hidden rounded-xl bg-brand-bg shadow-sm border border-light-beige/30"
              >
                <img
                  src={mock.url}
                  alt="VINA MAKHANA Instagram moment"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-forest-green/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                  <Instagram className="w-5 h-5 text-gold-accent mb-2" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">{mock.tag}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. CALL TO ACTION SECTION */}
      <section id="cta-section" className="relative py-24 bg-forest-green text-white overflow-hidden text-center border-t border-gold-accent/20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/makhana_banner_1783608940130.jpg"
            alt="Makhana background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-10 filter grayscale brightness-50"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-gold-accent font-bold uppercase tracking-[0.25em] text-xs block">
            Begin Your Wellness Transition
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
            Healthy Snacking Starts Here
          </h2>
          <div className="w-20 h-1 bg-gold-accent mx-auto my-4" />
          <p className="text-light-beige/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans">
            Treat your family to the luxury of farm-fresh, nutrient-dense VINA MAKHANA. Simply fill your cart and place your order directly on WhatsApp. No logins or credit cards required.
          </p>
          <div className="pt-4">
            <Link
              id="cta-order-now-btn"
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gold-accent text-forest-green font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-white hover:text-forest-green transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-xl"
            >
              <span>Order Now on WhatsApp</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
