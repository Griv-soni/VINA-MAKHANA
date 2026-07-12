/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WeightOption {
  label: string;
  weightValue: number; // in grams
  price: number; // in INR
}

export interface Product {
  id: string;
  name: string;
  category: 'flavored' | 'raw';
  description: string;
  longDescription: string;
  benefits: string[];
  ingredients: string[];
  weightOptions: WeightOption[];
  image: string;
  gallery: string[];
  bestseller: boolean;
  freshlyPacked: boolean;
}

export interface CartItem {
  productId: string;
  selectedWeightLabel: string;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "peri-peri-flavored",
    name: "Peri Peri Makhana",
    category: "flavored",
    description: "A fiery blend of African bird's eye chili and aromatic spices. Crisp, bold, and highly addictive.",
    longDescription: "Indulge in the fiery sensation of our Peri Peri Makhana. Handcrafted for spice lovers, we roast our premium organic fox nuts to perfection in pure cow ghee and toss them in our signature African bird's eye chili spice blend. It's the ultimate guilt-free, fiery snack that packs a nutritional punch.",
    benefits: [
      "High Protein & Active Energy",
      "Rich in Antioxidants & Dietary Fiber",
      "Completely Gluten-Free",
      "Roasted in Ghee, Never Fried",
      "Low Glycemic Index"
    ],
    ingredients: [
      "Premium Fox Nuts (Makhana)",
      "Pure Cow Ghee / Olive Oil",
      "Red Chili Powder",
      "Black Pepper",
      "Garlic Powder",
      "Onion Powder",
      "Acidity Regulator (Citric Acid)",
      "Spices & Condiments"
    ],
    weightOptions: [
      { label: "150g", weightValue: 150, price: 180 },
      { label: "250g", weightValue: 250, price: 290 }
    ],
    image: "/assets/images/peri_peri_makhana_1783608969419.jpg",
    gallery: [
      "/assets/images/peri_peri_makhana_1783608969419.jpg",
      "/assets/images/makhana_banner_1783608940130.jpg",
      "/assets/images/raw_makhana_1783608954057.jpg"
    ],
    bestseller: true,
    freshlyPacked: true
  },
  {
    id: "himalayan-salt-flavored",
    name: "Himalaya Salt Makhana",
    category: "flavored",
    description: "Lightly toasted fox nuts seasoned with pink Himalayan salt and a dash of pepper. Clean and balanced.",
    longDescription: "Experience pure, natural simplicity with our Himalaya Salt Makhana. Lightly roasted to an exquisite crunch, these fox nuts are seasoned with raw, mineral-rich pink salt harvested from ancient Himalayan foothills and a delicate touch of cracked black pepper. Perfect for clean eating, mindful snacking, or adding crunch to your salads.",
    benefits: [
      "Heart Healthy & Low Sodium",
      "Rich in Essential Trace Minerals",
      "100% Gluten-Free",
      "Zero Trans Fat",
      "Supports Natural Digestion"
    ],
    ingredients: [
      "Premium Fox Nuts (Makhana)",
      "Pure Cow Ghee / Olive Oil",
      "Pink Himalayan Salt",
      "Cracked Black Pepper"
    ],
    weightOptions: [
      { label: "150g", weightValue: 150, price: 160 },
      { label: "250g", weightValue: 250, price: 260 }
    ],
    image: "/assets/images/salt_makhana_1783608983772.jpg",
    gallery: [
      "/assets/images/salt_makhana_1783608983772.jpg",
      "/assets/images/makhana_banner_1783608940130.jpg",
      "/assets/images/raw_makhana_1783608954057.jpg"
    ],
    bestseller: false,
    freshlyPacked: true
  },
  {
    id: "cheese-flavored",
    name: "Gourmet Cheese Makhana",
    category: "flavored",
    description: "Rich, creamy, and velvety white cheese seasoning that melts in your mouth. Kid-friendly gourmet snack.",
    longDescription: "A gourmet delight for cheese connoisseurs of all ages. Our Gourmet Cheese Makhana features premium roasted fox nuts coated in a luxurious, velvety white cheese seasoning. It delivers a creamy, savory experience that melts in your mouth without any of the heavy calories of standard cheese chips.",
    benefits: [
      "Gourmet Cheese Flavor",
      "Calcium-Rich Healthy Snack",
      "No Artificial Flavors or Preservatives",
      "Slow Baked for Perfect Crunch",
      "Low Saturated Fat"
    ],
    ingredients: [
      "Premium Fox Nuts (Makhana)",
      "Pure Cow Ghee / Olive Oil",
      "White Cheddar Cheese Powder",
      "Whey Powder",
      "Salt",
      "Natural Herb Extract"
    ],
    weightOptions: [
      { label: "150g", weightValue: 150, price: 195 },
      { label: "250g", weightValue: 250, price: 310 }
    ],
    image: "/assets/images/cheese_makhana_1783609016694.jpg",
    gallery: [
      "/assets/images/cheese_makhana_1783609016694.jpg",
      "/assets/images/makhana_banner_1783608940130.jpg",
      "/assets/images/raw_makhana_1783608954057.jpg"
    ],
    bestseller: true,
    freshlyPacked: true
  },
  {
    id: "raw-5-suta",
    name: "Raw Makhana (5 Suta - Crisp Grade)",
    category: "raw",
    description: "High-quality raw lotus seeds, size grade 5. Crisp and perfect for roasting and traditional recipes.",
    longDescription: "Perfect for those who love to customize their snacks. Our 5 Suta Raw Makhana is carefully sourced from organic farms, dried naturally, and hand-sorted to maintain a crisp size-grade of 5. It is raw, completely unprocessed, and ideal for roasting at home with your own signature spices or incorporating into traditional Indian desserts like Kheer.",
    benefits: [
      "100% Raw & Certified Organic",
      "Zero Added Sodium or Oils",
      "High Calcium & Magnesium Content",
      "Versatile Ingredient for Curries & Desserts",
      "Completely Preservative-Free"
    ],
    ingredients: [
      "100% Natural Raw Lotus Seeds (Fox Nuts)"
    ],
    weightOptions: [
      { label: "500g", weightValue: 500, price: 350 },
      { label: "1kg", weightValue: 1000, price: 650 }
    ],
    image: "/assets/images/raw_makhana_1783608954057.jpg",
    gallery: [
      "/assets/images/raw_makhana_1783608954057.jpg",
      "/assets/images/makhana_banner_1783608940130.jpg"
    ],
    bestseller: false,
    freshlyPacked: true
  },
  {
    id: "raw-6-suta",
    name: "Raw Makhana (6 Suta - Premium Luxury Grade)",
    category: "raw",
    description: "Premium bold grade-A raw makhana, size grade 6. Giant size, ultra-crisp, the gold standard.",
    longDescription: "Experience the pinnacle of luxury snacking with our 6 Suta Raw Makhana. Sourced from deep-water fields and graded as size-6, these are the largest, roundest, and cleanest lotus seeds available anywhere. They boast an exceptional texture and an ultra-crisp finish that makes them the gold standard. Hand-packed hygienically to preserve raw freshness.",
    benefits: [
      "Luxury Graded Size 6 (Largest Available)",
      "Maximum Expansion & Supreme Crunch",
      "Super Rich in Antioxidants & Plant Proteins",
      "Excellent Gluten-Free Flour Substitute",
      "Premium Gift Quality Grade"
    ],
    ingredients: [
      "100% Premium Natural Grade-A Lotus Seeds (Fox Nuts)"
    ],
    weightOptions: [
      { label: "500g", weightValue: 500, price: 420 },
      { label: "1kg", weightValue: 1000, price: 790 }
    ],
    image: "/assets/images/raw_makhana_1783608954057.jpg",
    gallery: [
      "/assets/images/raw_makhana_1783608954057.jpg",
      "/assets/images/makhana_banner_1783608940130.jpg"
    ],
    bestseller: true,
    freshlyPacked: true
  }
];

export type OrderStatus = 'received' | 'confirmed' | 'dispatched' | 'delivered';

export interface OrderItem {
  productId: string;
  name: string;
  weightLabel: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderReview {
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  review?: OrderReview;
}

