"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CartContextType, CartItem, Product } from "@/types";

const CartContext = createContext<CartContextType | null>(null);

type Action =
  | { type: "ADD"; product: Product; quantity: number }
  | { type: "REMOVE"; productId: string }
  | { type: "UPDATE"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "LOAD"; items: CartItem[] };

function cartReducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.product.product_id === action.product.product_id);
      if (existing) {
        return state.map((i) =>
          i.product.product_id === action.product.product_id
            ? { ...i, quantity: i.quantity + action.quantity }
            : i
        );
      }
      return [...state, { product: action.product, quantity: action.quantity }];
    }
    case "REMOVE":
      return state.filter((i) => i.product.product_id !== action.productId);
    case "UPDATE":
      return state.map((i) =>
        i.product.product_id === action.productId ? { ...i, quantity: action.quantity } : i
      );
    case "CLEAR":
      return [];
    case "LOAD":
      return action.items;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const saved = localStorage.getItem("nhf_cart");
    if (saved) dispatch({ type: "LOAD", items: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem("nhf_cart", JSON.stringify(items));
  }, [items]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.product.mrp_inr ?? 0) * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart: (product, quantity = 1) =>
          dispatch({ type: "ADD", product, quantity }),
        removeFromCart: (productId) => dispatch({ type: "REMOVE", productId }),
        updateQuantity: (productId, quantity) =>
          dispatch({ type: "UPDATE", productId, quantity }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
