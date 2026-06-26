"use client"

import { Heart, ScanLine, Search, ShoppingCart, User } from "lucide-react"
import { CATEGORIES } from "@/lib/products"
import { useStore } from "@/components/store-provider"

type Props = {
  activeCategory: string
  onSelectCategory: (category: string) => void
}

export function SiteHeader({ activeCategory, onSelectCategory }: Props) {
  const { cartCount, favoritesCount, setOpenDrawer } = useStore()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:gap-6 md:px-6">
        {/* Logo */}
        <a href="#" className="flex shrink-0 items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ScanLine className="size-5" />
          </span>
          <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
            Retail<span className="text-primary">AR</span>
          </span>
        </a>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar productos, marcas y más..."
            aria-label="Buscar productos"
            className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        {/* Actions */}
        <nav className="flex shrink-0 items-center gap-1 sm:gap-4">
          <button className="hidden flex-col items-center gap-0.5 px-2 text-foreground transition-colors hover:text-primary sm:flex">
            <User className="size-6" strokeWidth={1.5} />
            <span className="text-[11px] font-medium">Mi cuenta</span>
          </button>

          <button
            onClick={() => setOpenDrawer("favorites")}
            className="relative flex flex-col items-center gap-0.5 px-2 text-foreground transition-colors hover:text-primary"
            aria-label="Abrir favoritos"
          >
            <Heart className="size-6" strokeWidth={1.5} />
            <span className="hidden text-[11px] font-medium sm:inline">Favoritos</span>
            {favoritesCount > 0 && <Badge count={favoritesCount} />}
          </button>

          <button
            onClick={() => setOpenDrawer("cart")}
            className="relative flex flex-col items-center gap-0.5 px-2 text-foreground transition-colors hover:text-primary"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="size-6" strokeWidth={1.5} />
            <span className="hidden text-[11px] font-medium sm:inline">Carrito</span>
            {cartCount > 0 && <Badge count={cartCount} />}
          </button>
        </nav>
      </div>

      {/* Category nav */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 md:px-6">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`relative whitespace-nowrap py-3 text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-primary"
                    : "font-medium text-foreground hover:text-primary"
                }`}
              >
                {category}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 top-0 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
      {count}
    </span>
  )
}
