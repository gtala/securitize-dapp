# Securitize Dapp

This is a Next.js project using Wagmi and WalletKit for Ethereum integration.

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone git@github.com:gtala/securitize-dapp.git
cd securitize-dapp
```

### 2. Install dependencies

Install the required dependencies using Yarn:

```bash
yarn install
```

### 3. Set up Wagmi

Before running the app, generate the Wagmi files:

```bash
yarn wagmi
```

This will generate necessary Wagmi files required for Ethereum interactions.

### 4. Development Mode

To start the development server:

```bash
yarn dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000).

### 5. Build the Project

To create an optimized production build:

```bash
yarn build
```

### 6. Start the Production Server

After building the project, you can start the production server:

```bash
yarn start
```

### 7. Linting

To run the linter for code quality checks:

```bash
yarn lint
```

## Additional Clarification

Before using this app, please note the following:

- You need to **own an ERC20 token** that you want to sell.
- You need to **approve the app to spend** the amount of tokens you want to sell to the **Marketplace contract** at address: `0x6617Bc7e46324004F7DC880982Fe0321562F3E9E`.

## Dapp URL

You can access the deployed version of the Dapp at:

[https://securitize-dapp.vercel.app/](https://securitize-dapp.vercel.app/)

## Smart Contract

The smart contract for the marketplace can be found at:

[https://github.com/gtala/marketplace-contracts](https://github.com/gtala/marketplace-contracts)

## BSC Testnet Contract

The contract on the Binance Smart Chain (BSC) testnet can be found at:

[0x6617Bc7e46324004F7DC880982Fe0321562F3E9E](https://testnet.bscscan.com/address/0x6617Bc7e46324004F7DC880982Fe0321562F3E9E)

## Demo Video

Watch the demo of the Dapp here:

[Demo Video on Loom](https://www.loom.com/share/62ad32f6bd2d4affaf2f541cbebd1811)

## Clarifications

Some features were not included in the current version due to time constraints. Future updates may include additional functionality to improve the overall experience.

- Backend
- EIP-712 Signed Message Interaction
- Sell Tokens Directly
- Purchase Flow
- Withdraw Section


## Dependencies

This project uses the following dependencies:

- **Next.js**: React framework for building web applications
- **Wagmi**: Ethereum hooks library for React
- **WalletKit**: Suite of tools for wallet connection
- **Viem**: Ethereum JS client
- **React**: JavaScript library for building user interfaces

## Development Dependencies

- **TypeScript**: Typed superset of JavaScript
- **ESLint**: Linter for JavaScript/TypeScript code quality
- **Prettier**: Code formatter