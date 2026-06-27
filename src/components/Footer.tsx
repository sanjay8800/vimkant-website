import React from 'react';
import { Mail, Phone, MapPin, Truck, Award, ShieldCheck, Instagram } from 'lucide-react';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer id="delivery" className="bg-stone-900 text-stone-300 pt-16 pb-12 font-sans border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Guarantees Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-stone-800 text-left">
          
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-stone-800 text-gold-400 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Delhi-NCR Express Delivery</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                We deliver throughout Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad. Express hand-delivered shipping is available.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-stone-800 text-gold-400 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Authentic Plating Guarantee</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                All artificial sets feature long-lasting premium micro-polishing, high-grade base copper, and skin-friendly hypoallergenic metals.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-stone-800 text-gold-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Transit Insurance Covered</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Every shipment is safely wrapped in dual-box structural bubble packages. Any damage in transit is fully compensated.
              </p>
            </div>
          </div>

        </div>

        {/* Brand Information & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-12 text-left">
          
          {/* Brand Intro Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gold-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-base">
                V
              </div>
              <span className="font-serif text-xl font-bold tracking-widest text-white leading-none">VIMKANT</span>
            </div>
            
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Vimkant is India's premium online destination for stylish and affordable artificial jewellery. 
              Our mission is to bring exquisite design, traditional heritage polishing, and current fashion accessories directly to your home with transparent rates and premium service.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-stone-800 hover:bg-gold-600 hover:text-white rounded-full text-stone-400 transition-all"
                title="Follow Vimkant on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catalog & Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Our Collections</h4>
            <ul className="space-y-2 text-xs font-light text-stone-400">
              <li>
                <button onClick={() => scrollToSection('catalog')} className="hover:text-gold-500 transition-colors cursor-pointer">
                  Kundan & Polki Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('catalog')} className="hover:text-gold-500 transition-colors cursor-pointer">
                  Peacock Jhumka Earrings
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('catalog')} className="hover:text-gold-500 transition-colors cursor-pointer">
                  Antique Temple Kadas
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('catalog')} className="hover:text-gold-500 transition-colors cursor-pointer">
                  American Diamond Solitaires
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-sans">Contact Studio</h4>
            <ul className="space-y-3 text-xs font-light text-stone-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Vimkant Studio, Connaught Place, New Delhi, 110001, India</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 88002 23344 (Sales Inquiry)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>support@vimkant.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer / Credits */}
        <div className="pt-8 border-t border-stone-800 text-center text-[10px] text-stone-500 font-light flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Vimkant Jewellery. All Rights Reserved. Crafted with love in New Delhi, India.</p>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:text-stone-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-stone-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="https://github.com/sanjay8800/vimkant-website.git" target="_blank" rel="noreferrer" className="hover:text-stone-400 transition-colors">GitHub Repository</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
