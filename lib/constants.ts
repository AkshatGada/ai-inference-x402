import { polygonAmoy } from "viem/chains";

export const PRICE_PER_INFERENCE_TOKEN_WEI = 1; // 0.000001 USDC
export const MAX_INFERENCE_TOKENS_PER_CALL = 10000; // 10k inference tokens per query max

export const paymentChain = polygonAmoy;

// USDC token on Polygon Amoy
export const paymentToken = {
    address: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582" as `0x${string}`, // USDC on Polygon Amoy
    symbol: "USDC",
    decimals: 6,
};

// Polygon Amoy x402 facilitator URL
export const FACILITATOR_URL = process.env.FACILITATOR_URL || "https://x402-amoy.polygon.technology";