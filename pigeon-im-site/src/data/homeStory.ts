export type HomeImage = {
  src: string
  alt: string
}

export type HomeCard = {
  id: string
  title: string
  body: string
  image?: HomeImage
}

export const homeIntro =
  'PigeonNest is a private space for the conversations, calls, moments, and assets that matter most.'

export const homeNav = [
  { id: 'inbox', label: 'Inbox' },
  { id: 'calls', label: 'Calls' },
  { id: 'moments', label: 'Moments' },
  { id: 'wallet', label: 'Wallet' },
] as const

export const homeCards: HomeCard[] = [
  {
    id: 'inbox',
    title: 'All your conversations, all in one place',
    body: 'A calm, focused inbox that keeps you close to the people who matter. Chats, calls, and updates sit together — nothing gets lost, and everything feels effortless.',
    image: {
      src: '/screens/inbox.jpg',
      alt: 'PigeonNest inbox with chats, calls, and updates in one place',
    },
  },
  {
    id: 'calls',
    title: 'Private calls, crystal clear and secure',
    body: 'Voice calls that feel natural and direct. Every one-to-one call is end-to-end encrypted, so the conversation stays only between you and the person you are talking to.',
    image: {
      src: '/screens/voice-call.jpg',
      alt: 'A private one-to-one voice call in PigeonNest',
    },
  },
  {
    id: 'group-calls',
    title: 'Private group calls, end-to-end encrypted',
    body: 'Bring everyone together without giving up privacy. Crisp audio, clean video, and low latency make one-to-one and group calls feel like you are in the same room.',
    image: {
      src: '/screens/group-call.jpg',
      alt: 'A private group call with multiple participants',
    },
  },
  {
    id: 'features',
    title: 'Complete features for every conversation',
    body: 'Pin what matters, add remarks, set auto-delete, search instantly, and choose how you connect. Privacy controls stay built in — not bolted on later.',
    image: {
      src: '/screens/contact.jpg',
      alt: 'Contact controls including pin, remark, auto-delete, search, and block',
    },
  },
  {
    id: 'moments',
    title: 'Share moments, your way',
    body: 'Share photos and updates only with the people you choose. Moments is a quieter social feed — no noise, no pressure, just what you want to remember together.',
    image: {
      src: '/screens/moments.jpg',
      alt: 'PigeonNest Moments feed with photos and comments',
    },
  },
  {
    id: 'wallet',
    title: 'One wallet, one app, all your assets',
    body: 'Keep digital assets close at hand. View and manage Ethereum, Binance, Tron, TON, and Solana in one private wallet, right inside PigeonNest.',
    image: {
      src: '/screens/wallet.jpg',
      alt: 'In-app wallet showing Ethereum, Binance, Tron, TON, and Solana',
    },
  },
]
