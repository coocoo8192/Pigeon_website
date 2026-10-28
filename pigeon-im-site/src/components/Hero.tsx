import type { PlatformInfo } from '../data/platforms'
import { PlatformIcon } from './PlatformIcons'

interface HeroProps {
  platform: PlatformInfo
  showQr: boolean
  onToggleQr: () => void
}

const QR_PLATFORMS = new Set(['ios', 'apk', 'google'])

export function Hero({ platform, showQr, onToggleQr }: HeroProps) {
  const canShowQr = QR_PLATFORMS.has(platform.id)

  return (
    <section className="relative flex flex-col items-center px-4 pt-14 pb-3 text-center sm:pt-20 sm:pb-4">
      <div className="flex w-full flex-col items-center">
        <div className={canShowQr && showQr ? 'h-2' : 'h-8 sm:h-14'} />

        <div className="w-full max-w-3xl shrink-0">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl">
            Here, Privacy and payment meet.
          </h1>
          <p className={`text-base text-white/85 sm:text-xl ${canShowQr && showQr ? 'mb-4 sm:mb-5' : 'mb-6 sm:mb-8'}`}>
            Encrypted chat, Digital wallet, in one app
          </p>

          <a
            href={platform.downloadUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="glass-btn-strong inline-flex min-w-[15.5rem] items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold"
            onClick={(e) => {
              if (canShowQr) {
                e.preventDefault()
                onToggleQr()
              }
            }}
          >
            <span className="inline-flex items-center justify-center gap-2.5 leading-none">
              <PlatformIcon id={platform.id} className="h-[1.5em] w-[1.5em] shrink-0" />
              <span>{platform.downloadLabel}</span>
            </span>
          </a>
          <p className="mt-4 h-5 text-sm text-white/75">
            {platform.version} · {platform.releaseDate}
          </p>
        </div>

        <div
          className={`relative mt-3 w-full max-w-md shrink-0 sm:mt-4 ${
            canShowQr && showQr ? '' : 'h-[6.25rem]'
          }`}
        >
          {canShowQr && showQr ? (
            <div className="glass mx-auto flex w-max max-w-full flex-col items-center gap-2.5 rounded-2xl px-4 py-3.5">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(platform.downloadUrl)}`}
                alt=""
                width={140}
                height={140}
                className="h-28 w-28 rounded-lg bg-white p-1 sm:h-[140px] sm:w-[140px]"
              />
              <p className="text-sm text-white/85">{platform.qrHint}</p>
              <div className="flex items-center gap-2">
                <a
                  href={platform.downloadUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass-btn rounded-xl px-3 py-1.5 text-sm"
                >
                  Open download
                </a>
                <button
                  type="button"
                  className="glass-btn rounded-xl px-3 py-1.5 text-sm"
                  onClick={onToggleQr}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            platform.updateNotes &&
            platform.updateNotes.length > 0 && (
              <div id="changelog" className="w-full px-5 py-1 text-center text-sm text-white/90">
                <p className="mb-2 font-medium text-white">What's new</p>
                <ul className="space-y-1 text-white/85">
                  {platform.updateNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        <div className={canShowQr && showQr ? 'h-1' : 'h-1 sm:h-2'} />
      </div>
    </section>
  )
}

