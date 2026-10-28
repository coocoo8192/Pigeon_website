type PageShellProps = {
  title: string
  children: React.ReactNode
  /** Wider layout for grids/cards; default is a readable prose width. */
  wide?: boolean
  /** Optional top banner image. */
  banner?: { src: string; alt: string }
}

export function PageShell({ title, children, wide = false, banner }: PageShellProps) {
  return (
    <section
      className={`relative z-10 mx-auto w-full px-5 pb-12 pt-8 text-white sm:px-8 sm:pb-16 sm:pt-10 ${
        wide ? 'max-w-6xl' : 'max-w-4xl lg:max-w-5xl'
      }`}
    >
      {banner ? (
        <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:mb-6">
          <img
            src={banner.src}
            alt={banner.alt}
            className="aspect-[32/5] max-h-24 w-full object-cover opacity-85 sm:max-h-28"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </div>
      ) : null}
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:mb-8 sm:text-4xl">{title}</h1>
      <div className="space-y-5 text-sm leading-7 text-white/85 sm:space-y-6 sm:text-base sm:leading-7">
        {children}
      </div>
    </section>
  )
}
