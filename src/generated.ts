import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MarketPlace
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export const marketPlaceABI = [
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FundsWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'offerId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'quantity',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'cost',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ItemListed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'offerId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'quantity',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'cost',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ItemPurchased',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'EIP712_DOMAIN_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'LISTING_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'claimEarnings',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: 'cost', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createOffer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'seller', internalType: 'address', type: 'address' },
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: 'cost', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createOfferWithSignature',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'offerId', internalType: 'uint256', type: 'uint256' }],
    name: 'executePurchase',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getAllOffers',
    outputs: [
      {
        name: '',
        internalType: 'struct Marketplace.TradeOffer[]',
        type: 'tuple[]',
        components: [
          { name: 'seller', internalType: 'address', type: 'address' },
          { name: 'token', internalType: 'contract IERC20', type: 'address' },
          { name: 'quantity', internalType: 'uint256', type: 'uint256' },
          { name: 'cost', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getName',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'buyer', internalType: 'address', type: 'address' }],
    name: 'getPurchaseHistory',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'offerCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'offers',
    outputs: [
      { name: 'seller', internalType: 'address', type: 'address' },
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: 'cost', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'purchaseHistory',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'sellerBalances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export const marketPlaceAddress = {
  97: '0x6617Bc7e46324004F7DC880982Fe0321562F3E9E',
} as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export const marketPlaceConfig = {
  address: marketPlaceAddress,
  abi: marketPlaceABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"EIP712_DOMAIN_TYPEHASH"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceEip712DomainTypehash<
  TFunctionName extends 'EIP712_DOMAIN_TYPEHASH',
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'EIP712_DOMAIN_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"LISTING_TYPEHASH"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceListingTypehash<
  TFunctionName extends 'LISTING_TYPEHASH',
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'LISTING_TYPEHASH',
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"getAllOffers"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceGetAllOffers<
  TFunctionName extends 'getAllOffers',
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'getAllOffers',
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"getName"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceGetName<
  TFunctionName extends 'getName',
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'getName',
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"getPurchaseHistory"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceGetPurchaseHistory<
  TFunctionName extends 'getPurchaseHistory',
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'getPurchaseHistory',
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"offerCounter"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceOfferCounter<
  TFunctionName extends 'offerCounter',
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'offerCounter',
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"offers"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceOffers<
  TFunctionName extends 'offers',
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'offers',
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"purchaseHistory"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlacePurchaseHistory<
  TFunctionName extends 'purchaseHistory',
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'purchaseHistory',
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"sellerBalances"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceSellerBalances<
  TFunctionName extends 'sellerBalances',
  TSelectData = ReadContractResult<typeof marketPlaceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractRead({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'sellerBalances',
    ...config,
  } as UseContractReadConfig<typeof marketPlaceABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketPlaceABI}__.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof marketPlaceAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketPlaceABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof marketPlaceABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof marketPlaceABI, TFunctionName, TMode>({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"claimEarnings"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceClaimEarnings<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof marketPlaceAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketPlaceABI,
          'claimEarnings'
        >['request']['abi'],
        'claimEarnings',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'claimEarnings'
      }
    : UseContractWriteConfig<typeof marketPlaceABI, 'claimEarnings', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'claimEarnings'
      } = {} as any,
) {
  return useContractWrite<typeof marketPlaceABI, 'claimEarnings', TMode>({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'claimEarnings',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"createOffer"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceCreateOffer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof marketPlaceAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketPlaceABI,
          'createOffer'
        >['request']['abi'],
        'createOffer',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'createOffer'
      }
    : UseContractWriteConfig<typeof marketPlaceABI, 'createOffer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'createOffer'
      } = {} as any,
) {
  return useContractWrite<typeof marketPlaceABI, 'createOffer', TMode>({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'createOffer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"createOfferWithSignature"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceCreateOfferWithSignature<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof marketPlaceAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketPlaceABI,
          'createOfferWithSignature'
        >['request']['abi'],
        'createOfferWithSignature',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'createOfferWithSignature'
      }
    : UseContractWriteConfig<
        typeof marketPlaceABI,
        'createOfferWithSignature',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'createOfferWithSignature'
      } = {} as any,
) {
  return useContractWrite<
    typeof marketPlaceABI,
    'createOfferWithSignature',
    TMode
  >({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'createOfferWithSignature',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"executePurchase"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceExecutePurchase<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof marketPlaceAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof marketPlaceABI,
          'executePurchase'
        >['request']['abi'],
        'executePurchase',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'executePurchase'
      }
    : UseContractWriteConfig<
        typeof marketPlaceABI,
        'executePurchase',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'executePurchase'
      } = {} as any,
) {
  return useContractWrite<typeof marketPlaceABI, 'executePurchase', TMode>({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'executePurchase',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketPlaceABI}__.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function usePrepareMarketPlaceWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketPlaceABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketPlaceABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"claimEarnings"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function usePrepareMarketPlaceClaimEarnings(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketPlaceABI, 'claimEarnings'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'claimEarnings',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketPlaceABI, 'claimEarnings'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"createOffer"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function usePrepareMarketPlaceCreateOffer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketPlaceABI, 'createOffer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'createOffer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketPlaceABI, 'createOffer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"createOfferWithSignature"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function usePrepareMarketPlaceCreateOfferWithSignature(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof marketPlaceABI,
      'createOfferWithSignature'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'createOfferWithSignature',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof marketPlaceABI,
    'createOfferWithSignature'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link marketPlaceABI}__ and `functionName` set to `"executePurchase"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function usePrepareMarketPlaceExecutePurchase(
  config: Omit<
    UsePrepareContractWriteConfig<typeof marketPlaceABI, 'executePurchase'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    functionName: 'executePurchase',
    ...config,
  } as UsePrepareContractWriteConfig<typeof marketPlaceABI, 'executePurchase'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketPlaceABI}__.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof marketPlaceABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractEvent({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    ...config,
  } as UseContractEventConfig<typeof marketPlaceABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketPlaceABI}__ and `eventName` set to `"FundsWithdrawn"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceFundsWithdrawnEvent(
  config: Omit<
    UseContractEventConfig<typeof marketPlaceABI, 'FundsWithdrawn'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractEvent({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    eventName: 'FundsWithdrawn',
    ...config,
  } as UseContractEventConfig<typeof marketPlaceABI, 'FundsWithdrawn'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketPlaceABI}__ and `eventName` set to `"ItemListed"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceItemListedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketPlaceABI, 'ItemListed'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractEvent({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    eventName: 'ItemListed',
    ...config,
  } as UseContractEventConfig<typeof marketPlaceABI, 'ItemListed'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link marketPlaceABI}__ and `eventName` set to `"ItemPurchased"`.
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)
 */
export function useMarketPlaceItemPurchasedEvent(
  config: Omit<
    UseContractEventConfig<typeof marketPlaceABI, 'ItemPurchased'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof marketPlaceAddress } = {} as any,
) {
  return useContractEvent({
    abi: marketPlaceABI,
    address: marketPlaceAddress[97],
    eventName: 'ItemPurchased',
    ...config,
  } as UseContractEventConfig<typeof marketPlaceABI, 'ItemPurchased'>)
}
