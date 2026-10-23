import { useEffect, useMemo, useState } from 'react'
import { Hero } from '../components/Hero'
import { PlatformBar } from '../components/PlatformBar'
import {
  detectDefaultPlatform,
  platforms,
  type PlatformId,
} from '../data/platforms'

export function HomePage() {
  const [activeId, setActiveId] = useState<PlatformId>('windows')
  const [showQr, setShowQr] = useState(false)

  useEffect(() => {
    setActiveId(detectDefaultPlatform())
  }, [])

  const platform = useMemo(
    () => platforms.find((p) => p.id === activeId) ?? platforms[0],
    [activeId],
  )

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Hero
        platform={platform}
        showQr={showQr}
        onToggleQr={() => setShowQr((v) => !v)}
      />
      <PlatformBar
        platforms={platforms}
        activeId={activeId}
        onSelect={(id) => {
          setActiveId(id)
          setShowQr(false)
        }}
      />
    </div>
  )
}
