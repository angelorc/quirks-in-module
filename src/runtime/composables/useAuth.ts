import type { WalletOptions } from '@quirks/core'

export function useAuth() {
  async function openWallet(opts: WalletOptions) {
    const { wallets } = useConfig()
    const { connect } = useConnect()

    // eslint-disable-next-line no-useless-catch
    try {
      const wallet = wallets.value.find(w => w.options.wallet_name === opts.wallet_name)
      if (wallet && !wallet.injected) {
        return
      }
      await connect(opts.wallet_name)
    }
    catch (e) {
      throw e
    }
  }

  return {
    openWallet,
  }
}
