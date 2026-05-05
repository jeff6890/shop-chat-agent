/**
 * Vapi Service
 * Manages interactions with the Vapi API
 */
import { VapiClient } from "@vapi-ai/server-sdk";
import AppConfig from "./config.server";

export function createVapiService(apiKey = process.env.VAPI_PRIVATE_KEY) {
  // Initialize Vapi client
  const vapi = new VapiClient({ token: apiKey });

  /**
   * Helper function to create an assistant
   */
  const createAssistant = async (options) => {
    return await vapi.assistants.create({
      model: {
        provider: "openai",
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: options.systemPrompt || "You are a helpful assistant.",
          },
        ],
      },
      voice: {
        provider: "11labs",
        voiceId: "burt", // replace with preferred voice
      },
      name: options.name || "Shop Assistant",
    });
  };

  /**
   * Handle server-side events from Vapi (e.g. Server URL for tool calling)
   */
  const handleVapiWebhook = async (payload) => {
    // You can process tool calls from Vapi here
    // e.g. connect to mcp-client to call Shopify tools
    console.log("Vapi webhook payload received:", payload);
    return { results: [] };
  };

  return {
    client: vapi,
    createAssistant,
    handleVapiWebhook
  };
}

export default {
  createVapiService
};
