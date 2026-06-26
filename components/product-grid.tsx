"use client"

import { CATEGORIES, type Product } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

type Props = {
  products: Product[]
  activeCategory: string
  onSelectCategory: (category: string) => void
}

export function ProductGrid({
  products,
  activeCategory,
  onSelectCategory,
}: Props) {
  return (
    <section id="catalogo" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            Todos los productos
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} productos encontrados
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">
          No se encontraron productos en esta categoría.
        </p>
      )}
    </section>
  )
}
