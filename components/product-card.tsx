"use client"

import Image from "next/image"
import { Heart, ScanLine, ShoppingCart } from "lucide-react"
import {
  discountPercent,
  formatSoles,
  type Product,
} from "@/lib/products"
import { useStore } from "@/components/store-provider"

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const discount = discountPercent(product)
  const favorite = isFavorite(product.id)
  const installment = product.price / 12

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image ? `/products/${product.image}` : "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {discount && (
          <span className="absolute left-3 top-3 rounded bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
            -{discount}%
          </span>
        )}

        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          aria-pressed={favorite}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:text-primary"
        >
          <Heart
            className="size-5"
            strokeWidth={1.75}
            fill={favorite ? "currentColor" : "none"}
            color={favorite ? "var(--primary)" : "currentColor"}
          />
        </button>

        <span className="absolute bottom-3 left-3 rounded bg-background/90 px-2 py-1 text-xs font-medium text-foreground">
          {product.category}
        </span>
      </div>

      {/* AR target */}
      <div className="flex items-center gap-3 border-l-4 border-primary bg-brand-soft px-3 py-3">
        <div className="relative size-36 shrink-0 overflow-hidden rounded-md border border-border bg-background">
          <Image
            src={product.arImage ? `/products/${product.arImage}` : "/placeholder.svg"}
            alt={`Imagen AR de ${product.name}`}
            fill
            sizes="144px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-bold text-primary">
            <ScanLine className="size-4 animate-pulse" />
            ¡Escanéalo en 3D!
          </p>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            Abre la <span className="font-semibold text-primary">App RetailAR</span> y
            apunta la cámara a esta imagen para verlo en tu espacio.
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-medium text-foreground">{product.name}</h3>

        <div className="mt-2 flex items-end gap-2">
          <span className="font-heading text-2xl font-bold text-foreground">
            {formatSoles(product.price)}
          </span>
          {product.oldPrice && (
            <span className="pb-1 text-sm text-muted-foreground line-through">
              {formatSoles(product.oldPrice)}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          12 cuotas de {formatSoles(installment)} sin intereses
        </p>

        <button
          onClick={() => {
            const confirmar = window.confirm(
              `¿Estás seguro de que deseas agregar "${product.name}" al carrito?`
            )

            if (confirmar) {
              addToCart(product)
            }
          }}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          <ShoppingCart className="size-4" />
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}
