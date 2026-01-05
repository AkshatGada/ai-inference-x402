<a href="#">
  <img alt="Next.js 15 AI chatbot with pay-per-token pricing" src="app/opengraph-image.png">
  <h1 align="center">Pay-per-Token AI Inference on Polygon</h1>
</a>

<p align="center">
  An open-source AI chatbot with <strong>pay-per-token</strong> pricing using the x402 protocol on <strong>Polygon Amoy</strong>.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#how-it-works"><strong>How It Works</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- **Pay per token**: Only pay for the AI tokens you use
- **No subscriptions**: No monthly fees or API key required
- **Polygon Amoy**: Payments on Polygon's testnet using USDC
- **x402 Protocol**: HTTP 402 micropayments with the Polygon facilitator
- **Multiple AI Models**: GPT-5.1 and Claude Sonnet 3.7

## How It Works

1. **Connect Wallet**: Enter your private key to connect (stored locally only)
2. **Send Message**: Type a message to the AI
3. **Pay per Token**: x402-fetch signs payment requests automatically
4. **Get Response**: AI streams response with token cost display

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| AI | Vercel AI SDK |
| Payments | x402-fetch + Polygon facilitator |
| Wallet | viem |
| Chain | Polygon Amoy (testnet) |

## Running Locally

### Prerequisites

- Node.js 18+
- pnpm
- OpenAI or Anthropic API key
- Wallet with USDC on Polygon Amoy

### Setup

1. **Clone and install**

```bash
git clone <repository-url>
cd x402-ai-inference
pnpm install
```

2. **Create `.env.local`**

```env
# AI Provider (at least one required)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

That's it! No other API keys needed.

3. **Start the dev server**

```bash
pnpm dev
```

4. **Open http://localhost:3000**

5. **Connect your wallet** using a private key that has USDC on Polygon Amoy

### Getting Test USDC

1. Get POL from [Polygon Amoy Faucet](https://faucet.polygon.technology/)
2. Get test USDC from a testnet bridge or faucet

## Configuration

Edit `lib/constants.ts` to adjust:

```typescript
export const PRICE_PER_INFERENCE_TOKEN_WEI = 1; // 0.000001 USDC/token
export const MAX_INFERENCE_TOKENS_PER_CALL = 10000; // 10k max tokens
export const FACILITATOR_URL = "https://x402-amoy.polygon.technology";
```

## Network Info

| Setting | Value |
|---------|-------|
| Network | Polygon Amoy |
| Chain ID | 80002 |
| Token | USDC |
| Facilitator | `https://x402-amoy.polygon.technology` |

## Learn More

- [x402 Protocol](https://www.x402.org/)
- [Polygon](https://polygon.technology/)
- [Vercel AI SDK](https://sdk.vercel.ai/)

## License

MIT License
