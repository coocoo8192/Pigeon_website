export type PlatformId = 'ios' | 'macos' | 'apk' | 'google' | 'windows'

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
    qrHint: 'Scan to open the App Store',
    updateNotes: ['End-to-end encrypted chat', 'Wallet and messenger in one app'],
  },
  {
    id: 'macos',
    label: 'Mac',
    shortLabel: 'Mac',
    version: 'App Store',
    releaseDate: 'PigeonNest',
    downloadLabel: 'Mac Download',
    downloadUrl: 'https://apps.apple.com/app/pigeonnest-messenger/id6755805769',
    qrHint: 'Scan to open the App Store',
    updateNotes: ['Same App Store link as iOS'],
  },
  {
    id: 'apk',
    label: 'Android APK',
    shortLabel: 'APK',
    version: '1.0.28',
    releaseDate: '82_release',
    downloadLabel: 'APK Download',
    downloadUrl: 'https://s3.mechat.pro/setup/apk/pigeon1.0.28_82_release.apk',
    qrHint: 'Scan to download the Android APK',
    updateNotes: ['Install the Android package directly'],
  },
  {
    id: 'google',
    label: 'Google Play',
    shortLabel: 'Google',
    version: 'Play Store',
    releaseDate: 'Android',
    downloadLabel: 'Google Download',
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.gt.pigeon.android',
    qrHint: 'Scan to open Google Play',
    updateNotes: ['Install from Google Play'],
  },
  {
    id: 'windows',
    label: 'Windows',
    shortLabel: 'Windows',
    version: '1.0.27',
    releaseDate: 'Setup',
    downloadLabel: 'Windows Download',
    downloadUrl: 'https://s3.mechat.pro/setup/win/PigeonChat_Setup_1.0.27.exe',
    updateNotes: ['Windows desktop installer'],
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
