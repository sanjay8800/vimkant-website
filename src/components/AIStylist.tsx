import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Plus, Check, Loader, User, HelpCircle, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';

interface AIStylistProps {
  onAddProductToCart: (product: Product) => void;
  cartProductIds: string[];
  onQuickView: (product: Product) => void;
}

export default function AIStylist({ onAddProductToCart, cartProductIds, onQuickView }: AIStylistProps) {
  // Input states
  const [occasion, setOccasion] = useState('Festive / Sangeet');
  const [outfitStyle, setOutfitStyle] = useState('Saree');
  const [outfitColor, setOutfitColor] = useState('Crimson Red');
  const [preferences, setPreferences] = useState('Classic gold finishing with rich pearl droplets');
  
  // App states
  const [loading, setLoading] = useState(false);
  const [stylistResponse, setStylistResponse] = useState<{
    stylistAdvice: string;
    recommendedProductIds: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Suggested tags to populate inputs quickly
  const occasionsList = ['Wedding Bride', 'Wedding Guest', 'Festive / Sangeet', 'Cocktail Party', 'Casual Get-Together'];
  const stylesList = ['Lehenga Choli', 'Saree', 'Anarkali Suit', 'Indo-Western Gown', 'Contemporary Kurti'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStylistResponse(null);

    try {
      const response = await fetch('/api/stylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          occasion,
          outfitStyle,
          outfitColor,
          preferences,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate recommendations.');
      }

      const data = await response.json();
      setStylistResponse(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'The stylist is currently busy coordinating sets. Please try again shortly!');
    } finally {
      setLoading(false);
    }
  };

  // Map recommended product IDs to real products
  const recommendedProducts = stylistResponse
    ? products.filter(p => stylistResponse.recommendedProductIds.includes(p.id))
    : [];

  return (
    <section id="stylist" className="py-16 md:py-24 bg-gradient-to-b from-stone-50 to-[#faf9f6] border-t border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200/50 text-gold-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
            <span>Introducing Vimkant AI Stylist</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-none">
            Find Your Match <br />
            <span className="text-gold-600 italic">With Artificial Intelligence</span>
          </h2>
          <p className="text-stone-600 font-sans text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Unsure which Kundan necklace fits a deep sweetheart neckline, or whether to pair Polki Chandbalis with a heavy dupatta? Tell our AI Jewellery Assistant about your outfit and receive instant styling guidance!
          </p>
        </div>

        {/* Dual Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left panel: Styling form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-stone-100">
              <div className="p-2 rounded-xl bg-gold-50 text-gold-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-950">Attire Consultation</h3>
                <p className="text-[11px] text-stone-500 uppercase tracking-wider">Custom fitting analysis</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Occasion */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Occasion</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {occasionsList.map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setOccasion(occ)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        occasion === occ
                          ? 'bg-stone-900 text-white border-stone-900 shadow'
                          : 'bg-stone-50 text-stone-600 border-stone-200/60 hover:bg-stone-100'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outfit Style */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Outfit Style</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {stylesList.map((sty) => (
                    <button
                      key={sty}
                      type="button"
                      onClick={() => setOutfitStyle(sty)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        outfitStyle === sty
                          ? 'bg-stone-900 text-white border-stone-900 shadow'
                          : 'bg-stone-50 text-stone-600 border-stone-200/60 hover:bg-stone-100'
                      }`}
                    >
                      {sty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outfit Color */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Outfit Color & Hue</label>
                <input
                  type="text"
                  value={outfitColor}
                  onChange={(e) => setOutfitColor(e.target.value)}
                  placeholder="e.g. Royal Blue with golden embroidery, Mint green, etc."
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              {/* Custom Preferences */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Specific Jewellery Preferences</label>
                <textarea
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="e.g. I prefer heavy Statement Necklaces / I am looking for emerald bead highlights / Only minimalist rose gold studs."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold-600 hover:bg-gold-700 text-white font-bold rounded-full text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer pt-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                id="generate-stylist-advice-btn"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Curating jewelry pieces...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span>Generate Styling Recommendations</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right panel: Stylist recommendations output */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-xl min-h-[500px] flex flex-col justify-center">
            {loading ? (
              /* Shimmering Loading State */
              <div className="text-center py-16 space-y-6" id="stylist-loading-panel">
                <div className="relative inline-flex">
                  <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center text-gold-600 border border-gold-200 animate-pulse">
                    <Sparkles className="w-8 h-8 animate-spin-slow" />
                  </div>
                  <div className="absolute top-0 right-0 w-4 h-4 bg-gold-400 rounded-full animate-ping"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-stone-800 animate-pulse">Drafting Your Styling Portfolio</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto font-light leading-relaxed">
                    Analyzing dress drape patterns, necklines, wedding colors, and evaluating optimal Jhumkas, necklaces, and bangles from our Delhi studio...
                  </p>
                </div>
              </div>
            ) : error ? (
              /* Error State */
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Stylist is Temporarily Occupied</h3>
                <p className="text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
                  {error}
                </p>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            ) : stylistResponse ? (
              /* Success Output State */
              <div className="space-y-6 text-left" id="stylist-result-panel">
                <div className="flex items-center space-x-2 text-gold-700">
                  <Sparkles className="w-5 h-5 text-gold-500" />
                  <span className="text-xs font-bold uppercase tracking-wider font-sans">Vimkant Stylist Advice</span>
                </div>

                {/* Advice Markdown Container */}
                <div className="p-5 bg-[#faf9f6] rounded-2xl border border-stone-100 space-y-4">
                  <div className="prose prose-stone max-w-none text-stone-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {stylistResponse.stylistAdvice}
                  </div>
                </div>

                {/* Product recommendations display */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Recommended Pieces for You</h4>
                  
                  {recommendedProducts.length === 0 ? (
                    <p className="text-xs text-stone-400 font-light italic">No direct matches in standard catalog, but our team can curate custom orders via WhatsApp!</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recommendedProducts.map((prod) => {
                        const isAdded = cartProductIds.includes(prod.id);
                        return (
                          <div 
                            key={prod.id} 
                            className="p-4 rounded-xl border border-stone-100 hover:border-gold-100 bg-white shadow-sm flex items-center space-x-3 hover:shadow transition-all group"
                          >
                            <img 
                              src={prod.image} 
                              alt={prod.name} 
                              className="w-16 h-16 object-cover rounded-lg bg-stone-50 border border-stone-50"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 
                                onClick={() => onQuickView(prod)}
                                className="font-serif text-sm font-bold text-stone-900 truncate hover:text-gold-600 transition-colors cursor-pointer"
                              >
                                {prod.name}
                              </h5>
                              <p className="font-serif text-xs font-medium text-gold-700 mt-0.5">₹{prod.price.toLocaleString('en-IN')}</p>
                              
                              <button
                                onClick={() => onAddProductToCart(prod)}
                                className={`text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 mt-2 transition-colors ${
                                  isAdded ? 'text-gold-600' : 'text-stone-700 hover:text-gold-600'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Selected</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3 h-3" />
                                    <span>Add to Inquiry</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Empty / Initial State */
              <div className="text-center py-16 space-y-6" id="stylist-initial-panel">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-50 rounded-full text-gold-500 border border-stone-100 shadow-sm">
                  <User className="w-6 h-6 text-gold-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-stone-800">Your Styling Portfolio Awaits</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto font-light leading-relaxed">
                    Select your dress silhouette, shade, and event on the left form. Vimkant's AI stylist will analyze them and suggest the perfect combinations instantly.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
