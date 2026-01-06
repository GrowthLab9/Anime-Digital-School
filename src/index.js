/**
 * ANIME DIGITAL SCHOOL - ULTIMATE SINGLE FILE VERSION
 * Built for Cloudflare Workers
 */

// --- 1. CONFIGURATION & DATABASE ---
const CONFIG = {
  official_link: "t.me/AnimeDigitalSchool",
  admin_username: "AdminADS",
  bad_words: ["scam", "penipu", "judi", "slot", "anjing", "babi"]
};

const PRODUCTS = {
  "ebook_anatomy": {
    title: "📘 Basic Anatomi Anime",
    price: "Rp 50.000",
    desc: "Dasar-dasar menggambar anatomi karakter anime dari nol untuk pemula."
  },
  "ebook_coloring": {
    title: "🎨 Mastering Digital Coloring",
    price: "Rp 75.000",
    desc: "Teknik shading, lighting, dan pemilihan warna profesional."
  },
  "ebook_automation": {
    title: "🤖 Bot Automation Creator",
    price: "Rp 120.000",
    desc: "Cara jualan otomatis di Telegram tanpa harus standby 24 jam."
  }
};

const MESSAGES = {
  welcome: (name) => `🎌 *Konnichiwa, ${name}-san!*\n\nSelamat datang di **Anime Digital School Hub**.\nSilahkan jelajahi materi terbaik kami di bawah ini:`,
  payment: `💳 *INVOICE PEMBAYARAN*\n\nSilahkan transfer ke:\n• *BCA:* \`123456789\`\n• *DANA:* \`08123456789\`\n\n📸 Kirim bukti ke @AdminADS untuk akses file.`,
  faq: `❓ *FAQ - ADS*\n\n1. *Ebook dikirim lewat apa?*\nLink akses dikirim langsung via Telegram.\n\n2. *Apakah ada grup diskusi?*\nYa, setiap pembeli dapat akses ke grup private.`
};

// --- 2. MAIN WORKER HANDLER ---
export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("ADS Bot is Active 🚀");
    }

    try {
      const payload = await request.json();
      
      // Handle Pesan (Message)
      if (payload.message) {
        return await handleMessage(payload.message, env);
      }
      
      // Handle Klik Tombol (Callback Query)
      if (payload.callback_query) {
        return await handleCallback(payload.callback_query, env);
      }

    } catch (e) {
      console.error(e);
    }
    return new Response("OK");
  }
};

// --- 3. LOGIC HANDLERS ---

async function handleMessage(msg, env) {
  const chatId = msg.chat.id;
  const text = msg.text || "";
  const user = msg.from;
  const adminId = env.ADMIN_ID;

  // MODERASI GRUP
  if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
    // Anti-Link
    if (msg.entities?.some(e => e.type === "url" || e.type === "text_link")) {
      if (!text.includes(CONFIG.official_link) && user.id.toString() !== adminId) {
        await callTelegram("deleteMessage", { chat_id: chatId, message_id: msg.message_id }, env);
        return;
      }
    }
    // Anti-Toxic
    if (CONFIG.bad_words.some(word => text.toLowerCase().includes(word))) {
      await callTelegram("deleteMessage", { chat_id: chatId, message_id: msg.message_id }, env);
      return;
    }
  }

  // COMMANDS
  if (text === "/start") {
    const kb = {
      inline_keyboard: [
        [{ text: "📚 Katalog Ebook", callback_data: "menu_katalog" }],
        [{ text: "💳 Pembayaran", callback_data: "menu_bayar" }, { text: "❓ FAQ", callback_data: "menu_faq" }],
        [{ text: "📞 Admin ADS", url: `https://t.me/${CONFIG.admin_username}` }]
      ]
    };
    return await callTelegram("sendMessage", { chat_id: chatId, text: MESSAGES.welcome(user.first_name), reply_markup: kb, parse_mode: "Markdown" }, env);
  }
}

async function handleCallback(query, env) {
  const chatId = query.message.chat.id;
  const msgId = query.message.message_id;
  const data = query.data;

  await callTelegram("answerCallbackQuery", { callback_query_id: query.id }, env);

  if (data === "menu_katalog") {
    const buttons = Object.keys(PRODUCTS).map(key => ([{ text: PRODUCTS[key].title, callback_data: key }]));
    buttons.push([{ text: "🔙 Menu Utama", callback_data: "menu_home" }]);
    return await callTelegram("editMessageText", { chat_id: chatId, message_id: msgId, text: "📖 *KATALOG EBOOK:*", reply_markup: { inline_keyboard: buttons }, parse_mode: "Markdown" }, env);
  }

  if (data === "menu_home") {
    const kb = {
      inline_keyboard: [
        [{ text: "📚 Katalog Ebook", callback_data: "menu_katalog" }],
        [{ text: "💳 Pembayaran", callback_data: "menu_bayar" }, { text: "❓ FAQ", callback_data: "menu_faq" }]
      ]
    };
    return await callTelegram("editMessageText", { chat_id: chatId, message_id: msgId, text: MESSAGES.welcome(query.from.first_name), reply_markup: kb, parse_mode: "Markdown" }, env);
  }

  if (data === "menu_bayar") {
    return await callTelegram("sendMessage", { chat_id: chatId, text: MESSAGES.payment, parse_mode: "Markdown" }, env);
  }

  if (data === "menu_faq") {
    return await callTelegram("sendMessage", { chat_id: chatId, text: MESSAGES.faq, parse_mode: "Markdown" }, env);
  }

  // Detail Produk
  if (PRODUCTS[data]) {
    const p = PRODUCTS[data];
    const text = `📂 *DETAIL PRODUK*\n\n🏷 *${p.title}*\n💰 *Harga:* ${p.price}\n\n📝 ${p.desc}`;
    const kb = {
      inline_keyboard: [
        [{ text: "✅ Beli Sekarang", callback_data: "menu_bayar" }],
        [{ text: "🔙 Kembali", callback_data: "menu_katalog" }]
      ]
    };
    return await callTelegram("editMessageText", { chat_id: chatId, message_id: msgId, text: text, reply_markup: kb, parse_mode: "Markdown" }, env);
  }
}

// --- 4. TELEGRAM API CALLER ---
async function callTelegram(method, body, env) {
  return fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
        }
