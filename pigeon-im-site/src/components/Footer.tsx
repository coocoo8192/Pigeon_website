import { Link } from 'react-router-dom'

export function Footer({ pinned = false }: { pinned?: boolean }) {
  return (
    <footer
      className={`${pinned ? 'fixed bottom-0 left-0 right-0 z-30' : ''} px-4 py-4 text-center text-xs text-white/75`}
    >
      <div className="mb-2 flex flex-wrap items-center justify-center gap-4">
        <Link to="/privacy" className="hover:text-white hover:underline">
          Privacy Policy
        </Link>
        <span className="text-white/30">|</span>
        <Link to="/terms" className="hover:text-white hover:underline">
          Terms of Service
        </Link>
        <span className="text-white/30">|</span>
        <Link to="/about#contact" className="hover:text-white hover:underline">
          Contact
        </Link>
      </div>
      <p>C-92 HOR AL ANZ BUILDING 307 - HOR AL ANZ ST - PO Box 88878 - DUBAI - UAE</p>
      <p className="mt-0.5">
        <a href="mailto:info@pigeonnit.com" className="hover:text-white hover:underline">
          info@pigeonnit.com
        </a>
        <span className="mx-2 text-white/30">|</span>
        <a href="tel:+971586193145" className="hover:text-white hover:underline">
          +971 58 619 3145
        </a>
      </p>
      <p className="mt-1 text-white/50">© {new Date().getFullYear()} PigeonNest</p>
    </footer>
  )
}
