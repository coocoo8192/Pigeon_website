import { useEffect, useRef, useState } from 'react'
import { platforms, type PlatformId } from '../data/platforms'

const productItems = platforms.map((p) => ({
  id: p.id,
  label: p.label,
  beta: p.beta,
}))

const accountItems = [
  { label: '注册账号', href: '#' },
  { label: '找回密码', href: '#' },
  { label: '手机号换绑', href: '#' },
  { label: '查看好友', href: '#' },
  { label: '举报账号和骚扰', href: '#' },
]

type Dropdown = 'product' | 'account' | null

interface HeaderProps {
  onSelectPlatform?: (id: PlatformId) => void
}

export function Header({ onSelectPlatform }: HeaderProps) {
  const [open, setOpen] = useState<Dropdown>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full px-3 pt-3 sm:px-4">
      <nav
        ref={navRef}
        className="glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-4 sm:px-6"
      >
        <a href="#" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="PigeonNest" className="h-9 w-9 rounded-md object-contain" />
          <span className="text-lg font-semibold tracking-tight text-white">
            PigeonNest
          </span>
        </a>

        <ul className="hidden items-center gap-1.5 text-sm font-medium text-white/90 md:flex">
          <li>
            <a href="#" className="glass-btn glass-btn-active rounded-xl px-3 py-1.5">
              首页
            </a>
          </li>
          <li className="relative">
            <button
              type="button"
              className={`glass-btn flex items-center gap-1 rounded-xl px-3 py-1.5 ${open === 'product' ? 'glass-btn-active' : ''}`}
              aria-expanded={open === 'product'}
              onClick={() => setOpen(open === 'product' ? null : 'product')}
            >
              产品下载
              <Chevron />
            </button>
            {open === 'product' && (
              <DropdownPanel>
                {productItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-white/90 hover:bg-white/15"
                    onClick={() => {
                      onSelectPlatform?.(item.id)
                      setOpen(null)
                    }}
                  >
                    {item.label}
                    {item.beta && (
                      <span className="rounded-full border border-white/30 bg-white/15 px-2 py-0.5 text-xs text-white">
                        Beta
                      </span>
                    )}
                  </button>
                ))}
              </DropdownPanel>
            )}
          </li>
          <li className="relative">
            <button
              type="button"
              className={`glass-btn flex items-center gap-1 rounded-xl px-3 py-1.5 ${open === 'account' ? 'glass-btn-active' : ''}`}
              aria-expanded={open === 'account'}
              onClick={() => setOpen(open === 'account' ? null : 'account')}
            >
              账号服务
              <Chevron />
            </button>
            {open === 'account' && (
              <DropdownPanel wide>
                {accountItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/15"
                  >
                    {item.label}
                  </a>
                ))}
              </DropdownPanel>
            )}
          </li>
          <li>
            <a href="#changelog" className="glass-btn rounded-xl px-3 py-1.5">
              版本日志
            </a>
          </li>
          <li>
            <a href="#stories" className="glass-btn rounded-xl px-3 py-1.5">
              Pigeon 故事
            </a>
          </li>
          <li>
            <a href="#vip" className="glass-btn rounded-xl px-3 py-1.5">
              会员中心
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="glass-btn rounded-xl p-2 md:hidden"
          aria-label="菜单"
          onClick={() => setOpen(open ? null : 'product')}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  )
}

function Chevron() {
  return (
    <svg className="h-3.5 w-3.5 opacity-70" viewBox="0 0 12 12" fill="currentColor">
      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function DropdownPanel({
  children,
  wide,
}: {
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div
      className={`glass absolute left-0 top-full mt-2 rounded-2xl p-1 ${wide ? 'min-w-[200px]' : 'min-w-[160px]'}`}
    >
      {children}
    </div>
  )
}
