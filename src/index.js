import { TelegramBot } from './telegram.js';
import { BotHandler } from './handlers.js';

export default {
  async fetch(request, env) {
    // Hanya terima Method POST
    if (request.method !== "POST") {
      return new Response("🤖 Anime Digital School Bot System is Online.");
    }

    try {
      const payload = await request.json();
      const bot = new TelegramBot(env.BOT_TOKEN);
      const handler = new BotHandler(bot, env);

      // Routing Update
      if (payload.message) {
        await handler.handleMessage(payload.message);
      } else if (payload.callback_query) {
        await handler.handleCallback(payload.callback_query);
      }

    } catch (e) {
      console.error("Error:", e); // Cek log di Cloudflare Dashboard
    }

    return new Response("OK");
  }
};
