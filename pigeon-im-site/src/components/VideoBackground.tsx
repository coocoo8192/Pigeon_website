export function VideoBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0b1224]" aria-hidden>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-bg-poster.jpg"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45" />
    </div>
  )
}
