import { modelID, myProvider } from "@/lib/models";
import {
  convertToModelMessages,
  smoothStream,
  streamText,
  UIMessage,
} from "ai";
import { NextRequest } from "next/server";
import {
  PRICE_PER_INFERENCE_TOKEN_WEI,
} from "../../../lib/constants";

export async function POST(request: NextRequest) {
  // Process the chat request
  const {
    messages,
    selectedModelId,
  }: {
    messages: Array<UIMessage>;
    selectedModelId: modelID;
  } = await request.json();

  const stream = streamText({
    system: "You are a helpful assistant.",
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      },
      openai: {
        thinking: { type: "enabled", budgetTokens: 12000 },
      },
    },
    model: myProvider.languageModel(selectedModelId),
    experimental_transform: [
      smoothStream({
        chunking: "word",
      }),
    ],
    messages: convertToModelMessages(messages),
    onFinish: async (event) => {
      const totalTokens = event.totalUsage.totalTokens;

      if (!totalTokens) {
        console.error("Token usage data not available");
        return;
      }

      const finalPrice = PRICE_PER_INFERENCE_TOKEN_WEI * totalTokens;

      console.log(`AI inference completed: ${totalTokens} tokens, cost: $${finalPrice / 1e6} USDC`);
    },
  });

  return stream.toUIMessageStreamResponse({
    sendReasoning: true,
    messageMetadata: ({ part }) => {
      if (part.type === "finish") {
        return {
          totalTokens: part.totalUsage.totalTokens,
        };
      }
      return undefined;
    },
    onError: () => {
      return `An error occurred, please try again!`;
    },
  });
}
