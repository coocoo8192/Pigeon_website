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
    <header className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/95 shadow-sm backdrop-blur-md">
      <nav
        ref={navRef}
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Pigeon Nest" className="h-9 w-9 rounded-md object-contain" />
          <span className="text-lg font-semibold tracking-tight text-[#1a1a2e]">
            Pigeon Nest
          </span>
        </a>

        <ul className="hidden items-center gap-1 text-sm font-medium text-[#333] md:flex">
          <li>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-[#1677ff] hover:bg-[#1677ff]/5"
            >
              首页
            </a>
          </li>
          <li className="relative">
            <button
              type="button"
              className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-black/5"
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
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-[#f5f7fa]"
                    onClick={() => {
                      onSelectPlatform?.(item.id)
                      setOpen(null)
                    }}
                  >
                    {item.label}
                    {item.beta && (
                      <span className="rounded-full bg-[#1677ff]/10 px-2 py-0.5 text-xs text-[#1677ff]">
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
              className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-black/5"
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
                    className="block px-4 py-2.5 hover:bg-[#f5f7fa]"
                  >
                    {item.label}
                  </a>
                ))}
              </DropdownPanel>
            )}
          </li>
          <li>
            <a href="#changelog" className="rounded-md px-3 py-2 hover:bg-black/5">
              版本日志
            </a>
          </li>
          <li>
            <a href="#stories" className="rounded-md px-3 py-2 hover:bg-black/5">
              Pigeon 故事
            </a>
          </li>
          <li>
            <a href="#vip" className="rounded-md px-3 py-2 hover:bg-black/5">
              会员中心
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-md p-2 text-[#333] md:hidden"
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
    <svg className="h-3.5 w-3.5 opacity-60" viewBox="0 0 12 12" fill="currentColor">
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
      className={`absolute left-0 top-full mt-1 overflow-hidden rounded-lg border border-black/8 bg-white py-1 shadow-lg ${wide ? 'min-w-[200px]' : 'min-w-[140px]'}`}
    >
      {children}
    </div>
  )
}
