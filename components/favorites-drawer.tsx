"use client"

import Image from "next/image"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { formatSoles } from "@/lib/products"
import { useStore } from "@/components/store-provider"

export function FavoritesDrawerContent() {
  const {
    products,
    favorites,
    toggleFavorite,
    addToCart,
    setOpenDrawer
  } = useStore()
  const favProducts = products.filter((p) => favorites.includes(p.id))

  if (favProducts.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-brand-soft">
          <Heart className="size-10 text-primary/40" strokeWidth={1.5} />
        </div>
        <p className="mt-6 text-lg font-semibold text-foreground">
          Aún no tienes productos favoritos
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Toca el corazón en cualquier producto para guardarlo aquí
        </p>
        <button
          onClick={() => setOpenDrawer(null)}
          className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          Explorar productos
        </button>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-border">
      {favProducts.map((product) => (
        <li key={product.id} className="flex gap-4 px-6 py-4">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
            <Image
              src={
                  product.image
                    ? `/products/${product.image}`
                    : "/placeholder.svg"
                }
              alt={product.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
            <p className="mt-1 font-heading text-lg font-bold text-foreground">
              {formatSoles(product.price)}
            </p>
            <div className="mt-auto flex items-center gap-3 pt-2">
              <button
                onClick={() => addToCart(product)}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:opacity-90"
              >
                <ShoppingCart className="size-3.5" />
                Agregar
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                aria-label="Quitar de favoritos"
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Trash2 className="size-3.5" />
                Quitar
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function FavoritesDrawerFooter() {
  const { favorites, addAllFavoritesToCart } = useStore()
  if (favorites.length === 0) return null
  return (
    <button
      onClick={() => addAllFavoritesToCart()}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
    >
      <ShoppingCart className="size-4" />
      Agregar todo al carrito
    </button>
  )
}
