import { BrowserProvider } from 'ethers'
import type { Signer } from 'ethers'
import { useCallback, useEffect, useRef, useState } from 'react'

export type MetaMaskStatus =
  | 'missing'
  | 'disconnected'
  | 'connected'
  | 'pending'
  | 'rejected'
  | 'error'

export type MetaMaskState = {
  status: MetaMaskStatus
  address: string | null
  network: string | null
  message: string
}

const defaultState: MetaMaskState = {
  status: 'disconnected',
  address: null,
  network: null,
  message: 'Not connected',
}

function isUserRejected(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const code = 'code' in error ? error.code : undefined
  const message = 'message' in error ? String(error.message) : ''
  return code === 4001 || message.toLowerCase().includes('rejected')
}

function isRequestPending(error: unknown): boolean {
  return Boolean(error && typeof error === 'object' && 'code' in error && error.code === -32002)
}

async function readNetworkLabel(provider: BrowserProvider): Promise<string> {
  const network = await provider.getNetwork()
  return `${network.name} (Chain ID: ${network.chainId.toString()})`
}

export function useMetaMask(enabled: boolean) {
  const [state, setState] = useState<MetaMaskState>(defaultState)
  const providerRef = useRef<BrowserProvider | null>(null)
  const signerRef = useRef<Signer | null>(null)

  const reset = useCallback(() => {
    providerRef.current = null
    signerRef.current = null
    setState({
      status: window.ethereum ? 'disconnected' : 'missing',
      address: null,
      network: null,
      message: window.ethereum ? 'Not connected' : 'MetaMask is not installed',
    })
  }, [])

  const applyConnection = useCallback(async (accounts: string[]) => {
    if (!window.ethereum || accounts.length === 0) {
      reset()
      return
    }

    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const address = accounts[0]
    const network = await readNetworkLabel(provider)

    providerRef.current = provider
    signerRef.current = signer
    setState({
      status: 'connected',
      address,
      network,
      message: 'Connected successfully',
    })
  }, [reset])

  const syncExisting = useCallback(async () => {
    if (!window.ethereum) {
      setState({
        status: 'missing',
        address: null,
        network: null,
        message: 'MetaMask is not installed',
      })
      return
    }

    try {
      const accounts = (await window.ethereum.request({ method: 'eth_accounts' })) as string[]
      if (accounts.length > 0) {
        await applyConnection(accounts)
      } else {
        setState({
          status: 'disconnected',
          address: null,
          network: null,
          message: 'MetaMask detected — click Refresh connection',
        })
      }
    } catch (error) {
      console.error('Failed to read MetaMask accounts', error)
    }
  }, [applyConnection])

  const refresh = useCallback(async () => {
    if (!window.ethereum) {
      setState({
        status: 'missing',
        address: null,
        network: null,
        message: 'MetaMask is not installed',
      })
      throw new Error('MetaMask is not installed')
    }

    try {
      setState((current) => ({ ...current, status: 'pending', message: 'Refreshing...' }))

      try {
        await window.ethereum.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }],
        })
      } catch (revokeError) {
        console.info('wallet_revokePermissions is unavailable or failed', revokeError)
      }

      reset()
      await new Promise((resolve) => setTimeout(resolve, 400))

      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[]

      if (accounts.length === 0) {
        throw new Error('No accounts found in MetaMask')
      }

      await applyConnection(accounts)
    } catch (error) {
      if (isUserRejected(error)) {
        setState({
          status: 'rejected',
          address: null,
          network: null,
          message: 'Connection rejected by user',
        })
        throw new Error('You rejected the connection request.')
      }
      if (isRequestPending(error)) {
        setState({
          status: 'pending',
          address: null,
          network: null,
          message: 'Request pending — check MetaMask',
        })
        throw new Error(
          'Please check your MetaMask extension and complete or cancel the pending request.',
        )
      }

      const message = error instanceof Error ? error.message : 'Connection failed'
      setState({
        status: 'error',
        address: null,
        network: null,
        message,
      })
      throw error instanceof Error ? error : new Error(message)
    }
  }, [applyConnection, reset])

  const getSigner = useCallback(async () => {
    if (!window.ethereum) throw new Error('Please connect MetaMask first')
    const provider = providerRef.current ?? new BrowserProvider(window.ethereum)
    const signer = signerRef.current ?? (await provider.getSigner())
    providerRef.current = provider
    signerRef.current = signer
    return signer
  }, [])

  useEffect(() => {
    if (!enabled) return

    void syncExisting()

    const ethereum = window.ethereum
    if (!ethereum) return

    const onAccountsChanged = (accounts: unknown) => {
      const next = Array.isArray(accounts) ? (accounts as string[]) : []
      void applyConnection(next)
    }
    const onChainChanged = () => {
      window.location.reload()
    }

    ethereum.on('accountsChanged', onAccountsChanged)
    ethereum.on('chainChanged', onChainChanged)

    return () => {
      ethereum.removeListener('accountsChanged', onAccountsChanged)
      ethereum.removeListener('chainChanged', onChainChanged)
    }
  }, [applyConnection, enabled, syncExisting])

  return {
    ...state,
    isReady: state.status === 'connected' && Boolean(state.address),
    refresh,
    getSigner,
  }
}
