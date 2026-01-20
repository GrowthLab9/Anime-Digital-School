const MENU_KEYBOARD = {
  inline_keyboard: [
    [{ text: "📚 Daftar Kelas", callback_data: "list_kelas" }],
    [{ text: "📝 Cara Daftar", callback_data: "cara_daftar" }],
    [{ text: "🌐 Website", url: "https://github.com" }],
    [{ text: "👥 Hubungi Admin", callback_data: "hubungi_admin" }]
  ]
};

const CLASS_LIST = [
  "2D Illustration",
  "Live2D Rigging",
  "Manga Scriptwriting"
];

function buildClassList() {
  return `📖 *Pilihan Kelas:*\n${CLASS_LIST.map((item, index) => `${index + 1}. ${item}`).join("\n")}`;
}

function buildStartMessage() {
  return "Welcome to *Anime Digital School*! 🎓✨\n\nTempat belajar desain, coding, dan ilustrasi dengan gaya anime.";
}

async function handleRequest(request, env) {
  if (request.method !== "POST") {
    return new Response("OK", { status: 200 });
  }

  if (!env.BOT_TOKEN) {
    return new Response("Missing BOT_TOKEN", { status: 500 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return new Response("Invalid JSON payload", { status: 400 });
  }

  if (payload.message) {
    const chatId = payload.message.chat.id;
    const text = payload.message.text ?? "";

    if (text === "/start" || text === "/menu") {
      return sendMessage(env, chatId, buildStartMessage(), MENU_KEYBOARD);
    }

    if (text === "/help") {
      return sendMessage(env, chatId, "Gunakan /menu untuk melihat daftar kelas atau klik tombol di bawah.", MENU_KEYBOARD);
    }

    if (text.startsWith("/bc ")) {
      if (chatId.toString() !== env.ADMIN_ID) {
        return sendMessage(env, chatId, "❌ Kamu tidak punya akses untuk broadcast.");
      }

      const pesanBc = text.replace("/bc ", "").trim();
      if (!pesanBc) {
        return sendMessage(env, chatId, "⚠️ Format: /bc <pesan>");
      }

      // Catatan: Untuk broadcast ke banyak user, perlu database (KV Storage).
      // Ini adalah contoh respon sukses.
      return sendMessage(env, chatId, `📢 Pesan Broadcast dikirim: ${pesanBc}`);
    }
  }

  if (payload.callback_query) {
    const chatId = payload.callback_query.message.chat.id;
    const data = payload.callback_query.data;
    const callbackId = payload.callback_query.id;

    if (data === "list_kelas") {
      await answerCallbackQuery(env, callbackId);
      return sendMessage(env, chatId, buildClassList());
    }
    if (data === "cara_daftar") {
      await answerCallbackQuery(env, callbackId);
      return sendMessage(env, chatId, "Cara daftar:\n1. Pilih kelas\n2. Bayar via E-Wallet\n3. Konfirmasi ke @Admin");
    }
    if (data === "hubungi_admin") {
      await answerCallbackQuery(env, callbackId);
      return sendMessage(env, chatId, "Silahkan chat @UsernameAdmin Anda.");
    }

    await answerCallbackQuery(env, callbackId, "Menu tidak dikenal.");
  }

  return new Response("OK", { status: 200 });
}

async function sendMessage(env, chatId, text, replyMarkup = null) {
  const url = `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
    reply_markup: replyMarkup
  };

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

async function answerCallbackQuery(env, callbackId, text = "") {
  const url = `https://api.telegram.org/bot${env.BOT_TOKEN}/answerCallbackQuery`;
  const body = {
    callback_query_id: callbackId,
    text
  };

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  }
};
