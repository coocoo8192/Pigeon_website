export type PlatformId = 'ios' | 'macos' | 'testflight' | 'apk' | 'google' | 'windows'

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
    version: 'App Store',
    releaseDate: 'PigeonNest',
    downloadLabel: 'iOS Download',
    downloadUrl: 'https://apps.apple.com/app/pigeonnest-messenger/id6755805769',
    qrHint: '扫码前往 App Store',
    updateNotes: ['端到端加密聊天', '钱包与即时通讯合一'],
  },
  {
    id: 'macos',
    label: 'Mac',
    shortLabel: 'Mac',
    version: 'App Store',
    releaseDate: 'PigeonNest',
    downloadLabel: 'Mac Download',
    downloadUrl: 'https://apps.apple.com/app/pigeonnest-messenger/id6755805769',
    qrHint: '扫码前往 App Store',
    updateNotes: ['与 iOS 同一 App Store 下载地址'],
  },
  {
    id: 'testflight',
    label: 'iOS / Mac (TF)',
    shortLabel: 'TF',
    version: 'TestFlight',
    releaseDate: 'Beta',
    downloadLabel: 'iOS / Mac (TF) Download',
    downloadUrl: 'https://testflight.apple.com/join/aNMhmMDn',
    qrHint: '扫码加入 TestFlight',
    beta: true,
    updateNotes: ['iOS 与 Mac 测试通道', '抢先体验新功能'],
  },
  {
    id: 'apk',
    label: 'Android APK',
    shortLabel: 'APK',
    version: '1.0.28',
    releaseDate: '82_release',
    downloadLabel: 'APK Download',
    downloadUrl: 'https://s3.mechat.pro/setup/apk/pigeon1.0.28_82_release.apk',
    qrHint: '扫码下载 Android APK',
    updateNotes: ['直接安装 Android 安装包'],
  },
  {
    id: 'google',
    label: 'Google Play',
    shortLabel: 'Google',
    version: 'Play Store',
    releaseDate: 'Android',
    downloadLabel: 'Google Download',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.gt.pigeon.android',
    qrHint: '扫码前往 Google Play',
    updateNotes: ['从 Google Play 安装'],
  },
  {
    id: 'windows',
    label: 'Windows',
    shortLabel: 'Windows',
    version: '1.0.27',
    releaseDate: 'Setup',
    downloadLabel: 'Windows Download',
    downloadUrl: 'https://s3.mechat.pro/setup/win/PigeonChat_Setup_1.0.27.exe',
    updateNotes: ['Windows 桌面安装包'],
  },
]

export function detectDefaultPlatform(): PlatformId {
  const ua = navigator.userAgent.toLowerCase()
  const platform = navigator.platform?.toLowerCase() ?? ''

  if (ua.includes('iphone') || ua.includes('ipad')) return 'ios'
  if (ua.includes('android')) return 'google'
  if (ua.includes('mac') || platform.includes('mac')) return 'macos'
  if (ua.includes('win')) return 'windows'
  return 'windows'
}
