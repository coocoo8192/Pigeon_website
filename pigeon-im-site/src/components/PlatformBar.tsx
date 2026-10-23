import type { PlatformId, PlatformInfo } from '../data/platforms'
import { PlatformIcon } from './PlatformIcons'

interface PlatformBarProps {
  platforms: PlatformInfo[]
  activeId: PlatformId
  onSelect: (id: PlatformId) => void
}

export function PlatformBar({ platforms, activeId, onSelect }: PlatformBarProps) {
  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center px-4">
      <div
        className="glass flex flex-wrap items-center justify-center gap-2 rounded-2xl px-3 py-2.5 sm:gap-3 sm:px-4"
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
              className={`glass-btn flex flex-col items-center gap-1 rounded-xl px-2.5 py-1.5 sm:px-3 ${
                active ? 'glass-btn-active' : 'text-white/80'
              }`}
              onClick={() => onSelect(p.id)}
            >
              <span className="flex h-8 w-8 items-center justify-center">
                <PlatformIcon id={p.id} />
              </span>
              <span className="text-xs font-medium">
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
