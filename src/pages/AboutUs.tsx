/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldCheck, Heart, Leaf, Sparkles, Sprout, ChevronRight } from 'lucide-react';

export const AboutUs: React.FC = () => {
  
  const processSteps = [
    {
      step: "01",
      title: "Handpicked Wetland Sourcing",
      description: "Directly harvested from pristine, chemical-free wetland lily ponds by local artisan farmers in natural harvest cycles."
    },
    {
      step: "02",
      title: "Clean Shelling & Separation",
      description: "Carefully cleaning raw seeds through water sorting to separate dirt, shells, and select only uniform seed centers."
    },
    {
      step: "03",
      title: "Natural Sun-Drying",
      description: "Raw lotus seed pods are laid out on organic bamboo mats to dry naturally in clean sunlit air, preserving active proteins."
    },
    {
      step: "04",
      title: "Suta Size-Grading",
      description: "Rigorous sieve grading classifying pods into premium Suta categories—sorting only size 5 and size 6 for packaging."
    },
    {
      step: "05",
      title: "Artisan Low-Flame Toasting",
      description: "Seeds are toasted in slow heavy iron pans with a micro-drizzle of cow ghee or olive oil, locking in supreme puffiness."
    },
    {
      step: "06",
      title: "Clinical Nitrogen Packaging",
      description: "Packed instantly under controlled sterile atmosphere, replacing oxygen with inert nitrogen to keep crunch perfect for months."
    }
  ];

  return (
    <div id="about-us-page" className="py-16 sm:py-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-3">
            Our Noble Heritage
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-forest-green tracking-tight leading-tight">
            The Story of VINA MAKHANA
          </h1>
          <div className="w-20 h-1 bg-gold-accent mx-auto my-6 rounded-full" />
          <p className="text-walnut-brown/75 font-sans text-sm sm:text-base">
            Sourcing the cleanest organic fox nuts, processed with absolute hygienic discipline, and packaged to redefine luxury wellness snacking.
          </p>
        </div>

        {/* Brand Story Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          
          {/* Left Side: Images collage */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-bg shadow-xl border border-light-beige">
              <img
                src="/assets/images/raw_makhana_1783608954057.jpg"
                alt="Sun drying raw makhana"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating visual circle */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-forest-green flex items-center justify-center text-gold-accent shadow-lg border border-white/20">
              <Sprout className="w-10 h-10" />
            </div>
          </div>

          {/* Right Side: Detailed story text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-accent block">Sourced with Honesty</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-green tracking-tight">
              A Mission Anchored in Clean Health
            </h2>
            <div className="w-16 h-[2px] bg-gold-accent" />
            
            <div className="space-y-4 text-xs sm:text-sm text-walnut-brown/85 font-sans leading-relaxed">
              <p>
                VINA MAKHANA was founded to address a simple question: <strong>Why do healthy snacks have to feel like compromise?</strong> Traditional potato chips are deep-fried in inflammatory palm oil, while organic seeds often taste bland. We set out to craft an artisanal snack that bridge luxury flavor with pure clinical wellness.
              </p>
              <p>
                Our founders forged close ties with veteran wetland farmers in native biological belts of Bihar and North Bengal. By bypassing multiple middle-men, we ensure that our crops are fully traceable, non-GMO, and sustainable. We compensate our farming families with fair premiums, empowering local rural micro-economies.
              </p>
              <p>
                At VINA, we believe clean food begins with meticulous respect for the raw materials. Our 5 Suta and 6 Suta raw grades represent the cleanest botanical sizes sorting standard, toasted slowly in premium cow ghee or cold-pressed olive oils. No chemical additives, no synthetic binders. Pure, healthy, delicious.
              </p>
            </div>
          </div>

        </div>

        {/* Mission and Vision Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-3xl border border-light-beige/50 shadow-sm relative overflow-hidden group hover:border-light-beige transition-colors">
            <div className="w-12 h-12 rounded-xl bg-forest-green/10 flex items-center justify-center text-forest-green mb-6 shrink-0">
              <Leaf className="w-6 h-6 text-gold-accent" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest-green mb-3">Our Core Mission</h3>
            <p className="text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed">
              To democratize premium plant-based wellness by supplying the cleanest, hand-sorted makhana snacks across the globe, while fostering ethical organic farming standards and preserving traditional heritage crops.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 rounded-3xl border border-light-beige/50 shadow-sm relative overflow-hidden group hover:border-light-beige transition-colors">
            <div className="w-12 h-12 rounded-xl bg-forest-green/10 flex items-center justify-center text-forest-green mb-6 shrink-0">
              <Award className="w-6 h-6 text-gold-accent" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest-green mb-3">Our Luxury Vision</h3>
            <p className="text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed">
              To build an iconic international superfood brand recognized as the absolute gold standard for pure, clean, and delicious snack nutrition. We aim to prove that premium luxury and wellness-driven health live hand-in-hand.
            </p>
          </div>

        </div>

        {/* Quality Promise Card Banner */}
        <div className="bg-gradient-to-r from-forest-green to-forest-green/90 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-24 border border-gold-accent/25 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gold-accent/95 text-forest-green font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 fill-forest-green stroke-none" />
              <span>Our Quality & Purity Promise</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide">Our Uncompromised Quality Promise</h3>
            <p className="text-xs sm:text-sm text-light-beige/85 leading-relaxed font-sans">
              We stand by a strict zero-adulteration mandate. Every batch undergoes rigorous quality assurance inspections, ensuring zero sand particles, zero artificial preservatives, zero MSG, and zero palm oil. Only pure cow ghee and 100% natural spices touch our snacks.
            </p>
          </div>

          <div className="shrink-0">
            <div className="w-24 h-24 rounded-full border-2 border-gold-accent/50 flex flex-col items-center justify-center text-gold-accent text-center font-serif">
              <span className="text-xl font-bold">100%</span>
              <span className="text-[8px] uppercase tracking-wider font-semibold mt-0.5">Approved</span>
            </div>
          </div>
        </div>

        {/* Manufacturing Process Timeline */}
        <div id="manufacturing-process-section" className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-2">Nine-Step Precision Sourcing</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-green">Our Organic Processing Steps</h2>
            <p className="text-xs sm:text-sm text-walnut-brown/70 font-sans mt-3">
              We maintain absolute hygiene control at every single junction—from wetlands sorting to clinical nitrogen-sealed packing.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((p, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-light-beige/40 shadow-sm relative flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-serif font-bold text-gold-accent/30 block mb-4">{p.step}</span>
                  <h3 className="font-serif text-base font-bold text-forest-green mb-2">{p.title}</h3>
                  <p className="text-xs text-walnut-brown/75 font-sans leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
