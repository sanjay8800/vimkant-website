export type Category = 'necklaces' | 'earrings' | 'bangles' | 'rings' | 'bridal' | 'accessories';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // in INR (₹)
  description: string;
  details: string[];
  image: string;
  modelImage: string;
  modelDescription: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface InquiryItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  suggestions?: string[]; // IDs of products recommended
}
