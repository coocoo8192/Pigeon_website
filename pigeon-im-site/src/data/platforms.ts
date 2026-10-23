export type PlatformId =
  | 'ios'
  | 'android'
  | 'macos'
  | 'windows'
  | 'linux'
  | 'harmonyos'

export interface PlatformInfo {
  id: PlatformId
  label: string
  shortLabel: string
  version: string
  releaseDate: string
  downloadLabel: string
  downloadUrl: string
  altDownloads?: { label: string; url: string }[]
  updateNotes?: string[]
  qrHint?: string
  beta?: boolean
}

export const platforms: PlatformInfo[] = [
  {
    id: 'ios',
    label: 'iOS',
    shortLabel: 'iOS',
    version: '9.2.1',
    releaseDate: '2026-09-20',
    downloadLabel: 'App Store 下载',
    downloadUrl: '#',
    qrHint: '扫码获取 · App Store 下载',
    updateNotes: ['消息已读状态更清晰', '群相册支持批量保存'],
  },
  {
    id: 'android',
    label: 'Android',
    shortLabel: 'Android',
    version: '9.2.1',
    releaseDate: '2026-09-20',
    downloadLabel: 'Android 版下载',
    downloadUrl: '#',
    qrHint: '扫码获取 · 应用商店下载',
    updateNotes: ['深色模式跟随系统', '语音消息支持转文字'],
  },
  {
    id: 'macos',
    label: 'macOS',
    shortLabel: 'macOS',
    version: '6.9.88',
    releaseDate: '2026-09-22',
    downloadLabel: 'macOS 版下载',
    downloadUrl: '#',
    updateNotes: ['支持 Apple Silicon 与 Intel', '截图标注工具升级'],
  },
  {
    id: 'windows',
    label: 'Windows',
    shortLabel: 'Windows',
    version: '9.9.36 (64位)',
    releaseDate: '2026-09-24',
    downloadLabel: 'Windows 64 位版下载',
    downloadUrl: '#',
    altDownloads: [
      { label: '32 位版本下载', url: '#' },
      { label: 'ARM 版本下载', url: '#' },
      { label: '往期怀旧版下载', url: '#' },
    ],
    updateNotes: [
      '快捷键自定义更全面',
      '撤回消息时间延长至 3 分钟',
      '文件传输进度条优化',
    ],
  },
  {
    id: 'linux',
    label: 'Linux',
    shortLabel: 'Linux',
    version: '3.2.34',
    releaseDate: '2026-09-24',
    downloadLabel: 'Linux 版下载',
    downloadUrl: '#',
    altDownloads: [
      { label: 'AppImage', url: '#' },
      { label: 'deb 包', url: '#' },
      { label: 'rpm 包', url: '#' },
    ],
    updateNotes: ['Wayland 会话稳定性提升', '托盘图标主题适配'],
  },
  {
    id: 'harmonyos',
    label: 'HarmonyOS',
    shortLabel: 'HarmonyOS',
    version: '2.1.0-beta',
    releaseDate: '2026-08-15',
    downloadLabel: 'HarmonyOS 版下载',
    downloadUrl: '#',
    beta: true,
    updateNotes: ['鸿蒙原子化卡片预览', '跨设备接续聊天'],
  },
]

export function detectDefaultPlatform(): PlatformId {
  const ua = navigator.userAgent.toLowerCase()
  const platform = navigator.platform?.toLowerCase() ?? ''

  if (ua.includes('harmonyos') || ua.includes('openharmony')) return 'harmonyos'
  if (ua.includes('iphone') || ua.includes('ipad')) return 'ios'
  if (ua.includes('android')) return 'android'
  if (ua.includes('mac') || platform.includes('mac')) return 'macos'
  if (ua.includes('linux')) return 'linux'
  if (ua.includes('win')) return 'windows'
  return 'windows'
}
