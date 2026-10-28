export type FeatureImage = {
  src: string
  alt: string
}

export type FeatureItem = {
  id: string
  title: string
  body: string
  image: FeatureImage
}

export const featuresIntro =
  'Encrypted chat and a digital wallet in one app. Here, privacy and payment meet — and we keep imagining what private connection can become next.'

export const features: FeatureItem[] = [
  {
    id: 'messages',
    title: 'Securely transmit messages',
    body: "Every message you send and receive is protected by end-to-end encryption. Peer-to-peer chat keeps historical records complete, private, and out of everyone else's hands.",
    image: {
      src: '/features/messages.jpg',
      alt: 'Private chat messages on a phone',
    },
  },
  {
    id: 'calls',
    title: 'Private voice and video calls',
    body: 'One-to-one and group calls stay end-to-end encrypted. Crisp audio, clean video, and low latency make every conversation feel natural and direct.',
    image: {
      src: '/features/calls.jpg',
      alt: 'Video call on a laptop screen',
    },
  },
  {
    id: 'inbox',
    title: 'All conversations in one place',
    body: 'A calm inbox that brings chats, calls, and updates together. Nothing gets lost, and the people who matter stay close — without the clutter.',
    image: {
      src: '/features/inbox.jpg',
      alt: 'Team conversation around a table',
    },
  },
  {
    id: 'controls',
    title: 'Complete chat controls',
    body: 'Pin what matters, add remarks, set messages to auto-delete, search instantly, and decide how you connect. Privacy controls are built in — not added on.',
    image: {
      src: '/features/controls.jpg',
      alt: 'Smartphone controls in soft light',
    },
  },
  {
    id: 'moments',
    title: 'Share moments, your way',
    body: 'Share photos and updates only with the people you choose. Moments is a quieter social feed — no noise, no pressure, just what you want to remember together.',
    image: {
      src: '/features/moments.jpg',
      alt: 'Capturing a quiet shared moment',
    },
  },
  {
    id: 'wallet',
    title: 'Digital wallet and transfers',
    body: 'View and manage Ethereum, Binance, Tron, TON, and Solana in one private wallet. Transfer anytime, and send coins directly to friends in the chat window.',
    image: {
      src: '/features/wallet.jpg',
      alt: 'Cryptocurrency and digital assets',
    },
  },
  {
    id: 'red-envelope',
    title: 'Red Envelope',
    body: 'Let surprises arrive anytime, anywhere. Send digital currency in a group chat to spark play, celebration, or light marketing — securely and in the moment.',
    image: {
      src: '/features/red-envelope.jpg',
      alt: 'A gift ready to send as a surprise',
    },
  },
  {
    id: 'privacy',
    title: 'Built for privacy',
    body: 'Your wallet links to your IM account. Sign up with a private key or mnemonic — no phone number or email required — and communicate privately with friends.',
    image: {
      src: '/features/privacy.jpg',
      alt: 'Digital lock representing private access',
    },
  },
  {
    id: 'ios',
    title: 'Ready for iOS 26 and iOS 27',
    body: 'Built to keep pace with the system. PigeonNest embraces the latest iOS features and interaction guidelines, so new capabilities feel native from day one.',
    image: {
      src: '/features/ios.jpg',
      alt: 'Modern smartphone ready for native apps',
    },
  },
  {
    id: 'ai',
    title: 'Private AI by your side',
    body: 'Imagine an assistant that helps you write, translate, and organize — without reading your life. On-device intelligence stays useful, personal, and sealed to you.',
    image: {
      src: '/features/ai.jpg',
      alt: 'Soft abstract artificial intelligence',
    },
  },
  {
    id: 'future',
    title: 'Built for the next internet',
    body: 'As networks, identities, and assets keep evolving, PigeonNest is shaped for a more open web — where your conversations and value move freely, yet remain yours.',
    image: {
      src: '/features/future.jpg',
      alt: 'Circuit board of a connected future',
    },
  },
  {
    id: 'smart',
    title: 'Smarter presence, same privacy',
    body: 'From context-aware reminders to ambient collaboration, future features should feel almost invisible — amplifying connection while encryption stays non-negotiable.',
    image: {
      src: '/features/smart.jpg',
      alt: 'Quiet human-and-machine collaboration',
    },
  },
]
