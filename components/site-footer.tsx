const COLUMNS = [
  {
    title: "Categorías",
    links: ["Tecnología", "Muebles", "Moda", "Ofertas del día"],
  },
  {
    title: "Empresa",
    links: ["Acerca de RetailAR", "Blog", "Prensa", "Trabaja con nosotros"],
  },
  {
    title: "Ayuda",
    links: ["Centro de ayuda", "Envíos", "Devoluciones", "Términos y condiciones"],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-xs font-extrabold text-primary-foreground">
                AR
              </span>
              <span className="font-heading text-lg font-extrabold text-white">
                Retail<span className="text-primary">AR</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              La primera plataforma de retail con Realidad Aumentada integrada
              para una experiencia de compra inmersiva en el Perú.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 font-heading text-sm font-semibold text-white">
                {column.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-primary">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © 2026 RetailAR Perú. Todos los derechos reservados. · Precios en Soles
          (S/). · Plataforma de realidad aumentada para retail.
        </div>
      </div>
    </footer>
  )
}
