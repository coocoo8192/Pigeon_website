import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../data/nav'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  return (
    <header className="relative z-50 w-full px-3 pt-3 sm:px-5">
      <nav className="glass-nav mx-auto flex h-[68px] max-w-6xl items-center justify-between rounded-2xl px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img
            src="/logo.png"
            alt="PigeonNest"
            className="h-12 w-12 rounded-xl object-contain sm:h-14 sm:w-14"
          />
          <span className="text-xl font-semibold tracking-tight text-[#3a3a3a] sm:text-2xl">
            PigeonNest
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 text-[13px] xl:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavItem to={item.to} end={'end' in item ? item.end : false}>
                {item.label}
              </NavItem>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-md p-2 text-[#3a3a3a] xl:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="glass-nav absolute left-3 right-3 top-[80px] z-50 mx-auto max-w-6xl rounded-2xl p-2 sm:left-5 sm:right-5 xl:hidden">
          <ul className="flex flex-col text-sm">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavItem to={item.to} end={'end' in item ? item.end : false} block>
                  {item.label}
                </NavItem>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

function NavItem({
  to,
  end,
  block,
  children,
}: {
  to: string
  end?: boolean
  block?: boolean
  children: React.ReactNode
}) {
  const className = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${block ? 'block' : 'inline-block'} rounded-md px-2.5 py-2 ${
      isActive ? 'nav-link-active' : ''
    }`

  if (to.includes('#')) {
    return (
      <Link to={to} className={className({ isActive: false })}>
        {children}
      </Link>
    )
  }

  return (
    <NavLink to={to} end={end} className={className}>
      {children}
    </NavLink>
  )
}
