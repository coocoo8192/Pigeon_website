import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

export function TermsPage() {
  return (
    <PageShell title="Terms of Service">
      <h2 className="text-xl font-semibold text-white">These terms</h2>
      <p>
        These terms of use govern your use and access to our services, including our website(s),
        application(s), APIs, notifications and any information or content appearing therein
        (collectively our “Platform”). By using our Platform, you agree to these terms. If you
        are using our Platform as a representative of an entity, you agree on behalf of that
        entity.
      </p>
      <p>
        You should also read our{' '}
        <Link to="/privacy" className="underline hover:text-white">
          Privacy Policy
        </Link>
        , which sets out how we collect and use your personal information.
      </p>

      <h2 className="text-xl font-semibold text-white">About us</h2>
      <p>
        We are Pigeon Nest Information Technology LLC SOC, trading as PigeonNest. For questions
        relating to our Platform or these terms, email{' '}
        <a className="underline hover:text-white" href="mailto:info@pigeonnit.com">
          info@pigeonnit.com
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold text-white">Changes of terms</h2>
      <p>
        We may amend these terms from time to time by posting the updated terms on our Platform.
        If we make material changes, we will notify you before they become effective. Continuing
        to use the Platform after changes take effect means you agree to the revised terms.
      </p>

      <h2 className="text-xl font-semibold text-white">Availability of our services</h2>
      <p>
        We may change, discontinue, add or remove products, services or features. Beta, preview,
        early access or trial services are not as reliable as other products. We may restrict,
        suspend or terminate your account if we believe you are in breach of these terms. We do
        not guarantee uninterrupted access; the Platform may be interrupted for maintenance,
        repairs, upgrades or network failures.
      </p>

      <h2 className="text-xl font-semibold text-white">The Blockchain Services</h2>
      <p>
        PigeonNest generates wallet addresses and encrypted private keys that you may use to send
        and receive Ethereum and related tokens, allows users to chat, and facilitates submission
        of transaction data to Ethereum-based blockchains. You are solely responsible for
        maintaining the security of your private key and mnemonic phrase. We do not store your
        wallet password or mnemonic and cannot retrieve them. We do not store, send or receive
        Virtual Currency; transfers occur on public blockchains that we do not control.
      </p>

      <h2 className="text-xl font-semibold text-white">Wallet registration</h2>
      <p>
        You must import or create a Wallet to use PigeonNest. You are responsible for all
        activity under your account. Push notifications are optional. PigeonNest does not
        currently charge fees, but reserves the right to do so with prior display. Once a
        transaction is submitted we cannot cancel or modify it. You are responsible for
        applicable taxes.
      </p>

      <h2 className="text-xl font-semibold text-white">Use of the platform</h2>
      <p>
        You must comply with all applicable laws. We grant you a personal, worldwide,
        royalty-free, non-assignable, non-transferable, non-sublicensable, non-exclusive and
        revocable licence to access the Platform solely to use and enjoy it as permitted by these
        terms. You must not copy, modify, distribute, sell, lease, loan or trade access to the
        Platform.
      </p>

      <h2 className="text-xl font-semibold text-white">Third Party Services</h2>
      <p>
        You may view content or use services provided by third parties. We have no control over
        third-party content or policies and are not responsible for them. A description or link
        is not an endorsement.
      </p>

      <h2 className="text-xl font-semibold text-white">Your rights and our rights</h2>
      <p>
        You retain rights to content you submit, and grant us a worldwide, non-exclusive,
        royalty-free licence to use it as needed to operate the Platform, subject to the Privacy
        Policy. Intellectual property in the Platform belongs to us or our licensors. The name
        “Pigeon” and our marks may not be used without prior written consent.
      </p>

      <h2 className="text-xl font-semibold text-white">Limitation on liabilities</h2>
      <p>
        To the fullest extent permitted by law, we provide the Platform on an “as is” and “as
        available” basis. We are not liable for indirect, incidental, special, exemplary,
        consequential or punitive damages, or loss of data, business, opportunities, reputation,
        profits or revenues. We do not exclude liability where it would be illegal to do so.
        Aggregate liability is limited to the amount you paid us (if any) in the last twelve
        months.
      </p>

      <h2 className="text-xl font-semibold text-white">Your representation</h2>
      <p>
        Our Platform is not intended for minors. By using it you represent that you are an adult
        able to legally enter into contractual agreements.
      </p>

      <h2 className="text-xl font-semibold text-white">Indemnity and termination</h2>
      <p>
        You agree to indemnify us against liabilities arising from your breach of these terms or
        your use of the Platform. You may stop using the Platform by deactivating your account.
        We may suspend or terminate access for serious or repeated breach, risk of harm, legal
        requirements, or if providing the Platform is no longer commercially viable.
      </p>

      <h2 className="text-xl font-semibold text-white">Child safety</h2>
      <p>
        We are committed to protecting children’s safety and preventing sexual abuse, sexual
        exploitation and related harmful behaviors. Users must confirm their age when
        registering. User-generated content is reviewed. Sexualized behavior involving children
        is prohibited and will be reported. Users can report suspicious content; we aim to handle
        reports within 24 hours.
      </p>
      <p>
        Questions about these terms or reports of prohibited conduct:{' '}
        <a className="underline hover:text-white" href="mailto:dev@coocoo.pro">
          dev@coocoo.pro
        </a>
        .
      </p>
    </PageShell>
  )
}
