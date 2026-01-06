export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      const payload = await request.json();
      const chatId = payload.message?.chat.id;
      
      if (chatId) {
        // Balas pesan apapun dengan teks ini
        await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: "✅ Bot Terhubung ke Cloudflare!"
          })
        });
      }
      return new Response("OK");
    }
    return new Response("Bot Active");
  }
};
