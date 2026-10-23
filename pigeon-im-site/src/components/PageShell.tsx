export function PageShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 pb-20 pt-28 text-white">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <div className="space-y-6 text-sm leading-7 text-white/85 sm:text-base">{children}</div>
    </section>
  )
}
