/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Clock, Award, BookOpen, Utensils, Sparkles, ChevronRight, Check } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  level: 'Easy' | 'Medium' | 'Gourmet';
  ingredients: string[];
  steps: string[];
  image: string;
  healthTip: string;
}

const RECIPES: Recipe[] = [
  {
    id: 'roasted-makhana',
    title: 'Ghee-Roasted Herbed Makhana',
    description: 'The quintessential crisp makhana. Slowly toasted in golden cow ghee with fragrant kitchen herbs and black salt.',
    prepTime: '2 mins',
    cookTime: '8 mins',
    servings: '2 Persons',
    level: 'Easy',
    ingredients: [
      '2 cups Raw VINA MAKHANA (5 Suta or 6 Suta)',
      '1.5 tbsp Pure Cow Ghee or Cold-pressed Olive Oil',
      '1/2 tsp Turmeric powder',
      '1/2 tsp Black salt or Rock salt',
      '1/4 tsp Roasted cumin powder',
      'A pinch of freshly ground black pepper'
    ],
    steps: [
      'Heat the cow ghee or olive oil in a heavy-bottomed pan or kadhai on low flame.',
      'Add the raw VINA MAKHANA and roast on a gentle low flame, stirring constantly.',
      'Toast for 6-8 minutes until the seeds turn crisp and golden brown (test by crushing one between fingers; it should shatter instantly).',
      'Turn off the flame. Immediately add turmeric powder, cumin powder, black salt, and freshly cracked black pepper.',
      'Toss vigorously so the residual heat coats the makhana uniformly. Let cool and store in an airtight glass container.'
    ],
    image: '/assets/images/salt_makhana_1783608983772.jpg',
    healthTip: 'Roasting on a low flame is critical! High flame burns the spices and prevents the makhana core from achieving perfect crunch.'
  },
  {
    id: 'makhana-chaat',
    title: 'Spicy Makhana Yogurt Chaat',
    description: 'A tangy, nutritious street-food style cold salad featuring crispy roasted makhana, thick sweet curd, and homemade chutneys.',
    prepTime: '10 mins',
    cookTime: '5 mins',
    servings: '2 Persons',
    level: 'Medium',
    ingredients: [
      '1.5 cups Roasted crispy VINA MAKHANA (Himalaya Salt or Cheese flavor)',
      '1 cup Whisked thick Greek Yogurt or Curd (sweetened with a pinch of honey)',
      '2 tbsp Mint & Coriander green chutney',
      '2 tbsp Tamarind sweet chutney',
      '1/4 cup Pomegranate seeds',
      '2 tbsp Fresh chopped cilantro',
      '1/2 tsp Chaat masala & Red chili powder'
    ],
    steps: [
      'Arrange the pre-roasted crispy VINA MAKHANA evenly in a shallow serving bowl.',
      'Drizzle the cool, sweet whisked yogurt generously over the crispy makhana base.',
      'Spoon the spicy mint chutney and sweet tamarind chutney dynamically over the yogurt layer.',
      'Dust with chaat masala, red chili powder, and fine black salt.',
      'Garnish lavishly with fresh pomegranate arils and finely chopped coriander.',
      'Serve immediately to enjoy the delightful harmony of cold creaminess and warm, spicy crunch!'
    ],
    image: '/assets/images/peri_peri_makhana_1783608969419.jpg',
    healthTip: 'Add the yogurt and chutneys just before serving. This ensures the makhana remains delightfully crunchy with every bite.'
  },
  {
    id: 'makhana-kheer',
    title: 'Royal Makhana & Saffron Kheer',
    description: 'A luxurious, low-fat alternative to traditional rice pudding. Creamy, aromatic milk cooked slowly with crushed roasted makhana.',
    prepTime: '5 mins',
    cookTime: '20 mins',
    servings: '3-4 Persons',
    level: 'Gourmet',
    ingredients: [
      '1.5 cups Raw VINA MAKHANA (6 Suta is perfect)',
      '750ml Whole organic milk or Coconut milk',
      '3-4 tbsp Natural organic jaggery or Raw sugar',
      '10-12 Saffron strands (soaked in 1 tbsp warm milk)',
      '1/4 tsp Fresh green cardamom powder',
      '1 tbsp Chopped pistachios & slivered almonds'
    ],
    steps: [
      'Heat 1 tsp ghee in a pan and lightly roast the makhana until crisp. Cool and crush them coarsely using a mortar and pestle or quick blender pulse (keep a few makhana whole).',
      'In a deep heavy saucepan, bring the milk to a gentle boil.',
      'Add the coarsely crushed makhana to the boiling milk. Lower the flame and simmer for 12-15 minutes, stirring occasionally, until the milk reduces and thickens.',
      'Pour in the warm saffron-infused milk and cardamom powder. Stir well.',
      'Add your organic jaggery or raw sugar and simmer for another 3 minutes.',
      'Turn off the heat. Garnish with chopped pistachios and almonds. Serve warm or chilled as a royal healthy dessert.',
    ],
    image: '/assets/images/raw_makhana_1783608954057.jpg',
    healthTip: 'Using 6 Suta luxury makhana gives a rich, velvety texture to the kheer without needing thick cream or condensed milk.'
  }
];

