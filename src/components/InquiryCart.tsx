import React, { useState } from 'react';
import { X, Trash2, MessageSquare, ShoppingBag, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { InquiryItem } from '../types';

interface InquiryCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: InquiryItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function InquiryCart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: InquiryCartProps) {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userCity, setUserCity] = useState('New Delhi');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalRate = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Generates a professional pre-filled WhatsApp message for Indian boutique order style
  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    let messageText = `Namaste Vimkant! 🌸\n\nI visited your website (vimkant.com) and would like to inquire about the availability of the following gorgeous jewellery pieces:\n\n`;

    cart.forEach((item, index) => {
      messageText += `${index + 1}. *${item.product.name}*\n   • Category: ${item.product.category.toUpperCase()}\n   • Quantity: ${item.quantity}\n   • Rate: ₹${item.product.price.toLocaleString('en-IN')} each\n\n`;
    });

    messageText += `*Total Estimated Value:* ₹${totalRate.toLocaleString('en-IN')}\n\n`;
    messageText += `*Inquirer Details:*\n• Name: ${userName}\n• Contact: ${userPhone || 'Not specified'}\n• Shipping City: ${userCity}\n\nCould you please guide me with the availability, payment options, and express shipping details? Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    // WhatsApp URL. We use a placeholder but standard mobile-friendly wa.me format
    const whatsappUrl = `https://wa.me/918800223344?text=${encodedMessage}`;
    
    // Open in new window safely
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  const handleBackToShopping = () => {
    setIsSubmitted(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="inquiry-cart-modal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-gold-600" />
              <h2 className="font-serif text-lg font-bold text-stone-900">Your Inquiry List</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-50 cursor-pointer"
              id="close-cart-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isSubmitted ? (
              /* Success screen */
              <div className="text-center py-12 space-y-4" id="inquiry-success-screen">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-50 rounded-full text-gold-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">Inquiry Generated!</h3>
                <p className="text-sm text-stone-600 leading-relaxed max-w-xs mx-auto">
                  We have prepared your WhatsApp inquiry template with all rates and product details. If WhatsApp did not open automatically, please verify your browser permissions.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleBackToShopping}
                    className="px-6 py-3 bg-stone-900 text-white rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-all cursor-pointer"
                  >
                    Back to Shopping
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              /* Empty state */
              <div className="text-center py-16 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-stone-50 rounded-full text-stone-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wider">Inquiry List is Empty</h3>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto leading-relaxed">
                    Explore Vimkant's collection of necklaces, earrings, rings, and bangles, and select pieces to build an inquiry list.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 border border-stone-200 rounded-full text-xs font-semibold uppercase tracking-wider text-stone-600 hover:bg-stone-50 transition-all cursor-pointer"
                >
                  Start Browsing
                </button>
              </div>
            ) : (
              /* Items list */
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Selected Pieces ({cart.length})</span>
                  <button 
                    onClick={onClearCart}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>

                <div className="space-y-3 divide-y divide-stone-50">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 pt-3 first:pt-0" id={`cart-item-${item.product.id}`}>
                      {/* Image Thumbnail */}
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover rounded-lg border border-stone-100 bg-stone-50"
                        referrerPolicy="no-referrer"
                      />

                      {/* Info */}
                      <div className="flex-1 space-y-1">
                        <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">{item.product.name}</h4>
                        <div className="flex justify-between items-center">
                          <span className="font-serif text-xs font-medium text-gold-700">₹{item.product.price.toLocaleString('en-IN')}</span>
                          
                          {/* Quantity control */}
                          <div className="flex items-center border border-stone-100 rounded-full bg-stone-50">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-0.5 text-stone-500 hover:text-stone-800 text-xs font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-semibold text-stone-700">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-stone-500 hover:text-stone-800 text-xs font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 text-stone-300 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Form & Actions */}
          {cart.length > 0 && !isSubmitted && (
            <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-6">
              
              {/* Total Calculation */}
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Total Value (Rates)</span>
                <span className="font-serif text-2xl font-bold text-stone-900">₹{totalRate.toLocaleString('en-IN')}</span>
              </div>

              {/* Inquiry form */}
              <form onSubmit={handleWhatsAppInquiry} className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Anjali Sharma"
                    className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500"
                    id="inquirer-name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">WhatsApp Contact Number (Optional)</label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500"
                    id="inquirer-phone"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">Delivery City *</label>
                  <select
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-gold-500"
                    id="inquirer-city"
                  >
                    <option value="New Delhi">New Delhi (NCR Express)</option>
                    <option value="Noida">Noida (NCR Express)</option>
                    <option value="Gurgaon">Gurgaon (NCR Express)</option>
                    <option value="Ghaziabad">Ghaziabad (NCR Express)</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Other India">Other Cities in India</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#25D366] text-white rounded-full font-bold text-sm hover:bg-[#20ba5a] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-4"
                  id="submit-whatsapp-inquiry-btn"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Send Inquiry on WhatsApp</span>
                </button>
              </form>

              {/* Delivery Note */}
              <p className="text-[10px] text-center text-stone-400 font-light leading-relaxed">
                📍 Free express shipping on orders above ₹1,500 within Delhi-NCR. Nationwide courier deliveries take 3-5 business days.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
