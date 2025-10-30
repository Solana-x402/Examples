import { withPaymentInterceptor, createSigner } from "x402-axios";
import axios from "axios";
import { privateKeyToAccount } from "viem/accounts";

const BASE_URL = "https://api.solana402.xyz";
const SOLANA_ADDRESS = "4ZJhPQAgUseCsWhKvJLTmmRRUV74fdoTpQLNfKoekbPY"; // Solana Foundation wallet

const account = privateKeyToAccount("EVM_PRIVATE_KEY_HERE"); //Starts with 0x
const signerSol = await createSigner("solana", "SOLANA_PRIVATE_KEY_HERE");

// Create an Axios instance with payment handling
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

fetchAccountDetails();
