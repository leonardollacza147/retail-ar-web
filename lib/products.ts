export type Category = "Tecnología" | "Muebles" | "Moda"

export type Product = {
  id: string
  name: string
  price: number
  oldPrice?: number
  category: Category
  image: string
  arImage: string
}

export const CATEGORIES: ("Todos" | Category)[] = [
  "Todos",
  "Tecnología",
  "Muebles",
  "Moda",
]

export const products: Product[] = [
  {
    id: "zapatilla-urban-runner-pro",
    name: "Zapatilla Urban Runner Pro",
    price: 259.9,
    oldPrice: 369.9,
    category: "Moda",
    image: "/products/zapatilla.png",
    arImage: "/products/zapatilla.png",
  },
  {
    id: "sofa-escandinavo-3-cuerpos",
    name: "Sofá Escandinavo 3 Cuerpos",
    price: 1899.0,
    category: "Muebles",
    image: "/products/sofa.png",
    arImage: "/products/sofa.png",
  },
  {
    id: "smart-tv-55-4k",
    name: 'Smart TV 55" 4K Ultra HD',
    price: 1599.0,
    oldPrice: 1999.0,
    category: "Tecnología",
    image: "/products/tv.png",
    arImage: "/products/tv.png",
  },
  {
    id: "mesa-comedor-roble",
    name: "Mesa de Comedor Roble Natural",
    price: 849.0,
    oldPrice: 999.0,
    category: "Muebles",
    image: "/products/mesa.png",
    arImage: "/products/mesa.png",
  },
  {
    id: "auriculares-pro-wireless",
    name: "Auriculares Pro Wireless Studio",
    price: 449.0,
    category: "Tecnología",
    image: "/products/auriculares.png",
    arImage: "/products/auriculares.png",
  },
  {
    id: "casaca-urban-style",
    name: "Casaca Urban Style Oversize",
    price: 219.9,
    oldPrice: 289.9,
    category: "Moda",
    image: "/products/casaca.png",
    arImage: "/products/casaca.png",
  },
  {
    id: "laptop-ultrabook-pro",
    name: 'Laptop UltraBook Pro 14" i7',
    price: 3499.0,
    category: "Tecnología",
    image: "/products/laptop.png",
    arImage: "/products/laptop.png",
  },
  {
    id: "silla-ergonomica-premium",
    name: "Silla Ergonómica Premium Office",
    price: 749.0,
    category: "Muebles",
    image: "/products/silla.png",
    arImage: "/products/silla.png",
  },
]

export function formatSoles(value: number): string {
  return `S/ ${value.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function discountPercent(product: Product): number | null {
  if (!product.oldPrice) return null
  return Math.round((1 - product.price / product.oldPrice) * 100)
}
