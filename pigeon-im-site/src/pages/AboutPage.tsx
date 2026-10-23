import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

export function AboutPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash === '#contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])

  return (
    <PageShell title="About Us">
      <h2 className="text-xl font-semibold text-white">Our Mission</h2>
      <p>
        At PigeonNest, we are committed to revolutionizing digital communication by empowering
        individuals with sovereign control over their privacy. In an era where personal data is
        often exploited, we leverage cutting-edge blockchain technology to create an ecosystem
        where every message, call, and shared file remains exclusively accessible to its intended
        recipients. Our mission is to eliminate the trade-offs between connectivity and
        confidentiality, ensuring that users no longer fear surveillance, unauthorized data
        harvesting, or third-party intrusion. By integrating end-to-end encryption, decentralized
        architecture, and user-centric design, we transform privacy from a privilege into a
        fundamental right.
      </p>

      <h2 className="text-xl font-semibold text-white">Our Purpose</h2>
      <p>
        PigeonNest exists to dismantle the paradigm of centralized data dominance. Traditional
        platforms treat users as products, monetizing their information while leaving them
        vulnerable to breaches and misuse. We challenge this by building a future where privacy
        and freedom coexist seamlessly. Our purpose is threefold:
      </p>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          <strong className="text-white">Guardian of Trust:</strong> not even PigeonNest can
          access user data, thanks to blockchain-based encryption and tools like self-destructing
          messages and screenshot alerts.
        </li>
        <li>
          <strong className="text-white">Bridge to Web3:</strong> we serve as a gateway for
          everyday users to experience decentralized technologies intuitively — through secure
          messaging, asset management, and AI-driven interactions.
        </li>
        <li>
          <strong className="text-white">Global Inclusivity:</strong> registered in Dubai, we
          prioritize cross-border accessibility and solutions that transcend geopolitical barriers.
        </li>
      </ol>

      <h2 className="text-xl font-semibold text-white">Our Story</h2>
      <p>
        PigeonNest was born from a simple observation: the internet, once hailed as a great
        unifier, has become fragmented by walls of mistrust and data exploitation. Founded in
        Dubai — a nexus of forward-thinking regulation and multicultural exchange — our team of
        cryptographers, blockchain engineers, and privacy advocates set out to redefine social
        interaction for the Web3 age.
      </p>
      <p>
        Our journey began by addressing critical gaps in existing tools: while others stored
        metadata or relied on centralized servers, we engineered a system where data is stored on
        users’ devices, shielded by decentralized networks. We are not just building an app; we
        are igniting a movement toward a more autonomous and interconnected world.
      </p>

      <div id="contact" className="scroll-mt-24 space-y-3 pt-4">
        <h2 className="text-xl font-semibold text-white">Contact</h2>
        <p>Pigeon Nest Information Technology LLC SOC</p>
        <p>C-92 HOR AL ANZ BUILDING 307 - HOR AL ANZ ST - PO Box 88878 - DUBAI - UAE</p>
        <p>
          Email:{' '}
          <a className="underline hover:text-white" href="mailto:info@pigeonnit.com">
            info@pigeonnit.com
          </a>
        </p>
        <p>
          Phone:{' '}
          <a className="underline hover:text-white" href="tel:+971586193145">
            +971 58 619 3145
          </a>
        </p>
      </div>
    </PageShell>
  )
}
