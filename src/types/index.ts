export interface Product {
  product_id: string;
  name: string;
  category: string;
  description: string;
  ingredients: string[];
  net_weight_g: number;
  mrp_inr: number | null;
  best_before: string;
  image_file_id: string;
  image_url?: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
