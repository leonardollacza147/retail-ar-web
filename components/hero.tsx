"use client"

import { Smartphone } from "lucide-react"

export function Hero({ onViewCatalog }: { onViewCatalog: () => void }) {
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(120% 120% at 100% 50%, oklch(0.45 0.18 25) 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
              Nuevo
            </span>
            <span className="text-sm text-white/70">
              Tecnología de Realidad Aumentada
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-[1.05] text-balance text-white md:text-6xl">
            Visualiza el producto en tu{" "}
            <span className="text-primary">espacio real</span> antes de comprarlo
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
            Escanea el código AR en cada tarjeta con la App RetailAR y visualiza
            el producto en 3D.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90">
              <Smartphone className="size-5" />
              Descargar App RetailAR
            </button>
            <button
              onClick={onViewCatalog}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/20"
            >
              Ver catálogo
            </button>
          </div>


        </div>
      </div>
    </section>
  )
}
