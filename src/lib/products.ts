import { Product } from "@/types";
import rawData from "../../product_data_from_images.json";

const PRODUCT_IMAGES: Record<string, string> = {
  "NHF-NALLA-KARAM-PODI": "/WhatsApp Image 2026-04-22 at 10.16.20 AM.jpeg",
  "NHF-NUVVULA-KARAM-PODI": "/WhatsApp Image 2026-04-22 at 10.16.20 AM (1).jpeg",
  "NHF-MUNAGAKU-KARAM-PODI": "/WhatsApp Image 2026-04-22 at 10.16.20 AM (2).jpeg",
  "NHF-PUTNALA-PODI": "/WhatsApp Image 2026-04-22 at 10.16.21 AM.jpeg",
  "NHF-AVISAGINJALA-KARAM-PODI": "/WhatsApp Image 2026-04-22 at 10.16.21 AM (1).jpeg",
  "NHF-SENAGAPPU-KARAM-PODI": "/WhatsApp Image 2026-04-22 at 10.16.21 AM (2).jpeg",
  "NHF-CHICKEN-PICKLE-250G": "/WhatsApp Image 2026-04-22 at 10.16.22 AM.jpeg",
  "NHF-CHICKEN-PICKLE-1000G": "/WhatsApp Image 2026-04-22 at 10.16.22 AM (1).jpeg",
};

export const galleryImages = [
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

export const products: Product[] = (rawData.products as Product[]).map((p) => ({
  ...p,
  image_url: PRODUCT_IMAGES[p.product_id] ?? null,
}));

export const categories = [...new Set(products.map((p) => p.category))];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.product_id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return `₹${price.toFixed(0)}`;
}
