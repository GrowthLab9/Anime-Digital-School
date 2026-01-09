import { CONFIG } from "./config.js";
import { createHandlers } from "./handlers.js";
import { sendMessage } from "./telegram.js";

async function handleRequest(request, env) {
  if (request.method !== "POST") {
    return new Response("OK", { status: 200 });
  }

  const payload = await request.json();
  const handlers = createHandlers({
    token: env.TELEGRAM_BOT_TOKEN,
    adminId: env.ADMIN_ID,
    config: CONFIG,
    sendMessage
  });

  if (payload.message) {
    const response = await handlers.handleMessage(payload.message);
    if (response) {
      return response;
    }
  }

  if (payload.callback_query) {
    const response = await handlers.handleCallback(payload.callback_query);
    if (response) {
      return response;
    }
  }

  return new Response("OK", { status: 200 });
}

export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  }
};
