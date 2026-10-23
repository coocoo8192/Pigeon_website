import { HDNodeWallet, Wallet } from 'ethers'

export const DERIVATION_PATH = "m/44'/60'/0'/0/0"
export const DELETE_API_URL = 'https://data.mechat.pro/rest_post'
export const DELETE_PROCESSOR_ID = 1018
export const MESSAGE_SEPARATOR = '&'

export type SignMethod = 'mnemonic' | 'privateKey' | 'metaMask'

export type FieldStatus = {
  isValid: boolean
  message: string
}

export function validateUserId(userId: string): boolean {
  return /^\d{6}$/.test(userId)
}

export function validateMnemonic(mnemonic: string): boolean {
  return mnemonic.split(/\s+/).filter((word) => word.length > 0).length >= 12
}

export function normalizePrivateKey(privateKey: string): string {
  const key = privateKey.trim().toLowerCase()
  return key.startsWith('0x') ? key : `0x${key}`
}

export function validatePrivateKey(privateKey: string): boolean {
  return /^0x[0-9a-f]{64}$/.test(normalizePrivateKey(privateKey))
}

export function generateNonce(): string {
  const bytes = new Uint8Array(5)
  crypto.getRandomValues(bytes)
  let value = 0n
  for (const byte of bytes) {
    value = (value << 8n) | BigInt(byte)
  }
  return ((value % 9_000_000_000n) + 1_000_000_000n).toString()
}

export function formatMessageForSigning(userId: string): string {
  return `${userId}${MESSAGE_SEPARATOR}${generateNonce()}`
}

export function walletFromMnemonic(mnemonic: string): HDNodeWallet {
  const phrase = mnemonic.trim().split(/\s+/).join(' ')
  return HDNodeWallet.fromPhrase(phrase, undefined, DERIVATION_PATH)
}

export function walletFromPrivateKey(privateKey: string): Wallet {
  return new Wallet(normalizePrivateKey(privateKey))
}

export function checkMnemonicStatus(mnemonic: string): FieldStatus {
  const trimmed = mnemonic.trim()
  if (!trimmed) return { isValid: false, message: 'Mnemonic phrase is required' }
  if (!validateMnemonic(trimmed)) {
    return { isValid: false, message: 'Mnemonic must contain at least 12 words' }
  }
  try {
    walletFromMnemonic(trimmed)
    return { isValid: true, message: 'Valid mnemonic phrase' }
  } catch {
    return { isValid: false, message: 'Invalid mnemonic phrase' }
  }
}

export function checkPrivateKeyStatus(privateKey: string): FieldStatus {
  const trimmed = privateKey.trim()
  if (!trimmed) return { isValid: false, message: 'Private key is required' }
  if (!validatePrivateKey(trimmed)) {
    return { isValid: false, message: 'Private key must be 64 hexadecimal characters' }
  }
  try {
    walletFromPrivateKey(trimmed)
    return { isValid: true, message: 'Valid private key' }
  } catch {
    return { isValid: false, message: 'Invalid private key format' }
  }
}

export function checkUserIdStatus(userId: string): FieldStatus {
  const trimmed = userId.trim()
  if (!trimmed) return { isValid: false, message: 'User ID is required' }
  if (!validateUserId(trimmed)) {
    return { isValid: false, message: 'User ID must be exactly 6 digits' }
  }
  return { isValid: true, message: 'Valid User ID format' }
}

export type DeleteAccountPayload = {
  walletAddress: string
  userId: string
  signature: string
}

export type DeleteAccountResult = {
  raw: string
  result?: string
}

export async function submitDeleteAccount(
  payload: DeleteAccountPayload,
): Promise<DeleteAccountResult> {
  const response = await fetch(DELETE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      processorId: DELETE_PROCESSOR_ID,
      newData: JSON.stringify(payload),
    }),
  })

  const raw = await response.text()
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
  }

  return { raw, result: readApiResult(raw) }
}

function readApiResult(raw: string): string | undefined {
  try {
    const outer = JSON.parse(raw) as { returnValue?: string }
    if (!outer.returnValue) return undefined
    const inner = JSON.parse(outer.returnValue) as { result?: string }
    return inner.result
  } catch {
    return undefined
  }
}
