export type Category = "Tecnología" | "Muebles" | "Moda";

export const CATEGORIES: ("Todos" | Category)[] = [
  "Todos",
  "Tecnología",
  "Muebles",
  "Moda",
];

export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number | null;
  category: Category;
  description?: string;
  image: string;
  arImage: string;
  recomendaciones: string[];
};

export function formatSoles(value: number): string {
  return `S/ ${value.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function discountPercent(product: Product): number | null {
  if (!product.oldPrice) return null;

  return Math.round(
    (1 - product.price / product.oldPrice) * 100
  );
}