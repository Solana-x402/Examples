import { withPaymentInterceptor, createSigner } from "x402-axios";
import axios from "axios";
import { privateKeyToAccount } from "viem/accounts";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { Wallet } from "ethers";
import dotenv from "dotenv";
dotenv.config();

async function genereateSolanaKeypairs() {
  const keypair = Keypair.generate();
  const solanaPrivateKey = keypair.secretKey;

  const SOLANA_PUBLIC_KEY = keypair.publicKey.toBase58();
  const SOLANA_PRIVATE_KEY = bs58.encode(solanaPrivateKey);

  console.log("Solana public key:", SOLANA_PUBLIC_KEY);
  console.log("Solana private key:", SOLANA_PRIVATE_KEY);

  return { SOLANA_PUBLIC_KEY, SOLANA_PRIVATE_KEY };
}

async function generateEVMKeypairs() {
  const wallet = Wallet.createRandom(); // new random keypair
  console.log("privateKey (0x hex):", wallet.privateKey);
  console.log("address:", wallet.address);
  console.log("mnemonic (if available):", wallet.mnemonic?.phrase);

  return { EVM_PRIVATE_KEY: wallet.privateKey, EVM_PUBLIC_KEY: wallet.address };
}

// genereateSolanaKeypairs();
// generateEVMKeypairs();

const BASE_URL = "https://api.solana402.xyz";
const SOLANA_ADDRESS = "4ZJhPQAgUseCsWhKvJLTmmRRUV74fdoTpQLNfKoekbPY"; // Solana Foundation wallet
const TOKEN_ADDRESS = "3NVcyLzbNfDz3Trwdw3tZqwEuEmNS4vveQPxcW6Ypump"; // OUR TOKEN ADDRESS

const account = privateKeyToAccount(process.env.EVM_PRIVATE_KEY); //Starts with 0x
const signerSol = await createSigner("solana", process.env.SOLANA_PRIVATE_KEY);

// // Create an Axios instance with payment handling
const api = withPaymentInterceptor(axios.create(), {
  evm: account,
  svm: signerSol,
});

async function fetchAccountDetails() {
  try {
    const response = await api.get(`${BASE_URL}/account/detail/${SOLANA_ADDRESS}`);
    console.log("Account details:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
    } else {
      console.error("Error:", error.message || error.toString());
    }
  }
}

async function fetchTokenMetadata() {
  try {
    const response = await api.get(`${BASE_URL}/token/metadata/${TOKEN_ADDRESS}`);
    console.log("Token metadata:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
    } else {
      console.error("Error:", error.message || error.toString());
    }
  }
}

//RESPONSE FROM ABOVE FUNCTION
// {
//   success: true,
//   data: {
//     address: '3NVcyLzbNfDz3Trwdw3tZqwEuEmNS4vveQPxcW6Ypump',
//     name: 'Solana402',
//     symbol: 'SOL402',
//     icon: 'https://ipfs.io/ipfs/bafkreicm6qvyyvkwfsjcens5fwamnqbs53ym3bgdpdwkc5hkbjxg3wstxe',
//     decimals: 6,
//     holder: 180,
//     creator: 'Fm55hPd95NTJGoMCm2X2hCcF8zkbtcCTSUg3aYqSNhXX',
//     create_tx: '5Je7q1NkEpnDHF4jhuAPepkGCgiDkLNaNJeQcV37uhoDQUbnLiqqYxQg6N1ZqzdYhbK6s1cgXzjfahq12pN5YVWF',
//     created_time: 1761864457,
//     first_mint_tx: '5Je7q1NkEpnDHF4jhuAPepkGCgiDkLNaNJeQcV37uhoDQUbnLiqqYxQg6N1ZqzdYhbK6s1cgXzjfahq12pN5YVWF',
//     first_mint_time: 1761864457,
//     metadata: {
//       name: 'Solana402',
//       symbol: 'SOL402',
//       description: '',
//       image: 'https://ipfs.io/ipfs/bafkreicm6qvyyvkwfsjcens5fwamnqbs53ym3bgdpdwkc5hkbjxg3wstxe',
//       showName: true,
//       createdOn: 'https://pump.fun',
//       twitter: 'https://x.com/solana402xyz',
//       website: 'https://solana402.xyz'
//     },
//     metadata_uri: 'https://ipfs.io/ipfs/bafkreid544ry3expxmxodztbnvcvgh27ijyo7nraskxvyxzanpvnuu625u',
//     mint_authority: null,
//     freeze_authority: null,
//     supply: '999999565343595',
//     price: 0.00005049018709194011,
//     market_cap: 50490.18709194011,
//     total_dex_vol_24h: 50420.15771484375,
//     message: 'Token metadata endpoint'
//   }
// }

async function fetchTokenPrice() {
  try {
    const response = await api.get(`${BASE_URL}/token/price/${TOKEN_ADDRESS}`);
    console.log("Token price:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
    } else {
      console.error("Error:", error.message || error.toString());
    }
  }
}

//RESPONSE FROM ABOVE FUNCTION
// {
//   success: true,
//   data: { tokenPrice: 0.00003839459, message: 'Token price endpoint' }
// }

// fetchAccountDetails();
// fetchTokenMetadata();
// fetchTokenPrice();

async function fetchTokenHolders() {
  try {
    const response = await api.get(`${BASE_URL}/token/holders/${TOKEN_ADDRESS}`);
    console.log("Token holders:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
    } else {
      console.error("Error:", error.message || error.toString());
    }
  }
}

// fetchTokenHolders();

//TIME TO IMPLEMENT SOME AI SO SETTING UP MY OPENAI KEYS
