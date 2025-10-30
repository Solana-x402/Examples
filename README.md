# Test Buy Script

This script demonstrates how to fetch Solana account details using the x402 payment protocol with the Solana402 API.

## Installation

Install the required dependencies:

```bash
npm install x402-axios axios viem
```

## Configuration

Before running the script, you need to update the following values in `test-buy.js`:

### 1. Solana Address

Replace the `SOLANA_ADDRESS` constant with the wallet address you want to query:

```javascript
const SOLANA_ADDRESS = "YOUR_SOLANA_ADDRESS_HERE";
```

### 2. Private Keys

Replace the placeholder private keys with your actual credentials:

- **EVM Private Key**: Replace `"EVM_PRIVATE_KEY_HERE"` with your Ethereum wallet private key (must start with `0x`). Certain versions of x402-axios have issues if you do not provide one so it can be empty but we suggest adding one
- **Solana Private Key**: Replace `"SOLANA_PRIVATE_KEY_HERE"` with your Solana wallet private key

```javascript
const account = privateKeyToAccount("0xYOUR_EVM_PRIVATE_KEY");
const signerSol = await createSigner("solana", "YOUR_SOLANA_PRIVATE_KEY");
```

## Usage

Once configured, run the script:

```bash
node test-buy.js
```

The script will fetch and display account details for the specified Solana address using the x402 payment protocol.

## How It Works

1. Creates payment signers for both EVM and Solana networks
2. Configures an Axios instance with x402 payment interceptors
3. Makes an authenticated API request to fetch Solana account details
4. Handles and displays any errors that occur during the request

## Notes

- Keep your private keys secure and never commit them to version control
- The x402 protocol handles micropayments automatically for API access
- The base API URL is set to `https://api.solana402.xyz`
