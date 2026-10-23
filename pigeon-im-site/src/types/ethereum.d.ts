export {}

type EthereumRequestArgs = {
  method: string
  params?: unknown
}

type EthereumProvider = {
  request: (args: EthereumRequestArgs) => Promise<unknown>
  on: (event: string, handler: (...args: unknown[]) => void) => void
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}
