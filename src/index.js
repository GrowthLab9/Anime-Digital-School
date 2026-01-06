const TOKEN = "TOKEN_BOT_ANDA"; // Ganti dengan token dari BotFather
const ADMIN_ID = "ID_TELEGRAM_ANDA"; // Ganti dengan ID Telegram Anda (cek di @userinfobot)

async function handleRequest(request) {
  if (request.method === "POST") {
    const payload = await request.json();

    if (payload.message) {
      const chatId = payload.message.chat.id;
      const text = payload.message.text;

      // Fitur Command /start
      if (text === "/start") {
        return sendMessage(chatId, "Welcome to *Anime Digital School*! 🎓✨\n\nTempat belajar desain, coding, dan ilustrasi dengan gaya anime.", {
          inline_keyboard: [
            [{ text: "📚 Daftar Kelas", callback_data: "list_kelas" }],
            [{ text: "📝 Cara Daftar", callback_data: "cara_daftar" }],
            [{ text: "🌐 Website", url: "https://github.com" }],
            [{ text: "👥 Hubungi Admin", callback_data: "hubungi_admin" }]
          ]
        });
      }

      // Fitur Admin: Broadcast (Hanya bisa digunakan oleh ADMIN_ID)
      if (text.startsWith("/bc ") && chatId.toString() === ADMIN_ID) {
        const pesanBc = text.replace("/bc ", "");
        // Catatan: Untuk broadcast ke banyak user, perlu database (KV Storage). 
        // Ini adalah contoh respon sukses.
        return sendMessage(chatId, "📢 Pesan Broadcast dikirim: " + pesanBc);
      }
    }

    // Handle klik tombol (Callback Query)
    if (payload.callback_query) {
      const chatId = payload.callback_query.message.chat.id;
      const data = payload.callback_query.data;

      if (data === "list_kelas") {
        return sendMessage(chatId, "📖 *Pilihan Kelas:* \n1. 2D Illustration\n2. Live2D Rigging\n3. Manga Scriptwriting");
      }
      if (data === "cara_daftar") {
        return sendMessage(chatId, "Cara daftar: \n1. Pilih kelas\n2. Bayar via E-Wallet\n3. Konfirmasi ke @Admin");
      }
      if (data === "hubungi_admin") {
        return sendMessage(chatId, "Silahkan chat @UsernameAdmin Anda.");
      }
    }
  }
  return new Response("OK", { status: 200 });
}

async function sendMessage(chatId, text, replyMarkup = null) {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: "Markdown",
    reply_markup: replyMarkup
  };

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
