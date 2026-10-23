import { useEffect, useMemo, useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PlatformBar } from './components/PlatformBar'
import {
  detectDefaultPlatform,
  platforms,
  type PlatformId,
} from './data/platforms'

function App() {
  const [activeId, setActiveId] = useState<PlatformId>('windows')
  const [showQr, setShowQr] = useState(false)

  useEffect(() => {
    setActiveId(detectDefaultPlatform())
  }, [])

  const platform = useMemo(
    () => platforms.find((p) => p.id === activeId) ?? platforms[0],
    [activeId],
  )

  function selectPlatform(id: PlatformId) {
    setActiveId(id)
    setShowQr(false)
  }

  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="gradient-bg gradient-stripes absolute inset-0" aria-hidden />
      <div className="relative flex min-h-full flex-col">
        <Header onSelectPlatform={selectPlatform} />
        <main className="flex-1">
          <Hero
            platform={platform}
            showQr={showQr}
            onToggleQr={() => setShowQr((v) => !v)}
          />
        </main>
        <PlatformBar
          platforms={platforms}
          activeId={activeId}
          onSelect={selectPlatform}
        />
        <Footer />
      </div>
    </div>
  )
}

export default App
