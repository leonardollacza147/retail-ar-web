"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import type { Product } from "@/lib/products"

export type CartItem = {
  product: Product
  quantity: number
}

type DrawerKind = "cart" | "favorites" | null

type StoreContextValue = {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>

  cart: CartItem[]
  favorites: string[]
  cartCount: number
  favoritesCount: number
  subtotal: number
  igv: number
  total: number
  openDrawer: DrawerKind
  setOpenDrawer: (kind: DrawerKind) => void
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  addAllFavoritesToCart: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

const IGV_RATE = 0.18

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [openDrawer, setOpenDrawer] = useState<DrawerKind>(null)

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity } : item,
      ),
    )
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  const isFavorite = (id: string) => favorites.includes(id)

  const addAllFavoritesToCart = () => {
  const favProducts = products.filter((p) =>
    favorites.includes(p.id)
  )

  favProducts.forEach((p) => addToCart(p))

  setOpenDrawer("cart")
}

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    )
    const igv = subtotal * IGV_RATE
    const total = subtotal + igv
    return {
      products,
      setProducts,
      cart,
      favorites,
      cartCount,
      favoritesCount: favorites.length,
      subtotal,
      igv,
      total,
      openDrawer,
      setOpenDrawer,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleFavorite,
      isFavorite,
      addAllFavoritesToCart,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, cart, favorites, openDrawer])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
