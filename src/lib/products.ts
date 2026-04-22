import { Product } from "@/types";
import rawData from "../../naari_home_foods_products.json";

export const products: Product[] = rawData.products as Product[];

export const categories = [...new Set(products.map((p) => p.category))];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return `₹${price.toFixed(0)}`;
}

// All gallery images from the public folder
export const galleryImages = [
  "/WhatsApp Image 2026-04-22 at 10.16.20 AM.jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.20 AM (1).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.20 AM (2).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.21 AM.jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.21 AM (1).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.21 AM (2).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.22 AM.jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.22 AM (1).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.22 AM (2).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.22 AM (3).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.23 AM.jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.23 AM (1).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.23 AM (2).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.24 AM.jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.24 AM (1).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.24 AM (2).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.24 AM (3).jpeg",
  "/WhatsApp Image 2026-04-22 at 10.16.25 AM.jpeg",
];
