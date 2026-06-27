import React, { useState } from 'react';
import { Eye, Plus, Check, Star, Sparkles, User, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isInCart: boolean;
  key?: string | number;
}

export default function ProductCard({ product, onAddToCart, onQuickView, isInCart }: ProductCardProps) {
  const [showModelView, setShowModelView] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-gold-200/50 hover:shadow-xl transition-all duration-300 flex flex-col group relative"
      id={`product-card-${product.id}`}
    >
      {/* Decorative badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isBestSeller && (
          <span className="bg-gold-600 text-white text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span>Best Seller</span>
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-stone-900 text-white text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-md shadow-sm">
            New Arrival
          </span>
        )}
      </div>

      {/* Model vs Jewelry Toggle Badge */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setShowModelView(!showModelView);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/95 backdrop-blur-sm border border-stone-100 shadow-md text-stone-700 hover:text-gold-600 hover:scale-105 transition-all flex items-center space-x-1 cursor-pointer"
        title={showModelView ? "View Jewelry Product" : "View Model Carrying It"}
        id={`toggle-view-${product.id}`}
      >
        <RefreshCw className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
        <span className="text-[9px] font-bold uppercase tracking-wider pr-1">
          {showModelView ? "Jewelry" : "Model Wear"}
        </span>
      </button>

      {/* Interactive Image Frame */}
      <div 
        className="relative aspect-square w-full overflow-hidden bg-stone-50 cursor-pointer"
        onClick={() => onQuickView(product)}
        id={`product-image-container-${product.id}`}
      >
        {/* Jewelry View */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            showModelView ? 'opacity-0 scale-95' : 'opacity-100 scale-100 group-hover:scale-105'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Model View */}
        <img
          src={product.modelImage}
          alt={`Model wearing ${product.name}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            showModelView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white text-stone-900 rounded-full hover:bg-gold-50 shadow-lg hover:text-gold-600 hover:scale-110 transition-all cursor-pointer"
            title="Quick View Details"
            id={`quick-view-btn-${product.id}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category */}
          <span className="text-[10px] uppercase tracking-widest font-bold text-gold-600 font-sans block">
            {product.category}
          </span>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif text-base font-bold text-stone-900 hover:text-gold-600 transition-colors line-clamp-1 cursor-pointer"
            id={`product-title-${product.id}`}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-stone-800">{product.rating}</span>
            <span className="text-stone-300 text-xs">|</span>
            <span className="text-[11px] text-stone-400 font-light">{product.reviewsCount} verified reviews</span>
          </div>

          {/* Model Carrying Description / Normal Description */}
          {showModelView ? (
            <div className="p-2 bg-gold-50/60 rounded-xl border border-gold-100/40 mt-2">
              <p className="text-[11px] text-gold-900 italic font-sans leading-relaxed">
                "{product.modelDescription}"
              </p>
            </div>
          ) : (
            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-stone-50 flex items-center justify-between">
          {/* Price (Rate) */}
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 uppercase tracking-wide leading-none">Rate</span>
            <span className="font-serif text-lg font-bold text-stone-900 mt-1">₹{product.price.toLocaleString('en-IN')}</span>
          </div>

          {/* Add to Inquiry Button */}
          <button
            onClick={() => onAddToCart(product)}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide flex items-center space-x-1.5 transition-all cursor-pointer ${
              isInCart 
                ? 'bg-gold-50 text-gold-700 border border-gold-200' 
                : 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm hover:shadow'
            }`}
            id={`add-to-cart-${product.id}`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Selected</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Select Item</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
