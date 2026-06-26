"use client"

import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { formatSoles } from "@/lib/products"
import { useStore } from "@/components/store-provider"

export function CartDrawerContent() {
  const { cart, updateQuantity, removeFromCart, setOpenDrawer } = useStore()

  if (cart.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="size-10 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <p className="mt-6 text-lg font-semibold text-foreground">
          Tu carrito está vacío
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Agrega productos para comenzar tu compra
        </p>
        <button
          onClick={() => setOpenDrawer(null)}
          className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          Ver productos
        </button>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-border">
      {cart.map(({ product, quantity }) => (
        <li key={product.id} className="flex gap-4 px-6 py-4">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
              <button
                onClick={() => removeFromCart(product.id)}
                aria-label={`Eliminar ${product.name}`}
                className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <p className="mt-1 font-heading text-base font-bold text-foreground">
              {formatSoles(product.price)}
            </p>
            <div className="mt-auto flex items-center gap-3 pt-2">
              <div className="flex items-center rounded-lg border border-border">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  aria-label="Disminuir cantidad"
                  className="flex size-8 items-center justify-center text-foreground transition-colors hover:text-primary"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-medium text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  aria-label="Aumentar cantidad"
                  className="flex size-8 items-center justify-center text-foreground transition-colors hover:text-primary"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function CartDrawerFooter() {
  const { cart, subtotal, igv, total } = useStore()
  if (cart.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <dt>Subtotal</dt>
          <dd className="text-foreground">{formatSoles(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <dt>IGV (18%)</dt>
          <dd className="text-foreground">{formatSoles(igv)}</dd>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <dt>Envío</dt>
          <dd className="font-semibold text-primary">GRATIS</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-foreground">
          <dt>Total</dt>
          <dd className="font-heading">{formatSoles(total)}</dd>
        </div>
      </dl>
      <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90">
        Proceder al pago
      </button>
    </div>
  )
}
