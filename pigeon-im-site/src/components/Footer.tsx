export function Footer() {
  return (
    <footer className="relative z-30 shrink-0 px-4 pb-12 pt-8 text-center text-[11px] leading-relaxed text-white/45 sm:pb-14 sm:pt-10 sm:text-xs">
      <div className="mx-auto max-w-3xl space-y-2 text-white/45">
        <p>Pigeon Nest Information Technology LLC SOC</p>
        <p>
          C-92 HOR AL ANZ BUILDING 307 - HOR AL ANZ ST - PO Box 88878 - DUBAI - UNITED ARAB
          EMIRATES
        </p>
        <p className="pt-1">
          <a href="mailto:info@pigeonnit.com" className="hover:underline">
            info@pigeonnit.com
          </a>
          <span className="mx-2">·</span>
          <span>© {new Date().getFullYear()} PigeonNest</span>
        </p>
      </div>
    </footer>
  )
}
