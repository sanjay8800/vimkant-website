import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#faf9f6] py-12 md:py-20 lg:py-24 border-b border-stone-100">
      {/* Absolute Decorative Blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-50 rounded-full blur-3xl opacity-60 pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-100 rounded-full blur-3xl opacity-70 pointer-events-none -ml-40 -mb-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200/50 text-gold-800 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Affordable Luxury in Artificial Jewellery</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-stone-900 tracking-tight leading-[1.1]">
              Timeless Elegance, <br className="hidden sm:inline" />
              <span className="text-gold-600 italic">Curated for You</span>
            </h1>
            
            <p className="text-stone-600 font-sans text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Discover exquisitely crafted earrings, royal necklaces, bangles, rings, and bridal sets. Designed in New Delhi to match every celebration with premium gold finishes, Kundan, and American Diamonds.
            </p>

            {/* Quick Value Badges */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 pt-2 text-left">
              <div className="flex items-start space-x-2">
                <div className="p-1 rounded-md bg-gold-50 mt-0.5">
                  <MapPin className="w-4 h-4 text-gold-600" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider">NCR Express</h4>
                  <p className="text-[11px] text-stone-500">Delhi, Noida, Gurgaon, Ghaziabad</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <div className="p-1 rounded-md bg-gold-50 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-gold-600" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider">Premium Polish</h4>
                  <p className="text-[11px] text-stone-500">Long-lasting 22k gold plating</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
              <button
                onClick={() => scrollToSection('catalog')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer group"
                id="hero-explore-btn"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('stylist')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-gold-200 text-gold-700 font-medium text-sm hover:bg-gold-50 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                id="hero-stylist-btn"
              >
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span>Try AI Stylist</span>
              </button>
            </div>
          </div>

          {/* Hero Collage / Image Frame */}
          <div className="lg:col-span-6 flex justify-center z-10">
            <div className="relative w-full max-w-md md:max-w-lg aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <img 
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1000" 
                alt="Elegant Indian Model in Vimkant Royal Jewellery" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Glass Panel */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/40 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold-600 font-sans leading-none block mb-1">Featured Bridal Look</span>
                    <h3 className="font-serif text-lg font-bold text-stone-800">The Royal Choker Ensemble</h3>
                    <p className="text-xs text-stone-500 font-light mt-0.5">As worn by showstopper Sneha during couture launches.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-stone-400 block tracking-wider leading-none">Best Seller</span>
                    <span className="font-serif text-base font-bold text-stone-900 block mt-1">₹4,499</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
