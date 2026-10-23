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
        className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md sm:gap-6 sm:px-8"
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
              className={`group flex flex-col items-center gap-1 rounded-lg px-2 py-1 transition sm:px-3 ${
                active
                  ? 'text-[#1677ff]'
                  : 'text-[#888] hover:text-[#444]'
              }`}
              onClick={() => onSelect(p.id)}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                  active ? 'bg-[#1677ff]/10' : 'group-hover:bg-black/5'
                }`}
              >
                <PlatformIcon id={p.id} />
              </span>
              <span className="text-xs font-medium">
                {p.shortLabel}
                {p.beta && (
                  <span className="ml-0.5 text-[10px] text-[#1677ff]">β</span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
