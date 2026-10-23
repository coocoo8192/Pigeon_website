import { PageShell } from '../components/PageShell'

const features = [
  {
    title: 'Transfer',
    body: 'Transfer anytime, anywhere with ease. A digital currency wallet lets you securely store, manage, and trade digital assets, and send coins directly to friends in the chat window.',
  },
  {
    title: 'Securely transmit messages',
    body: 'Every message you send and receive is protected by end-to-end encryption, so historical records stay complete and secure.',
  },
  {
    title: 'Built for Privacy',
    body: 'Your digital wallet is linked to your IM account. Create an account through a wallet private key or mnemonic words — no phone number or email required — and communicate privately with friends.',
  },
  {
    title: 'Red Envelope',
    body: 'Let surprises arrive anytime, anywhere. Sending digital currency in a group chat window supports marketing and group play.',
  },
]

export function FeaturesPage() {
  return (
    <PageShell title="Our Features">
      <p>
        Encrypted chat and a digital wallet in one app. Here, privacy and payment meet.
      </p>
      <ul className="space-y-5">
        {features.map((item) => (
          <li key={item.title}>
            <h2 className="mb-1 text-lg font-semibold text-white">{item.title}</h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
