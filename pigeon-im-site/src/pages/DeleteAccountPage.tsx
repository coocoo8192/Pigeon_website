import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { useMetaMask } from '../hooks/useMetaMask'
import {
  checkMnemonicStatus,
  checkPrivateKeyStatus,
  checkUserIdStatus,
  DERIVATION_PATH,
  formatMessageForSigning,
  submitDeleteAccount,
  validateUserId,
  walletFromMnemonic,
  walletFromPrivateKey,
  type SignMethod,
} from '../lib/deleteAccount'

type DialogState =
  | { kind: 'none' }
  | { kind: 'confirm'; userId: string }
  | { kind: 'alert'; title: string; message: string }

type SubmitPhase = 'idle' | 'signing' | 'submitting'

type SubmitResult = {
  walletAddress: string
  userId: string
  signedMessage: string
  method: string
  derivationPath: string
  apiMessage: string
}

const methods: { value: SignMethod; title: string; hint: string }[] = [
  {
    value: 'mnemonic',
    title: 'Mnemonic phrase',
    hint: '12-word recovery phrase, English words separated by spaces',
  },
  {
    value: 'privateKey',
    title: 'Private key',
    hint: '64 hexadecimal characters, 0x prefix optional',
  },
  {
    value: 'metaMask',
    title: 'MetaMask',
    hint: 'Sign with the connected browser wallet',
  },
]

