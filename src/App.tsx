import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Sparkles, AlertCircle, Eye, ShoppingBag, Grid, ListFilter, Shield, ArrowRight, Heart } from 'lucide-react';
import { products } from './data/products';
import { Product, Category, InquiryItem } from './types';

// Component imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import InquiryCart from './components/InquiryCart';
import AIStylist from './components/AIStylist';
import QuickViewModal from './components/QuickViewModal';
import Footer from './components/Footer';

export default function App() {
  // Cart state with client persistent storage
  const [cart, setCart] = useState<InquiryItem[]>(() => {
    const saved = localStorage.getItem('vimkant_inquiry_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state managers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);
  
  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-1500' | '1500-3000' | 'above-3000'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  // Persist cart adjustments in local browser cache
  useEffect(() => {
    localStorage.setItem('vimkant_inquiry_cart', JSON.stringify(cart));
  }, [cart]);

  // Handler to smoothly scroll to any section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar offset height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        // Toggle/remove if clicked again, or we can just open cart. Let's make it a toggle
        return prev.filter((item) => item.product.id !== product.id);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filter products based on search, category and pricing selectors
  const filteredProducts = products
    .filter((prod) => {
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.details.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;

      let matchesPrice = true;
      if (priceFilter === 'under-1500') {
        matchesPrice = prod.price < 1500;
      } else if (priceFilter === '1500-3000') {
        matchesPrice = prod.price >= 1500 && prod.price <= 3000;
      } else if (priceFilter === 'above-3000') {
        matchesPrice = prod.price > 3000;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.rating - a.rating; // Default 'popular' matches highest rating first
    });

  const cartProductIds = cart.map((item) => item.product.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6]">
      
      {/* Top Notification Promo Banner */}
      <div className="bg-stone-900 text-white text-[11px] uppercase tracking-[0.2em] py-2.5 px-4 text-center font-medium font-sans">
        📍 Express Same-Day Shipping across Delhi-NCR. Free nationwide courier on orders above ₹1,500.
      </div>

      {/* Navbar Component */}
      <Navbar 
        cart={cart} 
        setIsCartOpen={setIsCartOpen} 
        scrollToSection={scrollToSection} 
      />

      {/* Hero Welcome Banner */}
      <Hero scrollToSection={scrollToSection} />

      {/* Curated Product Grid Catalog */}
      <section id="catalog" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-100 mb-10 text-left">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-600 font-bold font-sans">Exclusive Masterpieces</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-900">Vimkant Premium Collection</h2>
          </div>
          <p className="text-stone-500 font-sans text-xs md:text-sm font-light max-w-md">
            Each piece is micro-plated with durable 22k gold and paired with supermodels to give you a true luxury carrying preview. Rates are inclusive of Delhi-NCR express dispatch packaging.
          </p>
        </div>

        {/* Filter Operations Console */}
        <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm mb-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search kundan, diamonds, pearls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#faf9f6] border border-stone-100 rounded-2xl text-xs font-sans focus:outline-none focus:border-gold-500 text-stone-800"
                id="catalog-search"
              />
            </div>

            {/* Category Slider filters */}
            <div className="md:col-span-8 flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-[10px] uppercase font-bold text-stone-400 font-sans shrink-0 hidden lg:inline mr-2">Categories:</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider border shrink-0 transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-gold-600 text-white border-gold-600 shadow-sm'
                    : 'bg-[#faf9f6] text-stone-600 border-stone-100/50 hover:bg-stone-50'
                }`}
                id="cat-filter-all"
              >
                All Pieces
              </button>
              {(['necklaces', 'earrings', 'bangles', 'rings', 'bridal', 'accessories'] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider border shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gold-600 text-white border-gold-600 shadow-sm'
                      : 'bg-[#faf9f6] text-stone-600 border-stone-100/50 hover:bg-stone-50'
                  }`}
                  id={`cat-filter-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Secondary Sorting and pricing filters */}
          <div className="pt-5 border-t border-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] uppercase font-bold text-stone-400 font-sans">Price Range:</span>
              
              <button
                onClick={() => setPriceFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
                  priceFilter === 'all'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-600 border-stone-100 hover:bg-stone-100'
                }`}
              >
                All Rates
              </button>
              <button
                onClick={() => setPriceFilter('under-1500')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
                  priceFilter === 'under-1500'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-600 border-stone-100 hover:bg-stone-100'
                }`}
              >
                Under ₹1,500
              </button>
              <button
                onClick={() => setPriceFilter('1500-3000')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
                  priceFilter === '1500-3000'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-600 border-stone-100 hover:bg-stone-100'
                }`}
              >
                ₹1,500 - ₹3,000
              </button>
              <button
                onClick={() => setPriceFilter('above-3000')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
                  priceFilter === 'above-3000'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-600 border-stone-100 hover:bg-stone-100'
                }`}
              >
                Above ₹3,000
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <ListFilter className="w-4 h-4 text-stone-400" />
              <span className="text-[10px] uppercase font-bold text-stone-400 font-sans shrink-0">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-stone-50 text-stone-700 border border-stone-100 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-gold-500"
                id="catalog-sort"
              >
                <option value="popular">Best Customer Ratings</option>
                <option value="price-asc">Rate: Low to High</option>
                <option value="price-desc">Rate: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty Catalog State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-100 p-8 space-y-4">
            <AlertCircle className="w-12 h-12 text-gold-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-stone-800">No matching pieces found</h3>
            <p className="text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
              We couldn't find any jewelry items matching your specific filter combo. Try modifying your search or choosing "All Pieces".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceFilter('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-stone-800 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Live Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="product-grid-container">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={handleAddToCart}
                onQuickView={setActiveQuickView}
                isInCart={cartProductIds.includes(prod.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Gemini AI Jewellery Stylist Section */}
      <AIStylist 
        onAddProductToCart={handleAddToCart}
        cartProductIds={cartProductIds}
        onQuickView={setActiveQuickView}
      />

      {/* The Vimkant Heritage values banner */}
      <section className="py-16 md:py-24 bg-white border-b border-stone-100 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-600 font-bold font-sans">Crafted with Pure Passion</span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-900 leading-tight">The Vimkant Promise</h2>
              <p className="text-stone-600 font-sans text-sm md:text-base font-light leading-relaxed">
                At Vimkant, we understand that traditional Indian jewelry is not merely a styling item—it represents status, celebration, and spiritual joy. 
                We combine the finest artisanal casting techniques of Old Delhi with modern anti-tarnish protective sealing. 
                Our rate cards are strictly transparent, giving you absolute luxury at an extremely honest and affordable bracket.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="p-1 rounded-full bg-gold-50 text-gold-600 shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-800">Hypoallergenic Nickel-Free Materials</h4>
                    <p className="text-xs text-stone-500 font-light mt-0.5">We use high-purity brass bases to eliminate any irritation, ensuring a long-lasting comfortable carry.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1 rounded-full bg-gold-50 text-gold-600 shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-800">Handpicked Quality Stones</h4>
                    <p className="text-xs text-stone-500 font-light mt-0.5">Each uncut Polki glass setting and American Diamond gem is individually hand-vetted under magnification before polishing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video border border-stone-100">
                <img 
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Vimkant Traditional Indian Jewellery Artisans" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-900/10 backdrop-brightness-95 flex items-center justify-center">
                  <div className="text-center text-white p-6 max-w-sm space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-400">Delhi-NCR Retailer</span>
                    <h3 className="font-serif text-lg font-bold">100% Secure Shopping</h3>
                    <p className="text-xs text-stone-200 font-light">Direct order support and cash on delivery available throughout Delhi, Gurgaon, and Noida.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer scrollToSection={scrollToSection} />

      {/* Sliding Side-Drawer Inquiry Cart Panel */}
      <InquiryCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Detailed Quick View Overlay Modal */}
      <QuickViewModal
        product={activeQuickView}
        onClose={() => setActiveQuickView(null)}
        onAddToCart={handleAddToCart}
        isInCart={activeQuickView ? cartProductIds.includes(activeQuickView.id) : false}
      />

    </div>
  );
}
