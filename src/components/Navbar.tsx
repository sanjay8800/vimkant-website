import React from 'react';
import { ShoppingBag, Sparkles, Truck, Heart } from 'lucide-react';
import { InquiryItem } from '../types';

interface NavbarProps {
  cart: InquiryItem[];
  setIsCartOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ cart, setIsCartOpen, scrollToSection }: NavbarProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('hero')}
            id="brand-logo"
          >
            <div className="w-10 h-10 bg-gold-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg tracking-wider shadow-sm">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-stone-900 leading-none">VIMKANT</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-600 font-medium font-sans">Artistic Elegance</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
            <button 
              onClick={() => scrollToSection('catalog')}
              className="text-stone-600 hover:text-gold-600 transition-colors cursor-pointer"
              id="nav-catalog"
            >
              The Collection
            </button>
            <button 
              onClick={() => scrollToSection('stylist')}
              className="text-stone-600 hover:text-gold-600 transition-colors flex items-center space-x-1 font-semibold text-gold-700 cursor-pointer"
              id="nav-stylist"
            >
              <Sparkles className="w-4 h-4 text-gold-500 animate-pulse" />
              <span>AI Jewelry Stylist</span>
            </button>
            <button 
              onClick={() => scrollToSection('delivery')}
              className="text-stone-600 hover:text-gold-600 transition-colors flex items-center space-x-1 cursor-pointer"
              id="nav-delivery"
            >
              <Truck className="w-4 h-4 text-stone-500" />
              <span>Delhi-NCR Delivery</span>
            </button>
          </div>

          {/* Cart / Inquiry Trigger */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => scrollToSection('stylist')}
              className="md:hidden p-2 text-stone-600 hover:text-gold-600 transition-colors"
              title="AI Stylist"
              id="mobile-stylist-btn"
            >
              <Sparkles className="w-5 h-5 text-gold-600" />
            </button>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-stone-700 hover:text-gold-600 transition-colors rounded-full hover:bg-stone-50 flex items-center space-x-2 border border-stone-100"
              id="cart-trigger-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-stone-600">Inquiry List</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