export function DeleteAccountPage() {
  const [method, setMethod] = useState<SignMethod>('mnemonic')
  const [mnemonic, setMnemonic] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [userId, setUserId] = useState('')
  const [phase, setPhase] = useState<SubmitPhase>('idle')
  const [dialog, setDialog] = useState<DialogState>({ kind: 'none' })
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const metaMask = useMetaMask(method === 'metaMask')

  const userIdStatus = useMemo(() => checkUserIdStatus(userId), [userId])
  const methodStatus = useMemo(() => {
    if (method === 'mnemonic') return checkMnemonicStatus(mnemonic)
    if (method === 'privateKey') return checkPrivateKeyStatus(privateKey)
    if (!metaMask.isReady) return { isValid: false, message: 'MetaMask not connected' }
    return { isValid: true, message: 'MetaMask connected and ready' }
  }, [metaMask.isReady, method, mnemonic, privateKey])

  const busy = phase !== 'idle'

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !busy) setDialog({ kind: 'none' })
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [busy])

  function showAlert(title: string, message: string) {
    setDialog({ kind: 'alert', title, message })
  }

  function requestDelete() {
    setError(null)
    setResult(null)

    if (!methodStatus.isValid) {
      showAlert('Signing method error', methodStatus.message)
      return
    }
    if (!userIdStatus.isValid) {
      showAlert('User ID error', userIdStatus.message)
      return
    }

    setDialog({ kind: 'confirm', userId: userId.trim() })
  }

  async function confirmDelete() {
    const currentUserId = userId.trim()
    setDialog({ kind: 'none' })
    setError(null)
    setResult(null)

    if (!validateUserId(currentUserId)) {
      showAlert('Format error', 'User ID must be exactly 6 digits (0-9)')
      return
    }

    try {
      setPhase('signing')
      const signedMessage = formatMessageForSigning(currentUserId)
      let walletAddress = ''
      let signature = ''
      let methodUsed = ''
      let derivationPath = ''

      if (method === 'mnemonic') {
        const wallet = walletFromMnemonic(mnemonic)
        walletAddress = wallet.address
        signature = await wallet.signMessage(signedMessage)
        methodUsed = 'Mnemonic'
        derivationPath = DERIVATION_PATH
      } else if (method === 'privateKey') {
        const wallet = walletFromPrivateKey(privateKey)
        walletAddress = wallet.address
        signature = await wallet.signMessage(signedMessage)
        methodUsed = 'Private key'
        derivationPath = 'Not applicable (direct private key)'
      } else {
        const signer = await metaMask.getSigner()
        walletAddress = metaMask.address ?? (await signer.getAddress())
        signature = await signer.signMessage(signedMessage)
        methodUsed = 'MetaMask'
        derivationPath = 'Browser extension'
      }

      setPhase('submitting')
      const api = await submitDeleteAccount({
        walletAddress,
        userId: signedMessage,
        signature,
      })

      setResult({
        walletAddress,
        userId: currentUserId,
        signedMessage,
        method: methodUsed,
        derivationPath,
        apiMessage: api.result ?? api.raw ?? 'Submission successful',
      })

      if (api.result) {
        showAlert('API response', api.result)
      }
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : 'Signing or submission failed'
      setError(message)
      showAlert('Delete failed', message)
    } finally {
      setPhase('idle')
    }
  }

  async function refreshMetaMask() {
    try {
      await metaMask.refresh()
      showAlert('Connection refreshed', 'Successfully refreshed the MetaMask connection.')
    } catch (refreshError) {
      const message =
        refreshError instanceof Error ? refreshError.message : 'MetaMask connection failed'
      showAlert('MetaMask', message)
    }
  }

  return (
    <PageShell title="Delete Account">
      <p>
        Deleting your PigeonNest account removes all messages, media, contacts and every other
        piece of data stored in the PigeonNest cloud. Confirm the request with the wallet that
        owns the account. This cannot be undone.
      </p>
      <p>
        Your mnemonic or private key is used only in this browser to sign the request. The server
        receives the wallet address, signed message and signature — not the secret itself.
      </p>

      <div className="glass space-y-6 rounded-2xl p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Signing method</h2>
          <div className="mt-3 grid gap-3">
            {methods.map((item) => {
              const selected = method === item.value
              return (
                <label
                  key={item.value}
                  className={`block cursor-pointer rounded-xl border px-4 py-3 transition ${
                    selected
                      ? 'border-white/45 bg-white/12'
                      : 'border-white/15 bg-white/5 hover:border-white/25'
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="signMethod"
                      value={item.value}
                      checked={selected}
                      disabled={busy}
                      onChange={() => setMethod(item.value)}
                      className="mt-1"
                    />
                    <span>
                      <span className="block font-semibold text-white">{item.title}</span>
                      <span className="mt-1 block text-xs text-white/65 sm:text-sm">
                        {item.hint}
                      </span>
                    </span>
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {method === 'mnemonic' && (
          <Field
            label="Mnemonic phrase"
            hint={methodStatus.message}
            valid={mnemonic.length === 0 ? undefined : methodStatus.isValid}
          >
            <textarea
              value={mnemonic}
              disabled={busy}
              autoComplete="off"
              spellCheck={false}
              placeholder="word1 word2 word3 ..."
              onChange={(event) => setMnemonic(event.target.value)}
              className="min-h-24 w-full resize-y rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white outline-none placeholder:text-white/35 focus:border-white/45"
            />
          </Field>
        )}

        {method === 'privateKey' && (
          <Field
            label="Private key"
            hint={methodStatus.message}
            valid={privateKey.length === 0 ? undefined : methodStatus.isValid}
          >
            <input
              type="password"
              value={privateKey}
              disabled={busy}
              autoComplete="off"
              spellCheck={false}
              placeholder="64 hexadecimal characters"
              onChange={(event) => setPrivateKey(event.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white outline-none placeholder:text-white/35 focus:border-white/45"
            />
          </Field>
        )}

        {method === 'metaMask' && (
          <div className="space-y-3">
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                metaMask.isReady
                  ? 'border-emerald-300/40 bg-emerald-400/10 text-emerald-100'
                  : 'border-white/20 bg-white/8 text-white/80'
              }`}
            >
              <p>
                <strong>Status:</strong> {metaMask.message}
              </p>
              {metaMask.address && (
                <p className="mt-2 break-all">
                  <strong>Address:</strong> {metaMask.address}
                </p>
              )}
              {metaMask.network && (
                <p className="mt-1">
                  <strong>Network:</strong> {metaMask.network}
                </p>
              )}
            </div>
            <p className="text-xs text-white/60">
              Confirm this is the wallet you want to delete. If it is not, switch the account in
              MetaMask and refresh the connection.
            </p>
            <button
              type="button"
              disabled={busy || metaMask.status === 'missing' || metaMask.status === 'pending'}
              onClick={() => void refreshMetaMask()}
              className="glass-btn-strong rounded-xl px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              {metaMask.status === 'pending' ? 'Refreshing...' : 'Refresh connection'}
            </button>
          </div>
        )}

        <Field
          label="User ID"
          hint={userId.length === 0 ? 'Enter exactly 6 digits (0-9)' : userIdStatus.message}
          valid={userId.length === 0 ? undefined : userIdStatus.isValid}
        >
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={userId}
            disabled={busy}
            placeholder="6-digit user ID"
            onChange={(event) => setUserId(event.target.value.replace(/\D/g, '').slice(0, 6))}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white outline-none placeholder:text-white/35 focus:border-white/45"
          />
        </Field>

        <button
          type="button"
          disabled={busy}
          onClick={requestDelete}
          className="w-full rounded-xl bg-red-500/90 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {phase === 'signing'
            ? 'Signing...'
            : phase === 'submitting'
              ? 'Submitting...'
              : 'Delete Account'}
        </button>

        {error && (
          <p className="rounded-xl border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
            {error}
          </p>
        )}

        {result && (
          <div className="space-y-2 rounded-xl border border-white/20 bg-white/8 px-4 py-3 text-sm text-white/85">
            <p>
              <strong className="text-white">Wallet address:</strong>{' '}
              <span className="break-all">{result.walletAddress}</span>
            </p>
            <p>
              <strong className="text-white">User ID:</strong> {result.userId}
            </p>
            <p>
              <strong className="text-white">Signed message:</strong> {result.signedMessage}
            </p>
            <p>
              <strong className="text-white">Method:</strong> {result.method}
            </p>
            <p>
              <strong className="text-white">Derivation path:</strong> {result.derivationPath}
            </p>
            <p>
              <strong className="text-white">Server response:</strong> {result.apiMessage}
            </p>
          </div>
        )}
      </div>

      <p>
        See also our{' '}
        <Link to="/privacy" className="underline hover:text-white">
          Privacy Policy
        </Link>{' '}
        for how personal data is stored and deleted.
      </p>

      {dialog.kind === 'confirm' && (
        <Modal onClose={() => !busy && setDialog({ kind: 'none' })}>
          <h3 className="text-lg font-semibold text-white">Delete this account?</h3>
          <p className="mt-3 text-white/80">Please confirm the User ID you want to delete:</p>
          <p className="mt-3 rounded-xl bg-white/10 px-3 py-2 font-semibold text-white">
            {dialog.userId}
          </p>
          <p className="mt-3 text-sm text-red-200">
            Once deleted, the data related to your account will be permanently deleted and cannot
            be restored.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="glass-btn rounded-xl px-4 py-2 text-sm font-semibold"
              onClick={() => setDialog({ kind: 'none' })}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-xl bg-red-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
              onClick={() => void confirmDelete()}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}

      {dialog.kind === 'alert' && (
        <Modal onClose={() => setDialog({ kind: 'none' })}>
          <h3 className="text-lg font-semibold text-white">{dialog.title}</h3>
          <p className="mt-3 whitespace-pre-wrap text-white/80">{dialog.message}</p>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="glass-btn-strong rounded-xl px-4 py-2 text-sm font-semibold"
              onClick={() => setDialog({ kind: 'none' })}
            >
              OK
            </button>
          </div>
        </Modal>
      )}
    </PageShell>
  )
}

function Field({
  label,
  hint,
  valid,
  children,
}: {
  label: string
  hint: string
  valid?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white">{label}</span>
      {children}
      <span
        className={`mt-2 block text-xs ${
          valid === true ? 'text-emerald-200' : valid === false ? 'text-red-200' : 'text-white/55'
        }`}
      >
        {hint}
      </span>
    </label>
  )
}

function Modal({
  children,
  onClose,
}: {
  children: ReactNode
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="glass w-full max-w-md rounded-2xl p-5 shadow-2xl">{children}</div>
    </div>
  )
}
