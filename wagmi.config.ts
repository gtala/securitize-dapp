import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

import { marketplaceAbi } from './abis/marketplaceAbi'

export default defineConfig(() => {
  return {
    out: "src/generated.ts",
    contracts: [
      {
        abi: marketplaceAbi,
        name: "MarketPlace",
        address: {
          [chains.bscTestnet.id]: "0x6617Bc7e46324004F7DC880982Fe0321562F3E9E",
        },
      },
    ],
    plugins: [react()],
  };
})