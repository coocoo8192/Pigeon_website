import { homeCards, homeIntro, homeNav } from '../data/homeStory'

export function HomeStory() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-8 pt-2 sm:px-8 sm:pb-10">
      <p className="mx-auto mb-4 max-w-2xl text-center text-base leading-7 text-white/90 sm:text-lg">
        {homeIntro}
      </p>

      <nav
        aria-label="Product scenes"
        className="mb-6 flex flex-wrap items-center justify-center gap-2"
      >
        {homeNav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="glass-btn rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {homeCards.map((card) => (
          <article
            key={card.id}
            id={card.id}
            className="glass scroll-mt-24 flex flex-col rounded-3xl p-4 sm:p-5"
          >
            {card.image ? (
              <div className="mx-auto mb-4 w-full max-w-[12.5rem]">
                <img
                  src={card.image.src}
                  alt={card.image.alt}
                  className="w-full rounded-[1.35rem] border border-white/12 bg-white/5 shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                />
              </div>
            ) : null}
            <div className={card.image ? 'mt-auto' : ''}>
              <h2 className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">
                {card.title}
              </h2>
              <p className="text-sm leading-6 text-white/86 sm:text-[15px] sm:leading-7">
                {card.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
