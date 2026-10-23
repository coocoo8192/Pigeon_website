import type { PlatformInfo } from '../data/platforms'

interface HeroProps {
  platform: PlatformInfo
  showQr: boolean
  onToggleQr: () => void
}

const QR_PLATFORMS = new Set(['ios', 'macos', 'testflight', 'apk', 'google'])

export function Hero({ platform, showQr, onToggleQr }: HeroProps) {
  const canShowQr = QR_PLATFORMS.has(platform.id)

  return (
    <section className="relative flex min-h-full flex-col items-center justify-center px-4 pb-36 pt-20 text-center">
      <div className="animate-fade-up max-w-3xl">
        <p className="mb-3 text-sm font-medium tracking-[0.35em] text-white/70 uppercase">
          PigeonNest
        </p>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
          轻松做自己
        </h1>
        <p className="mb-10 text-lg text-white/85 sm:text-xl">
          Encrypted chat, Digital wallet, in one app
        </p>

        {canShowQr && showQr ? (
          <div className="mx-auto inline-flex flex-col items-center gap-3 rounded-2xl bg-white/95 p-6 shadow-xl">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=168x168&data=${encodeURIComponent(platform.downloadUrl)}`}
              alt=""
              width={168}
              height={168}
              className="rounded-lg"
            />
            <p className="text-sm text-[#555]">{platform.qrHint}</p>
            <a
              href={platform.downloadUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-[#1677ff] hover:underline"
            >
              直接打开下载
            </a>
            <button
              type="button"
              className="text-sm text-[#888] hover:underline"
              onClick={onToggleQr}
            >
              关闭
            </button>
          </div>
        ) : (
          <>
            <a
              href={platform.downloadUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#1a1a2e] shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
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
            <p className="mt-4 text-sm text-white/75">
              {platform.version} · {platform.releaseDate}
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
          </div>
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
