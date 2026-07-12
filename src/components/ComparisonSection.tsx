/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Leaf, Award, ShieldAlert, Sparkles, TrendingUp, Heart } from 'lucide-react';

interface FoodData {
  name: string;
  calories: number; // per 100g
  fat: string; // in grams per 100g
  protein: string; // in grams per 100g
  fiber: string; // in grams per 100g
  process: string;
  gluten: string;
  healthScore: number; // out of 100
  prosCons: { type: 'pro' | 'con'; text: string }[];
}

const COMPARISON_DATA: Record<string, FoodData> = {
  makhana: {
    name: "Vina Makhana (Fox Nuts)",
    calories: 347,
    fat: "0.1g",
    protein: "9.7g",
    fiber: "14.5g",
    process: "Naturally Sorted & Slow Roasted",
    gluten: "100% Gluten-Free",
    healthScore: 98,
    prosCons: [
      { type: 'pro', text: 'Virtually zero saturated fat & trans fat' },
      { type: 'pro', text: 'Packed with essential plant proteins & fiber' },
      { type: 'pro', text: 'Low Glycemic Index – ideal for diabetes management' },
      { type: 'pro', text: 'Rich in anti-aging properties & flavonoids' }
    ]
  },
  chips: {
    name: "Fried Potato Chips",
    calories: 536,
    fat: "35.0g",
    protein: "7.0g",
    fiber: "4.8g",
    process: "Deep Fried in Refined Vegetable Oils",
    gluten: "Varies",
    healthScore: 15,
    prosCons: [
      { type: 'con', text: 'Extremely high in trans-fats & sodium' },
      { type: 'con', text: 'Refined oils lead to high arterial inflammation' },
      { type: 'con', text: 'High Glycemic index triggers insulin spikes' },
      { type: 'con', text: 'Virtually zero nutrient retention' }
    ]
  },
  biscuits: {
    name: "Standard Sweet Biscuits",
    calories: 453,
    fat: "19.0g",
    protein: "6.0g",
    fiber: "1.2g",
    process: "Highly Processed, Baked with Refined Flour",
    gluten: "Contains Gluten",
    healthScore: 22,
    prosCons: [
      { type: 'con', text: 'Loaded with refined white sugar & Palm Oil' },
      { type: 'con', text: 'Very high simple carbohydrates' },
      { type: 'con', text: 'Almost empty calories without dietary fibers' },
      { type: 'con', text: 'Artificial flavoring & preservatives added' }
    ]
  },
  popcorn: {
    name: "Butter Microwave Popcorn",
    calories: 429,
    fat: "14.0g",
    protein: "9.0g",
    fiber: "10.0g",
    process: "Microwaved with artificial fats",
    gluten: "Gluten-Free",
    healthScore: 65,
    prosCons: [
      { type: 'pro', text: 'Decent source of dietary fiber' },
      { type: 'con', text: 'High sodium and artificial butter chemicals' },
      { type: 'con', text: 'Often genetically modified (GMO) corn' },
      { type: 'con', text: 'High expansion but less satiety than Makhana' }
    ]
  }
};

