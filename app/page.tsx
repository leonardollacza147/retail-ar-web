"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Product, type Category } from "@/lib/products";

import { StoreProvider, useStore } from "@/components/store-provider";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { Drawer } from "@/components/drawer";
import {
  FavoritesDrawerContent,
  FavoritesDrawerFooter,
} from "@/components/favorites-drawer";
import {
  CartDrawerContent,
  CartDrawerFooter,
} from "@/components/cart-drawer";
import { ChatWidget } from "@/components/chat-widget";

function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const { openDrawer, setOpenDrawer } = useStore();

  useEffect(() => {
    async function loadProducts() {
      const snapshot = await getDocs(collection(db, "productos_retail"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(data);
    }

    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "Todos") return products;

    return products.filter(
      (p) => p.category === (activeCategory as Category)
    );
  }, [products, activeCategory]);

  const scrollToCatalog = () => {
    document
      .getElementById("catalogo")
      ?.scrollIntoView({ behavior: "smooth" });
  };

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

      <ChatWidget />
    </div>
  );
}

export default function Page() {
  return (
    <StoreProvider>
      <Storefront />
    </StoreProvider>
  );
}