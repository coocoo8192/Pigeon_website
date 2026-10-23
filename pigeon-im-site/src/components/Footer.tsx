import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="relative z-30 shrink-0 px-4 pb-4 pt-2 text-center text-[11px] leading-relaxed text-white/45 sm:text-xs">
      <div className="mb-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <Link to="/privacy" className="hover:text-white/70 hover:underline">
          Privacy Policy
        </Link>
        <span className="text-white/25">|</span>
        <Link to="/terms" className="hover:text-white/70 hover:underline">
          Terms of Service
        </Link>
        <span className="text-white/25">|</span>
        <Link to="/about#contact" className="hover:text-white/70 hover:underline">
          Contact
        </Link>
      </div>
      <p>
        <a href="mailto:info@pigeonnit.com" className="hover:text-white/70 hover:underline">
          info@pigeonnit.com
        </a>
        <span className="mx-2 text-white/25">|</span>
        <a href="tel:+971586193145" className="hover:text-white/70 hover:underline">
          +971 58 619 3145
        </a>
        <span className="mx-2 text-white/25">|</span>
        <span>© {new Date().getFullYear()} PigeonNest</span>
      </p>
    </footer>
  )
}
