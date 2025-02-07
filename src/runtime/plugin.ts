import {
  chain as _bitsong,
  assets as bitsongAssetList,
} from 'chain-registry/mainnet/bitsong'
import {
  chain as osmosis,
  assets as osmosisAssetList,
} from 'chain-registry/mainnet/osmosis'
import type { Config } from '@quirks/store'
import {
  keplrExtension,
  leapExtension,
  cosmostationExtension,
  okxExtension,
  keplrMobile,
  leapMobile,
  cosmostationMobile,
} from '@quirks/wallets'
import { quirksPlugin } from '@quirks/vue'
import { generateConfig, initialStateWithCookie } from '@quirks/ssr'
import { defineNuxtPlugin, useCookie } from '#app'

const bitsong = {
  ..._bitsong,
  apis: {
    rpc: [
      {
        address: 'https://rpc.explorebitsong.com',
        provider: 'bitsong-team',
      },
    ],
    rest: [
      {
        address: 'https://lcd.explorebitsong.com',
        provider: 'bitsong-team',
      },
    ],
  },
}

const config: Config = generateConfig({
  wallets: [
    keplrExtension,
    keplrMobile,
    leapExtension,
    leapMobile,
    cosmostationExtension,
    cosmostationMobile,
    okxExtension,
  ],
  chains: [bitsong, osmosis],
  assetsLists: [bitsongAssetList, osmosisAssetList],
  // autoAccountChange: false
})

export default defineNuxtPlugin({
  name: 'quirks:plugin',
  order: -100,
  setup(nuxtApp) {
    const cookie = useCookie('quirks')
    const configWithCookie = initialStateWithCookie(config, JSON.stringify(cookie.value))

    nuxtApp.vueApp.use(quirksPlugin, configWithCookie)
    console.log('Quirks plugin injected!')
  },
})