export const ComparisonSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('chips');

  const makhana = COMPARISON_DATA.makhana;
  const currentCompare = COMPARISON_DATA[selectedItem];

  return (
    <section id="nutrition-comparison" className="py-20 bg-white border-y border-light-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-3">
            Mindful Healthy Eating
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-forest-green tracking-tight leading-tight">
            The Ultimate Nutrition Clash
          </h2>
          <div className="w-24 h-1 bg-gold-accent mx-auto my-6 rounded-full" />
          <p className="text-walnut-brown/75 font-sans text-sm sm:text-base leading-relaxed">
            See how VINA MAKHANA compares to other popular convenience snacks. Our natural organic fox nuts outperform refined snacking options on every health metric.
          </p>
        </div>

        {/* Dynamic Selector Buttons */}
        <div id="compare-tabs" className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.keys(COMPARISON_DATA).map((key) => {
            if (key === 'makhana') return null;
            return (
              <button
                key={key}
                onClick={() => setSelectedItem(key)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 border ${
                  selectedItem === key
                    ? 'bg-forest-green text-white border-forest-green shadow-md'
                    : 'bg-brand-bg text-walnut-brown border-light-beige hover:bg-light-beige/40'
                }`}
              >
                Makhana vs {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Side-by-Side Comparison Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Vina Makhana (The Champion) */}
          <div className="rounded-2xl bg-gradient-to-br from-forest-green to-forest-green/90 p-8 text-white shadow-xl border border-gold-accent/30 flex flex-col justify-between transform transition-all duration-500 hover:shadow-2xl relative overflow-hidden group">
            
            {/* Background Accent */}
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <Leaf className="w-96 h-96" />
            </div>

            <div>
              {/* Badge */}
              <div className="inline-flex items-center space-x-1.5 bg-gold-accent/95 text-forest-green font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-forest-green stroke-none" />
                <span>Superfood Gold Winner</span>
              </div>

              {/* Title & Score */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-serif text-3xl font-semibold tracking-wide">
                    {makhana.name}
                  </h3>
                  <span className="text-xs text-light-beige uppercase tracking-widest block mt-1">
                    Organic, Baked & Unadulterated
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-light-beige block uppercase tracking-wider text-[10px]">Health Score</span>
                  <span className="text-4xl font-bold text-gold-accent font-serif">{makhana.healthScore}<span className="text-sm font-sans">/100</span></span>
                </div>
              </div>

              {/* Nutrition Bars */}
              <div className="space-y-5 mb-8">
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-light-beige mb-1.5">
                    <span>Protein Content (Per 100g)</span>
                    <span className="text-white">{makhana.protein}</span>
                  </div>
                  <div className="h-2 w-full bg-forest-green/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gold-accent rounded-full" style={{ width: '97%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-light-beige mb-1.5">
                    <span>Dietary Fiber (Per 100g)</span>
                    <span className="text-white">{makhana.fiber}</span>
                  </div>
                  <div className="h-2 w-full bg-forest-green/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gold-accent rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-light-beige mb-1.5">
                    <span>Total Saturated Fats</span>
                    <span className="text-white text-emerald-300 font-bold">{makhana.fat} (Ultra Low!)</span>
                  </div>
                  <div className="h-2 w-full bg-forest-green/50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: '1%' }} />
                  </div>
                </div>
              </div>

              {/* Benefits Bullets */}
              <div className="border-t border-white/10 pt-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-accent block mb-3">Key Wellness Projections</span>
                <ul className="space-y-2.5">
                  {makhana.prosCons.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-light-beige/90">
                      <Leaf className="w-4.5 h-4.5 text-gold-accent shrink-0 mr-2.5 mt-0.5" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-light-beige">
              <span>Process: <strong className="text-white">{makhana.process}</strong></span>
              <span className="bg-white/10 px-2 py-1 rounded">{makhana.gluten}</span>
            </div>
          </div>

          {/* Card 2: Selected Snack for Comparison */}
          <div className="rounded-2xl bg-[#FCFAF6] p-8 text-walnut-brown shadow-lg border border-light-beige flex flex-col justify-between transform transition-all duration-500 hover:shadow-xl relative overflow-hidden">
            
            <div>
              {/* Badge */}
              <div className="inline-flex items-center space-x-1.5 bg-red-50 text-red-700 border border-red-100 font-semibold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-6">
                <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                <span>Highly Processed Snack</span>
              </div>

              {/* Title & Score */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-serif text-3xl font-semibold tracking-wide text-walnut-brown">
                    {currentCompare.name}
                  </h3>
                  <span className="text-xs text-walnut-brown/60 uppercase tracking-widest block mt-1">
                    Mass Manufactured Fast Food
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-walnut-brown/50 block uppercase tracking-wider text-[10px]">Health Score</span>
                  <span className="text-4xl font-bold text-red-500 font-serif">{currentCompare.healthScore}<span className="text-sm font-sans text-walnut-brown/50">/100</span></span>
                </div>
              </div>

              {/* Nutrition Bars */}
              <div className="space-y-5 mb-8">
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-walnut-brown/70 mb-1.5">
                    <span>Protein Content (Per 100g)</span>
                    <span className="text-walnut-brown font-bold">{currentCompare.protein}</span>
                  </div>
                  <div className="h-2 w-full bg-light-beige rounded-full overflow-hidden">
                    <div className="h-full bg-walnut-brown/40 rounded-full" style={{ width: `${(parseFloat(currentCompare.protein) / 10) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-walnut-brown/70 mb-1.5">
                    <span>Dietary Fiber (Per 100g)</span>
                    <span className="text-walnut-brown font-bold">{currentCompare.fiber}</span>
                  </div>
                  <div className="h-2 w-full bg-light-beige rounded-full overflow-hidden">
                    <div className="h-full bg-walnut-brown/40 rounded-full" style={{ width: `${(parseFloat(currentCompare.fiber) / 15) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-walnut-brown/70 mb-1.5">
                    <span>Total Saturated Fats</span>
                    <span className="text-red-500 font-bold">{currentCompare.fat} (High!)</span>
                  </div>
                  <div className="h-2 w-full bg-light-beige rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${Math.min((parseFloat(currentCompare.fat) / 35) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* Benefits Bullets */}
              <div className="border-t border-light-beige pt-6">
                <span className="text-xs font-bold uppercase tracking-widest text-red-500/80 block mb-3">Health & Nutritional Warnings</span>
                <ul className="space-y-2.5">
                  {currentCompare.prosCons.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-walnut-brown/80">
                      <span className="w-2 h-2 bg-red-400 rounded-full shrink-0 mr-3 mt-1.5" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-light-beige flex items-center justify-between text-xs text-walnut-brown/65">
              <span>Process: <strong>{currentCompare.process}</strong></span>
              <span className="bg-light-beige/55 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider">{currentCompare.gluten}</span>
            </div>
          </div>
          
        </div>

        {/* Nutritional Score Banner summary */}
        <div id="compare-summary" className="mt-12 bg-light-beige/30 border border-light-beige p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gold-accent/25 flex items-center justify-center text-gold-accent shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-forest-green">VINA MAKHANA: The Healthier Choice</h4>
              <p className="text-xs sm:text-sm text-walnut-brown/85 font-sans mt-0.5">
                Low in glycemic index, high in mineral absorption, baked organically without trans fat, and 100% natural.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="text-xs font-serif italic text-gold-accent font-bold">100% Guilt-Free & Certified Fresh</span>
          </div>
        </div>

      </div>
    </section>
  );
};
