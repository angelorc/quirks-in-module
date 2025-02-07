import { useConfig, useConnect } from '#imports'

export function useAuth() {
  const { wallets } = useConfig()
  const { connect } = useConnect()

  async function openWallet(wallet_name: string) {
    // eslint-disable-next-line no-useless-catch
    try {
      const wallet = wallets.value.find(w => w.options.wallet_name === wallet_name)
      if (wallet && !wallet.injected) {
        return
      }
      await connect(wallet_name)
    }
    catch (e) {
      throw e
    }
  }

  return {
    openWallet,
  }
}
