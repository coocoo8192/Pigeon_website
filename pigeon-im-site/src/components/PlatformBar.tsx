import type { PlatformId, PlatformInfo } from '../data/platforms'
import { PlatformIcon } from './PlatformIcons'

interface PlatformBarProps {
  platforms: PlatformInfo[]
  activeId: PlatformId
  onSelect: (id: PlatformId) => void
}

export function PlatformBar({ platforms, activeId, onSelect }: PlatformBarProps) {
  return (
    <div className="relative z-40 flex shrink-0 justify-center px-4 py-3">
      <div
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        role="tablist"
        aria-label="选择下载平台"
      >
        {platforms.map((p) => {
          const active = p.id === activeId
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`glass-btn flex min-w-[4.5rem] flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5 sm:min-w-[5.25rem] sm:px-3 ${
                active ? 'glass-btn-active' : 'text-white/80'
              }`}
              onClick={() => onSelect(p.id)}
            >
              <span className="flex h-7 w-7 items-center justify-center">
                <PlatformIcon id={p.id} />
              </span>
              <span className="text-[11px] font-medium sm:text-xs">
                {p.shortLabel}
                {p.beta && <span className="ml-0.5 text-[10px] text-white/80">β</span>}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
