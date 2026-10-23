import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

export function DeleteAccountPage() {
  return (
    <PageShell title="Delete Account">
      <p>
        If you would like to delete your PigeonNest account, contact us. Deleting your account
        removes all messages, media, contacts and every other piece of data you store in the
        PigeonNest cloud. This action must be confirmed via your account and cannot be undone.
      </p>
      <p>
        By default, if you stop using PigeonNest and do not come online for at least 6 months,
        your account will be deleted along with all messages, media, contacts and other cloud
        data. You can change the inactive self-destruct period in Settings.
      </p>
      <p>
        Send a deletion request to{' '}
        <a className="underline hover:text-white" href="mailto:info@pigeonnit.com">
          info@pigeonnit.com
        </a>{' '}
        from the email or account identifier associated with your wallet, and include the words
        “Delete Account” in the subject.
      </p>
      <p>
        See also our{' '}
        <Link to="/privacy" className="underline hover:text-white">
          Privacy Policy
        </Link>{' '}
        for how personal data is stored and deleted.
      </p>
    </PageShell>
  )
}
