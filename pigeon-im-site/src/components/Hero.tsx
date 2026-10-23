import type { PlatformInfo } from '../data/platforms'

interface HeroProps {
  platform: PlatformInfo
  showQr: boolean
  onToggleQr: () => void
}

export function Hero({ platform, showQr, onToggleQr }: HeroProps) {
  const isMobile = platform.id === 'ios' || platform.id === 'android'

  return (
    <section className="relative flex min-h-full flex-col items-center justify-center px-4 pb-36 pt-20 text-center">
      <div className="animate-fade-up max-w-3xl">
        <p className="mb-3 text-sm font-medium tracking-[0.35em] text-white/70 uppercase">
          Pigeon 即时通讯
        </p>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
          轻松做自己
        </h1>
        <p className="mb-10 text-lg text-white/85 sm:text-xl">
          连接你我，记录生活里的每一个瞬间
        </p>

        {isMobile && showQr ? (
          <div className="mx-auto inline-flex flex-col items-center gap-3 rounded-2xl bg-white/95 p-6 shadow-xl">
            <QrPlaceholder />
            <p className="text-sm text-[#555]">{platform.qrHint}</p>
            <button
              type="button"
              className="text-sm text-[#1677ff] hover:underline"
              onClick={onToggleQr}
            >
              关闭
            </button>
          </div>
        ) : (
          <>
            <a
              href={platform.downloadUrl}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#1a1a2e] shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
              onClick={(e) => {
                if (isMobile) {
                  e.preventDefault()
                  onToggleQr()
                }
              }}
            >
              <DownloadIcon />
              {platform.downloadLabel}
            </a>
            <p className="mt-4 text-sm text-white/75">
              v {platform.version} · {platform.releaseDate}
            </p>
          </>
        )}

        {platform.updateNotes && platform.updateNotes.length > 0 && !showQr && (
          <div
            id="changelog"
            className="mx-auto mt-10 max-w-md rounded-xl bg-black/20 px-5 py-4 text-left text-sm text-white/90 backdrop-blur-sm"
          >
            <p className="mb-2 font-medium text-white">本次更新</p>
            <ul className="list-inside list-disc space-y-1 text-white/85">
              {platform.updateNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <a href="#" className="mt-2 inline-block text-[#a8d4ff] hover:underline">
              更多日志 &gt;
            </a>
          </div>
        )}

        {platform.altDownloads && platform.altDownloads.length > 0 && !showQr && (
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/80">
            {platform.altDownloads.map((alt, i) => (
              <span key={alt.label} className="inline-flex items-center">
                {i > 0 && <span className="mr-3 text-white/40">|</span>}
                <a href={alt.url} className="hover:text-white hover:underline">
                  {alt.label}
                </a>
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  )
}

function DownloadIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function QrPlaceholder() {
  const cells = 11
  const pattern = [
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  ]
  return (
    <div
      className="grid gap-0.5 rounded-lg border border-[#eee] bg-white p-3"
      style={{ gridTemplateColumns: `repeat(${cells}, 1fr)` }}
      aria-hidden
    >
      {pattern.flat().map((on, i) => (
        <div
          key={i}
          className={`h-2.5 w-2.5 rounded-sm ${on ? 'bg-[#1a1a2e]' : 'bg-transparent'}`}
        />
      ))}
    </div>
  )
}
