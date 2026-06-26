"use client"

import { useMemo, useState } from "react"
import { products, type Category } from "@/lib/products"
import { StoreProvider, useStore } from "@/components/store-provider"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { SiteFooter } from "@/components/site-footer"
import { Drawer } from "@/components/drawer"
import {
  FavoritesDrawerContent,
  FavoritesDrawerFooter,
} from "@/components/favorites-drawer"
import { CartDrawerContent, CartDrawerFooter } from "@/components/cart-drawer"

function Storefront() {
  const [activeCategory, setActiveCategory] = useState<string>("Todos")
  const { openDrawer, setOpenDrawer } = useStore()

  const filtered = useMemo(() => {
    if (activeCategory === "Todos") return products
    return products.filter((p) => p.category === (activeCategory as Category))
  }, [activeCategory])

  const scrollToCatalog = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <main className="flex-1">
        <Hero onViewCatalog={scrollToCatalog} />
        <ProductGrid
          products={filtered}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </main>

      <SiteFooter />

      <Drawer
        open={openDrawer === "favorites"}
        onClose={() => setOpenDrawer(null)}
        title="Mis favoritos"
        footer={<FavoritesDrawerFooter />}
      >
        <FavoritesDrawerContent />
      </Drawer>

      <Drawer
        open={openDrawer === "cart"}
        onClose={() => setOpenDrawer(null)}
        title="Carrito de compras"
        footer={<CartDrawerFooter />}
      >
        <CartDrawerContent />
      </Drawer>
    </div>
  )
}

export default function Page() {
  return (
    <StoreProvider>
      <Storefront />
    </StoreProvider>
  )
}
