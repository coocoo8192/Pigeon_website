import type { PlatformInfo } from '../data/platforms'

interface HeroProps {
  platform: PlatformInfo
  showQr: boolean
  onToggleQr: () => void
}

const QR_PLATFORMS = new Set(['ios', 'macos', 'apk', 'google'])

export function Hero({ platform, showQr, onToggleQr }: HeroProps) {
  const canShowQr = QR_PLATFORMS.has(platform.id)

  return (
    <section className="relative flex min-h-0 flex-1 flex-col items-center px-4 py-4 text-center sm:py-6">
      <div className="flex min-h-0 w-full flex-1 flex-col items-center">
        <div className="min-h-0 flex-1" />

        <div className="w-full max-w-3xl shrink-0">
          <p className="mb-2 text-xs font-medium tracking-[0.35em] text-white/70 uppercase sm:mb-3 sm:text-sm">
            PigeonNest
          </p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
            轻松做自己
          </h1>
          <p className="mb-6 text-base text-white/85 sm:mb-8 sm:text-xl">
            Encrypted chat, Digital wallet, in one app
          </p>

          <a
            href={platform.downloadUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="glass-btn-strong inline-flex min-w-[15.5rem] items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold"
            onClick={(e) => {
              if (canShowQr) {
                e.preventDefault()
                onToggleQr()
              }
            }}
          >
            <DownloadIcon />
            {platform.downloadLabel}
          </a>
          <p className="mt-4 h-5 text-sm text-white/75">
            {platform.version} · {platform.releaseDate}
          </p>
        </div>

        <div className="relative mt-6 h-[7.5rem] w-full max-w-md shrink-0">
          {canShowQr && showQr ? (
            <div className="glass absolute left-1/2 top-0 z-10 inline-flex -translate-x-1/2 flex-col items-center gap-3 rounded-2xl p-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=168x168&data=${encodeURIComponent(platform.downloadUrl)}`}
                alt=""
                width={168}
                height={168}
                className="rounded-lg bg-white p-1"
              />
              <p className="text-sm text-white/85">{platform.qrHint}</p>
              <a
                href={platform.downloadUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="glass-btn rounded-xl px-3 py-1.5 text-sm"
              >
                直接打开下载
              </a>
              <button
                type="button"
                className="glass-btn rounded-xl px-3 py-1.5 text-sm"
                onClick={onToggleQr}
              >
                关闭
              </button>
            </div>
          ) : (
            platform.updateNotes &&
            platform.updateNotes.length > 0 && (
              <div id="changelog" className="w-full px-5 py-1 text-left text-sm text-white/90">
                <p className="mb-2 font-medium text-white">本次更新</p>
                <ul className="list-inside list-disc space-y-1 text-white/85">
                  {platform.updateNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        <div className="min-h-0 flex-1" />
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
