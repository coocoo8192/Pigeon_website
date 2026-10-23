import type { PlatformId } from '../data/platforms'

const className = 'h-6 w-6'

export function PlatformIcon({ id }: { id: PlatformId }) {
  switch (id) {
    case 'ios':
    case 'testflight':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      )
    case 'apk':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 00-8.94 0L5.65 5.67c-.19-.28-.55-.37-.84-.22-.3.16-.42.54-.26.85l1.84 3.18C2.92 11.03 1 14.22 1 17.8h22c0-3.58-1.92-6.77-5.4-8.32zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
        </svg>
      )
    case 'google':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3.18 20.82V3.18c0-.7.75-1.13 1.34-.77l16.3 8.82c.64.35.64 1.2 0 1.54l-16.3 8.82c-.59.36-1.34-.07-1.34-.77z" />
        </svg>
      )
    case 'windows':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 5.5L10.5 4.2v7.3H3V5.5zm0 13l7.5 1.3v-7.3H3v6zm9.5 1.5L21 20.5V13h-8.5v7zm0-13.8V11H21V3.5L12.5 4.7z" />
        </svg>
      )
  }
}
