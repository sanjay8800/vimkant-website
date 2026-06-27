import React, { useState } from 'react';
import { X, Star, ShoppingBag, Plus, Check, MapPin, Sparkles, User, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

export default function QuickViewModal({ product, onClose, onAddToCart, isInCart }: QuickViewModalProps) {
  const [activeTab, setActiveTab] = useState<'jewelry' | 'model'>('jewelry');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" id="quick-view-modal">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content container */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-100 max-w-4xl w-full flex flex-col md:flex-row z-10 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-stone-500 hover:text-stone-800 border border-stone-100 shadow-md hover:scale-105 transition-all z-20 cursor-pointer"
          id="close-quickview-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo Frame & Interactive Tab Selectors */}
        <div className="w-full md:w-1/2 bg-stone-50/50 p-6 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-stone-100">
          
          {/* Active Image Canvas */}
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-100 shadow-inner mb-6 relative">
            <img
              src={activeTab === 'jewelry' ? product.image : product.modelImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            {/* Soft text overlay for model view */}
            {activeTab === 'model' && (
              <div className="absolute bottom-0 inset-x-0 bg-stone-950/70 p-3 text-white text-xs italic text-center font-sans font-light">
                "{product.modelDescription}"
              </div>
            )}
          </div>

          {/* Interactive Image Mode Switchers */}
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveTab('jewelry')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'jewelry'
                  ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                  : 'bg-white text-stone-600 border-stone-200/60 hover:bg-stone-50'
              }`}
            >
              <span>Jewelry Piece Only</span>
            </button>
            <button
              onClick={() => setActiveTab('model')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'model'
                  ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                  : 'bg-white text-stone-600 border-stone-200/60 hover:bg-stone-50'
              }`}
            >
              <User className="w-4 h-4 text-gold-500" />
              <span>Carried by Model</span>
            </button>
          </div>
        </div>

        {/* Right Side: Rates, specifications, stock information */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto text-left">
          <div className="space-y-4">
            {/* Category / Best Seller Badge */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-600 font-sans">
                {product.category}
              </span>
              <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded uppercase tracking-wider border border-green-200">
                In Stock & Ready
              </span>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl font-bold text-stone-900">{product.name}</h2>

            {/* Price (Rates) and ratings */}
            <div className="flex items-center justify-between py-2 border-t border-b border-stone-50">
              <div className="flex flex-col">
                <span className="text-[10px] text-stone-400 uppercase tracking-wide leading-none">Vimkant Rate</span>
                <span className="font-serif text-2xl font-bold text-stone-950 mt-1">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 justify-end text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold text-stone-800">{product.rating}</span>
                </div>
                <span className="text-[10px] text-stone-400 font-light block mt-0.5">{product.reviewsCount} verified reviews</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Design Inspiration</h4>
              <p className="text-xs text-stone-600 leading-relaxed font-light font-sans">
                {product.description}
              </p>
            </div>

            {/* Product Details (materials/sizing) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Product Specifications</h4>
              <ul className="grid grid-cols-1 gap-2">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start text-xs text-stone-600 space-x-2 font-sans font-light">
                    <span className="text-gold-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Note */}
            <div className="p-3 bg-stone-50 rounded-xl space-y-1.5 border border-stone-100">
              <div className="flex items-center space-x-2 text-stone-800">
                <MapPin className="w-4 h-4 text-gold-600" />
                <span className="text-xs font-semibold">Delhi-NCR Delivery Option</span>
              </div>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                Same-day dispatch for Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad. Delivery across India in 3-5 days.
              </p>
            </div>
          </div>

          {/* Action Call to Actions */}
          <div className="pt-6 border-t border-stone-50 mt-6 flex space-x-3">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className={`flex-1 py-4.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                isInCart
                  ? 'bg-gold-50 text-gold-700 border border-gold-200'
                  : 'bg-stone-900 text-white hover:bg-stone-800 shadow-md hover:shadow-lg'
              }`}
              id="quickview-addtocart-btn"
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Selected in Inquiry</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Select for Inquiry</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
