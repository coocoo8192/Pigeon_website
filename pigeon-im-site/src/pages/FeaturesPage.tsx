import { PageShell } from '../components/PageShell'
import { features, featuresIntro } from '../data/features'

export function FeaturesPage() {
  return (
    <PageShell title="Our Features" wide>
      <p className="mx-auto max-w-3xl text-center text-base leading-7 text-white/90 sm:text-lg">
        {featuresIntro}
      </p>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-12">
        {features.map((item) => (
          <article key={item.id} id={item.id} className="flex flex-col">
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img
                src={item.image.src}
                alt={item.image.alt}
                className="h-full w-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
            </div>
            <h2 className="mb-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
              {item.title}
            </h2>
            <p className="text-sm leading-6 text-white/80 sm:leading-7">{item.body}</p>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
