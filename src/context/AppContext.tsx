/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CustomerDetails, Product, PRODUCTS } from '../types';

interface AppContextType {
  cart: CartItem[];
  addToCart: (productId: string, weightLabel: string, qty: number) => void;
  removeFromCart: (productId: string, weightLabel: string) => void;
  updateCartQty: (productId: string, weightLabel: string, qty: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  customerDetails: CustomerDetails;
  updateCustomerDetails: (details: CustomerDetails) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  refreshProducts: () => Promise<void>;
  loadingProducts: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultDetails: CustomerDetails = {
  name: '',
  phone: '',
  address: ''
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('vina_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('vina_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    const saved = localStorage.getItem('vina_customer');
    return saved ? JSON.parse(saved) : defaultDetails;
  });

  const [searchQuery, setSearchQuery] = useState('');

  const refreshProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch dynamic products from API', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('vina_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vina_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('vina_customer', JSON.stringify(customerDetails));
  }, [customerDetails]);

  const addToCart = (productId: string, weightLabel: string, qty: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === productId && item.selectedWeightLabel === weightLabel
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + qty
        };
        return next;
      }
      return [...prev, { productId, selectedWeightLabel: weightLabel, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string, weightLabel: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.selectedWeightLabel === weightLabel)
      )
    );
  };

  const updateCartQty = (productId: string, weightLabel: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, weightLabel);
      return;
    }
    setCart((prev) => {
      return prev.map((item) => {
        if (item.productId === productId && item.selectedWeightLabel === weightLabel) {
          return { ...item, quantity: qty };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const updateCustomerDetails = (details: CustomerDetails) => {
    setCustomerDetails(details);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        customerDetails,
        updateCustomerDetails,
        searchQuery,
        setSearchQuery,
        products,
        refreshProducts,
        loadingProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