export const RecipeSection: React.FC = () => {
  const [activeRecipe, setActiveRecipe] = useState<Recipe>(RECIPES[0]);

  return (
    <section id="recipe-section" className="py-20 bg-brand-bg/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-3">
              VINA Culinary Secrets
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-forest-green tracking-tight">
              Our Organic Recipe Corner
            </h2>
            <p className="text-walnut-brown/75 font-sans text-sm sm:text-base mt-4 leading-relaxed">
              Explore elegant, nutritional culinary ideas curated by nutritionists to bring gourmet wellness to your table.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-2 bg-white/60 p-1 rounded-xl border border-light-beige">
            {RECIPES.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => setActiveRecipe(recipe)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 ${
                  activeRecipe.id === recipe.id
                    ? 'bg-forest-green text-white shadow-sm'
                    : 'text-walnut-brown/80 hover:bg-light-beige/35'
                }`}
              >
                {recipe.title.split(' ').slice(-1)[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Recipe Details Panel */}
        <div className="bg-white rounded-3xl border border-light-beige/60 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left: Recipe Visual Column */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-light-beige/30 flex items-center justify-center overflow-hidden group">
            <img
              src={activeRecipe.image}
              alt={activeRecipe.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Visual Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center space-x-2 bg-gold-accent/90 text-forest-green text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md w-fit mb-2">
                <Sparkles className="w-3.5 h-3.5 fill-forest-green stroke-none" />
                <span>Culinary {activeRecipe.level}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-wide">{activeRecipe.title}</h3>
              <p className="text-xs text-light-beige/90 mt-1">{activeRecipe.description}</p>
            </div>
          </div>

          {/* Right: Recipe Instructions Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Recipe Meta Headers */}
              <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-light-beige/50 mb-6">
                <div className="flex items-center space-x-2 text-xs text-walnut-brown/80">
                  <Clock className="w-4 h-4 text-gold-accent" />
                  <span>Prep: <strong className="text-forest-green">{activeRecipe.prepTime}</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-walnut-brown/80">
                  <Utensils className="w-4 h-4 text-gold-accent" />
                  <span>Cook: <strong className="text-forest-green">{activeRecipe.cookTime}</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-walnut-brown/80">
                  <BookOpen className="w-4 h-4 text-gold-accent" />
                  <span>Yield: <strong className="text-forest-green">{activeRecipe.servings}</strong></span>
                </div>
              </div>

              {/* Ingredients & Steps split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Ingredients Column */}
                <div className="md:col-span-5">
                  <h4 className="font-serif text-md font-bold text-forest-green mb-4 flex items-center">
                    <span className="w-1.5 h-4 bg-gold-accent rounded-full mr-2" />
                    Ingredients
                  </h4>
                  <ul className="space-y-3">
                    {activeRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start text-xs text-walnut-brown/85 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-gold-accent shrink-0 mr-2 mt-0.5" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps Column */}
                <div className="md:col-span-7">
                  <h4 className="font-serif text-md font-bold text-forest-green mb-4 flex items-center">
                    <span className="w-1.5 h-4 bg-gold-accent rounded-full mr-2" />
                    Instructions
                  </h4>
                  <ol className="space-y-4">
                    {activeRecipe.steps.map((step, i) => (
                      <li key={i} className="flex items-start text-xs text-walnut-brown/85 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-light-beige text-walnut-brown font-bold flex items-center justify-center shrink-0 mr-3 text-[10px] mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

              </div>
            </div>

            {/* Health Tip Footer */}
            <div className="mt-8 pt-6 border-t border-light-beige/50 bg-brand-bg/45 p-4 rounded-xl border border-light-beige">
              <div className="flex items-start space-x-3">
                <Award className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-green block">Pro Wellness Tip</span>
                  <p className="text-xs text-walnut-brown/80 mt-1 leading-relaxed">
                    {activeRecipe.healthTip}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
