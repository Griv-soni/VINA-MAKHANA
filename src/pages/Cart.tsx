/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, HelpCircle, FileText, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Cart: React.FC = () => {
  const {
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    customerDetails,
    updateCustomerDetails,
    products
  } = useApp();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string>('');
  
  const [orderSummary, setOrderSummary] = useState<{
    orderId: string;
    customerName: string;
    products: string;
    quantity: number;
    totalAmount: number;
    date: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCopyFullDetails = () => {
    if (!orderSummary) return;
    const textToCopy = `Order ID: ${orderSummary.orderId}
Customer Name: ${orderSummary.customerName}
Products:
${orderSummary.products}
Total Quantity: ${orderSummary.quantity}
Total Amount: ₹${orderSummary.totalAmount}
Date: ${orderSummary.date}`;

    navigator.clipboard.writeText(textToCopy);
    triggerToast('✅ Order details copied successfully.');
  };

  // Parse items in the cart
  const cartItemsExtended = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const weightOption = product?.weightOptions.find((o) => o.label === item.selectedWeightLabel);
    const itemPrice = weightOption ? weightOption.price : 0;
    const itemSubtotal = itemPrice * item.quantity;

    return {
      ...item,
      product,
      price: itemPrice,
      subtotal: itemSubtotal
    };
  }).filter(item => item.product !== undefined);

  // Total Price Calculator
  const estimatedTotal = cartItemsExtended.reduce((sum, item) => sum + item.subtotal, 0);

  const handleQtyChange = (productId: string, weightLabel: string, currentQty: number, delta: number) => {
    updateCartQty(productId, weightLabel, currentQty + delta);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateCustomerDetails({
      ...customerDetails,
      [name]: value
    });
    // Clear error
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerDetails.name.trim()) errors.name = 'Full name is required';
    if (!customerDetails.phone.trim()) {
      errors.phone = 'Mobile number is required';
    } else if (!/^\+?[0-9\s\-]{8,15}$/.test(customerDetails.phone.trim())) {
      errors.phone = 'Please enter a valid mobile number';
    }
    if (!customerDetails.address.trim()) errors.address = 'Delivery address is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // 1. Generate a unique continuous-looking Order ID client-side formatted like VM-YYYYMMDD-secondsMillis
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const dateString = `${year}${month}${day}`;
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
      const generatedId = `VM-${dateString}-${seconds}${ms}`;
      
      setCreatedOrderId(generatedId);

      // Generate the WhatsApp message and link
      const getProductDetails = (item: typeof cartItemsExtended[0]) => {
        const id = item.productId;
        const name = item.product?.name || "";
        const isFlavored = item.product?.category === "flavored";

        let productName = "";
        let flavorOrVariantKey = isFlavored ? "Flavor" : "Variant";
        let flavorOrVariantValue = "";

        if (isFlavored) {
          productName = "Flavour Makhana";
          if (id === "peri-peri-flavored" || name.includes("Peri Peri")) {
            flavorOrVariantValue = "Peri Peri";
          } else if (id === "himalayan-salt-flavored" || name.includes("Himalaya") || name.includes("Himalayan") || name.includes("Salt")) {
            flavorOrVariantValue = "Himalayan Salt";
          } else if (id === "cheese-flavored" || name.includes("Cheese")) {
            flavorOrVariantValue = "Cheese";
          } else {
            flavorOrVariantValue = "Original";
          }
        } else {
          productName = "Raw Makhana";
          if (id === "raw-5-suta" || name.includes("5 Suta")) {
            flavorOrVariantValue = "5 Suta";
          } else if (id === "raw-6-suta" || name.includes("6 Suta")) {
            flavorOrVariantValue = "6 Suta";
          } else {
            flavorOrVariantValue = "6 Suta";
          }
        }

        return {
          productName,
          flavorOrVariantKey,
          flavorOrVariantValue
        };
      };

      let text = `🌿 *VINA MAKHANA — OFFICIAL ORDER* 🌿\n\n`;
      text += `Hello VINA MAKHANA team, I'd like to place an order for farm-fresh premium lotus seeds! Here are my delivery details:\n\n`;
      
      text += `📋 *ORDER DETAILS:*\n`;
      text += `• *Order ID:* ${generatedId}\n`;
      text += `• *Customer Name:* ${customerDetails.name.trim()}\n`;
      text += `• *Customer WhatsApp:* ${customerDetails.phone.trim()}\n`;
      text += `• *Delivery Address:* ${customerDetails.address.trim()}\n\n`;
      
      text += `📦 *ORDERED ITEMS:*\n`;
      text += `----------------------------------------\n`;
      cartItemsExtended.forEach((item, index) => {
        const { productName, flavorOrVariantKey, flavorOrVariantValue } = getProductDetails(item);
        const weight = item.selectedWeightLabel;
        const qty = item.quantity;
        const price = item.price;
        const total = item.subtotal;
        
        text += `${index + 1}️⃣ *Product:* ${productName}\n`;
        text += `   • *${flavorOrVariantKey}:* ${flavorOrVariantValue}\n`;
        text += `   • *Weight:* ${weight}\n`;
        text += `   • *Quantity:* ${qty}\n`;
        text += `   • *Unit Price:* ₹${price}\n`;
        text += `   • *Line Total:* ₹${total}\n\n`;
      });
      text += `----------------------------------------\n`;
      text += `💰 *Grand Total:* ₹${estimatedTotal}\n\n`;
      text += `Thank you for your premium service! Please confirm my order and share secure UPI/card payment details. 💚`;

      const encodedMessage = encodeURIComponent(text);
      const waUrl = `https://wa.me/916356390666?text=${encodedMessage}`;
      setWhatsappLink(waUrl);

      // Capture order summary for copying details before clearing cart
      const productsSummaryText = cartItemsExtended.map(item => {
        const { productName, flavorOrVariantValue } = getProductDetails(item);
        return `• ${productName} (${flavorOrVariantValue}, ${item.selectedWeightLabel}) x ${item.quantity} - ₹${item.subtotal}`;
      }).join('\n');

      const totalQty = cartItemsExtended.reduce((sum, item) => sum + item.quantity, 0);

      setOrderSummary({
        orderId: generatedId,
        customerName: customerDetails.name.trim(),
        products: productsSummaryText,
        quantity: totalQty,
        totalAmount: estimatedTotal,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });

      setOrderPlaced(true);

      // Open WhatsApp link immediately
      window.open(waUrl, '_blank');

      // 2. Clear local cart
      clearCart();

    } catch (err) {
      console.error('Error placing order:', err);
      alert('An error occurred while generating your order details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItemsExtended.length === 0 && !orderPlaced) {
    return (
      <div id="cart-empty-state" className="py-24 sm:py-32 text-center animate-fade-in min-h-[calc(100vh-80px)]">
        <div className="max-w-md mx-auto px-4 space-y-6">
          <div className="w-20 h-20 bg-light-beige/40 rounded-full flex items-center justify-center text-walnut-brown/60 mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-forest-green">Your Cart Is Empty</h2>
          <p className="text-xs sm:text-sm text-walnut-brown/75 leading-relaxed font-sans">
            It looks like you haven’t added any premium VINA MAKHANA selections to your cart yet. Explore our fresh collections to start your healthy snacking journey!
          </p>
          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-forest-green hover:bg-gold-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Live premium success confetti
  const ConfettiEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(40)].map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 2.5 + Math.random() * 2;
        const size = 5 + Math.random() * 8;
        const bg = ['bg-gold-accent', 'bg-forest-green', 'bg-emerald-400', 'bg-amber-400', 'bg-pink-400'][Math.floor(Math.random() * 5)];
        return (
          <div
            key={i}
            className={`absolute top-0 ${bg} rounded-full`}
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.8,
              animation: `cart-confetti-fall ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes cart-confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );

  return (
    <div id="cart-page" className="py-16 sm:py-24 animate-fade-in min-h-[calc(100vh-80px)] flex items-center justify-center relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Title */}
        {!orderPlaced && (
          <div className="mb-12 text-left">
            <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-2">
              Your Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-green tracking-tight leading-tight">
              Review Your Cart
            </h1>
          </div>
        )}

        {/* Success screen overlay */}
        {orderPlaced ? (
          <div className="min-h-[60vh] flex items-center justify-center p-4 relative overflow-hidden w-full">
            <ConfettiEffect />
            <div className="max-w-xl w-full bg-white/90 backdrop-blur-md border border-white/45 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative z-10 animate-scale-in">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-3xl font-bold text-forest-green">🎉 Order Request Received!</h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-walnut-brown/85 font-sans leading-relaxed text-left p-4 bg-light-beige/20 rounded-2xl border border-light-beige/30">
                <p className="font-semibold text-center text-forest-green text-base">Your order request has been received successfully.</p>
                <p>Please tap the WhatsApp button below to send your pre-filled order message to our team.</p>
                <p>All future order updates (Order Received, Confirmed, Packed, Dispatched, Delivered) will be shared directly with you on WhatsApp.</p>
                <p className="font-medium text-center text-gold-accent">Please save your Order ID for future reference.</p>
              </div>

              <div className="p-5 bg-forest-green/5 border border-forest-green/10 rounded-2xl space-y-2 flex flex-col items-center justify-center backdrop-blur-sm">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-accent block">Order ID</span>
                <p className="font-mono text-lg sm:text-xl font-bold text-forest-green tracking-wider">{createdOrderId}</p>
                <button
                  onClick={() => {
                    if (createdOrderId) {
                      navigator.clipboard.writeText(createdOrderId);
                      triggerToast('✅ Order ID copied successfully.');
                    }
                  }}
                  className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 bg-forest-green/10 hover:bg-forest-green/20 text-forest-green font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  <span>Copy Order ID</span>
                </button>
              </div>

              {/* Action Buttons Block */}
              <div className="space-y-3 pt-2">
                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center"
                  >
                    💬 Send Order on WhatsApp
                  </a>
                )}
                
                <button
                  onClick={handleCopyFullDetails}
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-white border border-forest-green/30 hover:border-forest-green hover:bg-forest-green/5 text-forest-green font-bold text-xs uppercase tracking-widest rounded-2xl shadow-sm transition-all duration-300"
                >
                  <span>📄 Copy Full Order Details</span>
                </button>
              </div>

              {/* 🟢 Order Updates Card */}
              <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-left text-xs sm:text-sm text-walnut-brown/90 space-y-3 shadow-sm backdrop-blur-sm">
                <h3 className="font-serif font-extrabold text-emerald-800 text-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shrink-0" />
                  🟢 Order Updates
                </h3>
                <div className="space-y-2 leading-relaxed font-sans text-xs sm:text-sm">
                  <p>After sending your WhatsApp message, our team will provide all future updates directly on WhatsApp.</p>
                  <p className="font-semibold text-walnut-brown/95">Updates include:</p>
                  <ul className="space-y-1.5 pl-1">
                    <li className="flex items-center gap-2">• 🟢 Order Received</li>
                    <li className="flex items-center gap-2">• ✅ Order Confirmed</li>
                    <li className="flex items-center gap-2">• 📦 Packed</li>
                    <li className="flex items-center gap-2">• 🚚 Dispatched</li>
                    <li className="flex items-center gap-2">• 🎉 Delivered</li>
                  </ul>
                  <p className="text-[11px] text-walnut-brown/70 italic pt-1">Please keep your Order ID safe.</p>
                </div>
              </div>

              {/* 📋 Save Your Order ID Card */}
              <div className="p-5 bg-forest-green/5 border border-forest-green/10 rounded-2xl text-left text-xs sm:text-sm text-walnut-brown/90 space-y-2 shadow-sm backdrop-blur-sm">
                <h3 className="font-serif font-extrabold text-forest-green text-sm flex items-center gap-2">
                  📋 Save Your Order ID
                </h3>
                <div className="space-y-2 leading-relaxed font-sans text-walnut-brown/85 text-xs sm:text-sm">
                  <p>If you contact us again in the future, simply send your Order ID on WhatsApp.</p>
                  <p>This helps us quickly find your order and provide faster support.</p>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 items-center justify-center">
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-8 py-3.5 bg-forest-green hover:bg-gold-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all duration-300 text-center"
                >
                  Continue Shopping
                </Link>
                <Link
                  to="/"
                  className="w-full sm:w-auto px-8 py-3.5 bg-light-beige/30 hover:bg-light-beige/50 text-walnut-brown font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm transition-all text-center"
                >
                  Close
                </Link>
              </div>

              {/* Small Footer Text */}
              <div className="pt-4 border-t border-light-beige/30 text-[11px] sm:text-xs text-walnut-brown/60 italic font-sans">
                <p className="font-bold text-forest-green">Need help?</p>
                <p>Contact us anytime on WhatsApp using your Order ID for faster assistance.</p>
              </div>

              {/* Toast Notification */}
              {showToast && toastMessage && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-forest-green text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2 transition-all duration-300 transform scale-100 font-sans font-semibold text-xs sm:text-sm backdrop-blur-md animate-bounce">
                  <span>{toastMessage}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Cart items table/cards */}
            <div className="lg:col-span-7 space-y-6">
              
              {cartItemsExtended.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedWeightLabel}`}
                  className="bg-white rounded-2xl border border-light-beige/45 p-4 sm:p-5 flex items-center gap-4 sm:gap-6 shadow-sm relative"
                >
                  {/* Thumb image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-brand-bg/50 border border-light-beige/30">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info contents */}
                  <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-forest-green text-sm sm:text-base line-clamp-1">
                        {item.product?.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-walnut-brown/65">
                        <span className="font-semibold bg-brand-bg border border-light-beige px-2 py-0.5 rounded text-[10px] uppercase">
                          {item.selectedWeightLabel}
                        </span>
                        <span>•</span>
                        <span>Price: ₹{item.price}</span>
                      </div>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-light-beige rounded-lg p-0.5 bg-brand-bg/40">
                        <button
                          onClick={() => handleQtyChange(item.productId, item.selectedWeightLabel, item.quantity, -1)}
                          className="w-8 h-8 rounded flex items-center justify-center text-walnut-brown hover:bg-light-beige transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-xs font-bold text-forest-green">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQtyChange(item.productId, item.selectedWeightLabel, item.quantity, 1)}
                          className="w-8 h-8 rounded flex items-center justify-center text-walnut-brown hover:bg-light-beige transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item subtotal cost */}
                      <span className="font-serif font-bold text-forest-green text-base w-20 text-right">
                        ₹{item.subtotal}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button absolute right */}
                  <button
                    onClick={() => removeFromCart(item.productId, item.selectedWeightLabel)}
                    className="absolute top-4 right-4 text-walnut-brown/40 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              ))}

              {/* Safety Badges banner */}
              <div className="bg-[#FCFAF6] border border-light-beige/60 rounded-2xl p-6 flex items-start space-x-4">
                <ShieldCheck className="w-6 h-6 text-gold-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-forest-green text-sm">Hygienic Direct Packaging Promise</h4>
                  <p className="text-[11px] sm:text-xs text-walnut-brown/70 leading-relaxed mt-1 font-sans">
                    VINA MAKHANA ensures that your organic fox nuts are packed freshly in high-barrier clean containers only hours before shipment. Sealed under protective modified gas standards to preserve that signature airy crunch.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Customer info Form & Price calculations */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-light-beige/50 p-6 sm:p-8 shadow-sm space-y-8">
              
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-forest-green">Delivery Invoice</h2>
                <div className="w-12 h-0.5 bg-gold-accent rounded-full" />
              </div>

              {/* Price Calculations */}
              <div className="space-y-3.5 text-xs sm:text-sm border-b border-light-beige pb-6">
                <div className="flex justify-between text-walnut-brown/75">
                  <span>Selected Subtotal ({cartItemsExtended.length} lines)</span>
                  <span className="font-semibold text-walnut-brown">₹{estimatedTotal}</span>
                </div>
                <div className="flex justify-between text-walnut-brown/75">
                  <span>Eco-Hygienic Packing</span>
                  <span className="font-bold text-emerald-600 uppercase tracking-widest text-[10px]">Free</span>
                </div>
                <div className="flex justify-between text-walnut-brown/75">
                  <span>Premium Climate Dispatch</span>
                  <span className="font-bold text-emerald-600 uppercase tracking-widest text-[10px]">Free</span>
                </div>
                
                <div className="flex justify-between text-base font-bold text-forest-green pt-3 border-t border-dashed border-light-beige">
                  <span className="font-serif">Estimated Total</span>
                  <span className="font-serif text-lg">₹{estimatedTotal}</span>
                </div>
              </div>

              {/* Customer Details Form */}
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-left">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gold-accent mb-1 flex items-center">
                  <FileText className="w-4 h-4 mr-1.5" />
                  <span>Customer Dispatch Details</span>
                </h3>

                <div className="space-y-1.5">
                  <label htmlFor="customer-name" className="text-[10px] font-bold uppercase tracking-wider text-forest-green block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    name="name"
                    value={customerDetails.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm text-walnut-brown font-sans bg-brand-bg/25 focus:outline-none focus:ring-1 ${
                      formErrors.name ? 'border-red-400 focus:ring-red-400' : 'border-light-beige focus:ring-gold-accent'
                    }`}
                  />
                  {formErrors.name && (
                    <span className="text-[10px] text-red-500 font-bold block">{formErrors.name}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="customer-phone" className="text-[10px] font-bold uppercase tracking-wider text-forest-green block">
                    WhatsApp Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    name="phone"
                    value={customerDetails.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm text-walnut-brown font-sans bg-brand-bg/25 focus:outline-none focus:ring-1 ${
                      formErrors.phone ? 'border-red-400 focus:ring-red-400' : 'border-light-beige focus:ring-gold-accent'
                    }`}
                  />
                  {formErrors.phone && (
                    <span className="text-[10px] text-red-500 font-bold block">{formErrors.phone}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="customer-address" className="text-[10px] font-bold uppercase tracking-wider text-forest-green block">
                    Full Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="customer-address"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Provide detailed physical address with City, Pincode & Landmark..."
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm text-walnut-brown font-sans bg-brand-bg/25 focus:outline-none focus:ring-1 ${
                      formErrors.address ? 'border-red-400 focus:ring-red-400' : 'border-light-beige focus:ring-gold-accent'
                    }`}
                  />
                  {formErrors.address && (
                    <span className="text-[10px] text-red-500 font-bold block">{formErrors.address}</span>
                  )}
                </div>

                {/* Submit Order Action Button */}
                <div className="pt-4">
                  <button
                    id="cart-submit-whatsapp-btn"
                    type="submit"
                    className="w-full py-4 bg-forest-green hover:bg-gold-accent text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2.5"
                  >
                    <span>Place Order on WhatsApp</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </form>

              {/* No e-commerce info note */}
              <div className="bg-light-beige/30 p-4 rounded-xl border border-light-beige/50 text-[10px] text-walnut-brown/75 font-sans leading-relaxed flex items-start space-x-2.5">
                <HelpCircle className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                <p>
                  <strong>No Payment Gateways Required:</strong> Clicking the button pre-formats your invoice and sends it directly to our sales desk. We manually verify stock and share payment details (UPI/Card) on chat!
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
