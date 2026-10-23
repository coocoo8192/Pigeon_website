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
    <header className="fixed top-0 z-50 w-full px-3 pt-3 sm:px-4">
      <nav className="glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="PigeonNest" className="h-9 w-9 rounded-md object-contain" />
          <span className="text-lg font-semibold tracking-tight text-white">
            PigeonNest
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 text-sm font-medium text-white/90 lg:flex">
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
          className="rounded-md p-2 text-white lg:hidden"
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
        <div className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-2 lg:hidden">
          <ul className="flex flex-col text-sm font-medium text-white/90">
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
    `${block ? 'block' : 'inline-block'} rounded-md px-2.5 py-2 ${
      isActive ? 'text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
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
