export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 px-4 py-3 text-center text-xs text-white/75">
      <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
        <a href="#" className="glass-btn rounded-xl px-3 py-1">隐私查询</a>
        <a href="#" className="glass-btn rounded-xl px-3 py-1">反馈问题</a>
        <a href="#" className="glass-btn rounded-xl px-3 py-1">客服中心</a>
      </div>
      <p>
        Copyright © 1998 – {year} Pigeon IM Demo. All Rights Reserved.
      </p>
      <p className="mt-0.5 text-white/50">本页面为设计参考练习作品，非腾讯官方产品</p>
    </footer>
  )
}
