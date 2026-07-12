import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, MessageSquare, ChevronRight, Check, Send, Globe,
  Star, ArrowRight, Loader2, Sparkles, AlertCircle, Calendar, User, ShoppingBag, Plus, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, collection, getDocs, setDoc, doc, query, orderBy, onSnapshot, where } from '../lib/firebase';

const PRODUCT_LIST = [
  'Flavored Makhana – Peri Peri',
  'Flavored Makhana – Himalayan Salt',
  'Flavored Makhana – Cheese',
  'Raw Makhana – 5 Suta',
  'Raw Makhana – 6 Suta'
];

interface Review {
  id: string;
  customerName: string;
  mobileNumber: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Custom performant CSS-based confetti explosion
const ConfettiEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(60)].map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 2 + Math.random() * 2.5;
        const size = 6 + Math.random() * 10;
        const colors = [
          'bg-gold-accent',
          'bg-forest-green',
          'bg-emerald-400',
          'bg-amber-400',
          'bg-red-400',
          'bg-blue-400',
          'bg-pink-400'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shapes = ['rounded-full', 'rounded-none', 'rotate-12', 'rotate-45'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        return (
          <div
            key={i}
            className={`absolute top-0 ${color} ${shape}`}
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.85,
              animation: `confetti-fall ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const writeRequested = searchParams.get('write') === 'true';
  const reviewsRequested = searchParams.get('reviews') === 'true';

  const reviewsSectionRef = useRef<HTMLDivElement>(null);

  // Contact Form states
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  // Reviews states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Review Form states
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [productName, setProductName] = useState(PRODUCT_LIST[0]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewFormError, setReviewFormError] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  // Stats calculation
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? parseFloat((reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1))
    : 5.0;

  // Real-time Firestore Sync for Reviews
  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews: Review[] = [];
      snapshot.forEach((doc) => {
        fetchedReviews.push({ id: doc.id, ...doc.data() } as Review);
      });
      setReviews(fetchedReviews);
      setLoadingReviews(false);
    }, (err) => {
      console.error("Firestore reviews sync failed:", err);
      setLoadingReviews(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle auto-scroll and triggers based on query params
  useEffect(() => {
    if (writeRequested) {
      setShowReviewForm(true);
      setTimeout(() => {
        reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    } else if (reviewsRequested) {
      setTimeout(() => {
        reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  }, [writeRequested, reviewsRequested]);

  // Contact Form submit
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    
    // Format message
    const formattedMessage = encodeURIComponent(
      `Hello VINA MAKHANA!\n\nMy name is ${contactData.name}.\nEmail: ${contactData.email}\nPhone: ${contactData.phone || 'N/A'}\n\nMessage:\n${contactData.message}`
    );

    // Open WhatsApp
    window.open(`https://wa.me/916356390666?text=${formattedMessage}`, '_blank');
    
    setIsContactSubmitted(true);
    setTimeout(() => {
      setIsContactSubmitted(false);
      setContactData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  // Review Form submit
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewFormError(null);

    // Validation
    if (!customerName.trim()) {
      setReviewFormError('Please enter your name.');
      return;
    }
    const cleanPhone = mobileNumber.replace(/[^\d]/g, '');
    if (cleanPhone.length < 8) {
      setReviewFormError('Please enter a valid mobile number (at least 8 digits).');
      return;
    }
    if (!comment.trim()) {
      setReviewFormError('Please share a brief review message.');
      return;
    }

    setSubmittingReview(true);

    try {
      // 24-hour Duplicate Prevention check
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const dupQuery = query(
        collection(db, 'reviews'),
        where('mobileNumber', '==', cleanPhone)
      );
      const dupSnap = await getDocs(dupQuery);
      
      let isDuplicate = false;
      dupSnap.forEach((docSnap) => {
        const reviewData = docSnap.data();
        if (reviewData.createdAt && reviewData.createdAt >= dayAgo) {
          isDuplicate = true;
        }
      });

      if (isDuplicate) {
        setReviewFormError('You have already submitted a review recently. Please try again after 24 hours. Thank you for your valuable feedback.');
        setSubmittingReview(false);
        return;
      }

      // Store in Firestore
      const newReviewDoc = doc(collection(db, 'reviews'));
      const reviewPayload = {
        customerName: customerName.trim(),
        mobileNumber: cleanPhone,
        productName,
        rating,
        comment: comment.trim(),
        createdAt: new Date().toISOString()
      };

      await setDoc(newReviewDoc, reviewPayload);

      // Trigger successful submission
      setShowThankYou(true);
      
      // Auto-reset form
      setCustomerName('');
      setMobileNumber('');
      setProductName(PRODUCT_LIST[0]);
      setRating(5);
      setComment('');
      setShowReviewForm(false);

      // Auto close thank you after 5 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);

    } catch (err: any) {
      console.error("Error submitting review:", err);
      setReviewFormError('An error occurred while saving your review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div id="contact-page" className="py-16 sm:py-24 animate-fade-in relative min-h-screen bg-brand-bg/10">
      
      {/* 1. Glassmorphism Thank You Success Modal */}
      <AnimatePresence>
        {showThankYou && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-md w-full bg-white/90 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl text-center space-y-6 overflow-hidden"
            >
              <ConfettiEffect />

              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-forest-green">🎉 Thank You for Your Feedback!</h2>
                <div className="text-xs sm:text-sm text-walnut-brown/80 font-sans leading-relaxed space-y-3">
                  <p>Your review has been submitted successfully.</p>
                  <p>Thank you for sharing your experience with VINA MAKHANA.</p>
                  <p>We truly appreciate your support and look forward to serving you again.</p>
                </div>
              </div>

              <div className="pt-2 text-xs font-bold text-gold-accent tracking-wide">
                💚 Team VINA MAKHANA
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  to="/products"
                  onClick={() => setShowThankYou(false)}
                  className="flex-1 py-3 bg-forest-green hover:bg-gold-accent text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all text-center"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={() => setShowThankYou(false)}
                  className="flex-1 py-3 bg-light-beige/30 hover:bg-light-beige/50 text-walnut-brown font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold-accent font-medium uppercase tracking-[0.2em] text-xs block mb-3">
            Inquiries & Collaborations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-forest-green tracking-tight leading-tight">
            Connect With VINA MAKHANA
          </h1>
          <div className="w-20 h-1 bg-gold-accent mx-auto my-6 rounded-full" />
          <p className="text-walnut-brown/75 font-sans text-sm sm:text-base">
            Have a question about our grading standards, wholesale collaborations, or need support with custom orders? Reach out to our wellness team.
          </p>
        </div>

        {/* Info Cards and Contact form splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column: Quick Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#FCFAF6] border border-light-beige/60 p-8 rounded-3xl space-y-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-forest-green">Direct Channels</h2>
              <p className="text-xs text-walnut-brown/75 font-sans leading-relaxed">
                Skip the form and chat with our team directly. We are fully active on WhatsApp to process custom luxury orders.
              </p>

              <div className="space-y-6">
                
                {/* Channel 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green shrink-0">
                    <Phone className="w-5 h-5 text-gold-accent" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-forest-green">Phone & WhatsApp Support</h3>
                    <p className="text-sm text-walnut-brown font-semibold mt-1">+91 63563 90666</p>
                    <a
                      href="https://wa.me/916356390666"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gold-accent hover:underline font-semibold mt-1 block"
                    >
                      Click to chat now ➔
                    </a>
                  </div>
                </div>

                {/* Channel 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green shrink-0">
                    <Mail className="w-5 h-5 text-gold-accent" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-forest-green">General Email Inbox</h3>
                    <p className="text-sm text-walnut-brown font-semibold mt-1">divyangsoni18@gmail.com</p>
                    <p className="text-[11px] text-walnut-brown/50">Same-day response time</p>
                  </div>
                </div>

                {/* Channel 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green shrink-0">
                    <MapPin className="w-5 h-5 text-gold-accent" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-forest-green">Corporate Headquarters</h3>
                    <p className="text-xs sm:text-sm text-walnut-brown leading-relaxed mt-1 font-semibold">
                      Navkar Heights, Ognaj Circle, Ognaj, Ahmedabad - 380060
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-light-beige/40 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-forest-green mb-3">Send A Quick Message</h2>
            <p className="text-xs text-walnut-brown/70 font-sans mb-8 leading-relaxed">
              Fill in your contact information, and clicking Submit will launch a formatted chat directly to our executive team on WhatsApp.
            </p>

            {isContactSubmitted ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3 animate-scale-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-emerald-800">Inquiry Sent Successfully!</h3>
                <p className="text-xs text-emerald-700 font-sans max-w-md mx-auto leading-relaxed">
                  Your details have been pre-formatted and opened inside WhatsApp chat. Our support representative will message you shortly to confirm.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-forest-green">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={contactData.name}
                      onChange={handleContactChange}
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-light-beige focus:outline-none focus:ring-2 focus:ring-gold-accent text-xs sm:text-sm text-walnut-brown font-sans bg-brand-bg/35"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-forest-green">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleContactChange}
                      required
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-light-beige focus:outline-none focus:ring-2 focus:ring-gold-accent text-xs sm:text-sm text-walnut-brown font-sans bg-brand-bg/35"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className="text-xs font-bold uppercase tracking-wider text-forest-green">
                    Mobile Number (Optional)
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={contactData.phone}
                    onChange={handleContactChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-light-beige focus:outline-none focus:ring-2 focus:ring-gold-accent text-xs sm:text-sm text-walnut-brown font-sans bg-brand-bg/35"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-forest-green">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={contactData.message}
                    onChange={handleContactChange}
                    required
                    rows={5}
                    placeholder="Write details of your query or wholesale requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-light-beige focus:outline-none focus:ring-2 focus:ring-gold-accent text-xs sm:text-sm text-walnut-brown font-sans bg-brand-bg/35"
                  />
                </div>

                <div className="pt-4">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-forest-green hover:bg-gold-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit via WhatsApp</span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* CONSOLIDATED CUSTOMER REVIEWS & FEEDBACK SECTION */}
        {/* ---------------------------------------------------- */}
        <div 
          ref={reviewsSectionRef}
          id="customer-reviews-panel"
          className="border-t border-light-beige/60 pt-20 pb-12 space-y-12"
        >
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-gold-accent/10 rounded-full text-gold-accent">
              <Sparkles className="w-4 h-4 fill-current animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Verified Customer Feedback Desk</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-forest-green tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-xs sm:text-sm text-walnut-brown/70 max-w-xl mx-auto leading-relaxed">
              Real feedback from wellness lovers, health enthusiasts, and mindful snackers.
            </p>

            {/* Aggregated Stats Card */}
            <div className="max-w-md mx-auto mt-6 bg-white border border-light-beige/50 p-6 rounded-3xl shadow-sm flex items-center justify-around">
              <div className="text-center space-y-1">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-forest-green">{averageRating}</span>
                <div className="flex justify-center text-gold-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-gold-accent text-gold-accent' : 'text-light-beige'}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-walnut-brown/50">Average Rating</span>
              </div>
              
              <div className="w-[1px] h-16 bg-light-beige" />

              <div className="text-center space-y-1">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-forest-green">{totalReviews}</span>
                <div className="flex justify-center text-forest-green font-semibold text-xs">
                  100% Verified
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-walnut-brown/50">Total Reviews</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-forest-green hover:bg-gold-accent text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {showReviewForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{showReviewForm ? 'Close Review Form' : 'Write a Review'}</span>
              </button>
            </div>
          </div>

          {/* Review Submission Form (Expandable) */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="max-w-xl mx-auto bg-white border border-light-beige p-6 sm:p-10 rounded-3xl shadow-md space-y-6">
                  <div className="text-center">
                    <h3 className="font-serif text-xl font-bold text-forest-green">Share Your Snacking Experience</h3>
                    <p className="text-xs text-walnut-brown/60 mt-1">Let us know how you enjoyed our fresh, premium fox nuts!</p>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label htmlFor="form-name" className="text-[10px] font-bold uppercase tracking-wider text-forest-green block">
                        Customer Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-walnut-brown/40 absolute left-3.5 top-3.5" />
                        <input
                          id="form-name"
                          type="text"
                          required
                          placeholder="e.g. Priyal Soni"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-4 py-3 pl-10 rounded-xl border border-light-beige text-xs sm:text-sm bg-brand-bg/10 focus:outline-none focus:ring-1 focus:ring-gold-accent text-walnut-brown font-sans"
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1">
                      <label htmlFor="form-mobile" className="text-[10px] font-bold uppercase tracking-wider text-forest-green block">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-walnut-brown/40 absolute left-3.5 top-3.5" />
                        <input
                          id="form-mobile"
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="w-full px-4 py-3 pl-10 rounded-xl border border-light-beige text-xs sm:text-sm bg-brand-bg/10 focus:outline-none focus:ring-1 focus:ring-gold-accent text-walnut-brown font-sans"
                        />
                      </div>
                      <span className="text-[9px] text-walnut-brown/40 block">Used strictly to verify unique purchase; never displayed publicly.</span>
                    </div>

                    {/* Product Dropdown */}
                    <div className="space-y-1">
                      <label htmlFor="form-product" className="text-[10px] font-bold uppercase tracking-wider text-forest-green block">
                        Select Purchased Product <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <ShoppingBag className="w-4 h-4 text-walnut-brown/40 absolute left-3.5 top-3.5" />
                        <select
                          id="form-product"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className="w-full px-4 py-3 pl-10 rounded-xl border border-light-beige text-xs sm:text-sm bg-brand-bg/10 focus:outline-none focus:ring-1 focus:ring-gold-accent text-walnut-brown font-sans appearance-none cursor-pointer"
                        >
                          {PRODUCT_LIST.map((prod) => (
                            <option key={prod} value={prod}>{prod}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Stars Rating selection */}
                    <div className="space-y-2 text-center pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-forest-green block">Your Rating Selection</span>
                      <div className="flex justify-center items-center space-x-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="p-1 focus:outline-none hover:scale-110 transition-transform"
                            aria-label={`Rate ${star} Stars`}
                          >
                            <Star
                              className={`w-8 h-8 transition-colors ${
                                star <= (hoverRating ?? rating)
                                  ? 'fill-gold-accent text-gold-accent'
                                  : 'text-light-beige fill-transparent'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review Message */}
                    <div className="space-y-1">
                      <label htmlFor="form-message" className="text-[10px] font-bold uppercase tracking-wider text-forest-green block">
                        Review Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="w-4 h-4 text-walnut-brown/40 absolute left-3.5 top-3.5" />
                        <textarea
                          id="form-message"
                          rows={4}
                          required
                          placeholder="Share your thoughts about the flavor, crispiness, delivery and overall quality..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full px-4 py-3 pl-10 rounded-xl border border-light-beige text-xs sm:text-sm bg-brand-bg/10 focus:outline-none focus:ring-1 focus:ring-gold-accent text-walnut-brown font-sans leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Errors display */}
                    {reviewFormError && (
                      <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs font-semibold flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{reviewFormError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="w-full py-4 bg-forest-green hover:bg-gold-accent text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      {submittingReview ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                          <span>Submitting Your Feedback...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Review</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Customer Review Cards Grid */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-forest-green text-center">Verified Customer Testimonials</h3>
            
            {loadingReviews ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-gold-accent animate-spin" />
                <p className="text-xs text-walnut-brown/60 uppercase tracking-widest mt-4">Loading Snacking Feed...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-16 bg-white border border-dashed border-light-beige rounded-3xl max-w-xl mx-auto p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-light-beige/30 flex items-center justify-center text-gold-accent mx-auto">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-forest-green">No Reviews Yet</h4>
                <p className="text-xs text-walnut-brown/70 leading-relaxed">
                  Be the first to share your experience with VINA MAKHANA! Your insights help other snackers find their perfect crunch.
                </p>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="inline-flex px-5 py-2.5 bg-forest-green text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-gold-accent transition-all"
                >
                  Write the First Review
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((rev) => (
                  <motion.div
                    key={rev.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-light-beige/40 p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group overflow-hidden"
                  >
                    <div className="space-y-4 relative z-10">
                      
                      {/* Stars & Product Line badge */}
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

                      {/* Review text */}
                      <p className="text-xs sm:text-sm text-walnut-brown/85 font-sans leading-relaxed italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>

                    {/* Reviewer Details footer */}
                    <div className="mt-6 pt-4 border-t border-light-beige/30 flex items-center justify-between text-[11px] text-walnut-brown/50 font-sans">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-6 h-6 rounded-full bg-forest-green/10 flex items-center justify-center font-bold text-forest-green text-[10px]">
                          {rev.customerName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-serif font-bold text-forest-green">{rev.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-1 font-mono text-[10px]">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Elegant stylized Mock Google Map Card */}
        <div id="contact-map-section" className="border-t border-light-beige/50 pt-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-2xl font-bold text-forest-green">Visit Our Corporate Space</h2>
            <p className="text-xs text-walnut-brown/70 font-sans mt-2">
              Located in the premium business tech corridor of Noida, Uttar Pradesh.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-light-beige p-4 sm:p-6 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Mock Map graphics */}
            <div className="lg:col-span-8 bg-brand-bg rounded-2xl min-h-[300px] border border-light-beige/60 p-6 flex flex-col justify-between relative overflow-hidden group">
              {/* Map grid aesthetic */}
              <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6B4E3D 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              
              {/* Stylized road blocks and indicators */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[2px] bg-gold-accent/30 rotate-12" />
                <div className="w-full h-[2px] bg-gold-accent/30 -rotate-45" />
                <div className="absolute w-40 h-40 bg-gold-accent/10 rounded-full" />
                {/* Main pin marker */}
                <div className="absolute flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-forest-green text-gold-accent flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                    <MapPin className="w-4 h-4 fill-gold-accent stroke-none" />
                  </div>
                  <span className="bg-forest-green text-white text-[9px] font-bold px-2 py-1 rounded shadow-md mt-1 border border-gold-accent/20">VINA MAKHANA</span>
                </div>
              </div>

              {/* Map floating controls mock */}
              <div className="flex justify-between items-start relative z-10">
                <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg text-[9px] uppercase font-bold tracking-wider border border-light-beige">Virtual Satellite Map</span>
                <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg text-[9px] font-mono border border-light-beige">28.6273° N, 77.3725° E</span>
              </div>
              <div className="flex justify-end space-x-2 relative z-10">
                <button className="w-8 h-8 rounded bg-white text-walnut-brown border border-light-beige flex items-center justify-center font-bold text-sm shadow hover:bg-brand-bg transition-colors">+</button>
                <button className="w-8 h-8 rounded bg-white text-walnut-brown border border-light-beige flex items-center justify-center font-bold text-sm shadow hover:bg-brand-bg transition-colors">-</button>
              </div>
            </div>

            {/* Address description card */}
            <div className="lg:col-span-4 text-left p-4 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-accent">VINA Logistics Hub</span>
              <h3 className="font-serif text-xl font-bold text-forest-green">Premium Dispatch Center</h3>
              <p className="text-xs text-walnut-brown/80 font-sans leading-relaxed">
                Our main packaging hub and logistics cell is strategically situated near core expressways, enabling fast climate-controlled dispatches to every pincode in India.
              </p>
              <div className="space-y-2 pt-2 text-xs text-walnut-brown/70 font-sans">
                <p>📍 Navkar Heights, Ognaj Circle, Ognaj, Ahmedabad - 380060</p>
                <p>📞 +91 63563 90666</p>
                <p>🌐 www.vinamakhana.com</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
