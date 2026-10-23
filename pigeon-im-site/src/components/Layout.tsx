import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { VideoBackground } from './VideoBackground'

export function Layout() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className={`relative min-h-svh ${isHome ? 'h-svh overflow-hidden' : ''}`}>
      <VideoBackground />
      <div className="relative flex min-h-full flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer pinned={isHome} />
      </div>
    </div>
  )
}
