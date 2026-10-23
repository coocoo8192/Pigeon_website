import { useEffect, useState } from 'react'

export type NavContrast = 'on-light' | 'on-dark'

const GLASS_WHITE = 0.22
const TOP_DIM = 0.35

export function useNavContrast(): NavContrast {
  const [mode, setMode] = useState<NavContrast>('on-light')

  useEffect(() => {
    const videoEl = document.getElementById('hero-bg-video')
    if (!(videoEl instanceof HTMLVideoElement)) return
    const video = videoEl

    const canvas = document.createElement('canvas')
    canvas.width = 48
    canvas.height = 8
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return
    const ctx = context

    let raf = 0
    let last = 0
    let current: NavContrast = 'on-light'

    function sample(now: number) {
      raf = requestAnimationFrame(sample)
      if (now - last < 220) return
      last = now
      if (video.readyState < 2) return

      try {
        const slice = video.videoHeight * 0.14
        ctx.drawImage(
          video,
          0,
          0,
          video.videoWidth,
          slice,
          0,
          0,
          canvas.width,
          canvas.height,
        )
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
        let total = 0
        const count = pixels.length / 4
        for (let i = 0; i < pixels.length; i += 4) {
          total += 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2]
        }
        const videoLuma = total / count
        const afterDim = videoLuma * (1 - TOP_DIM)
        const perceived = afterDim * (1 - GLASS_WHITE) + 255 * GLASS_WHITE

        let next = current
        if (current === 'on-light' && perceived < 98) next = 'on-dark'
        if (current === 'on-dark' && perceived > 148) next = 'on-light'
        if (next !== current) {
          current = next
          setMode(next)
        }
      } catch {
        /* tainted canvas — keep last solid color */
      }
    }

    raf = requestAnimationFrame(sample)
    return () => cancelAnimationFrame(raf)
  }, [])

  return mode
}
