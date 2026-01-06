// --- DATA PRODUK ---
export const PRODUCTS = {
  "ebook_anatomy": {
    title: "📘 Basic Anatomi Anime",
    price: "Rp 50.000",
    desc: "Panduan fundamental menggambar tubuh, wajah, dan ekspresi karakter anime dari nol.",
    image: "https://via.placeholder.com/300?text=Anatomi+Anime" // Bisa diganti link gambar asli
  },
  "ebook_coloring": {
    title: "🎨 Mastering Digital Coloring",
    price: "Rp 75.000",
    desc: "Tutorial shading, lighting, dan pemilihan palet warna agar art kamu terlihat 'hidup'.",
    image: "https://via.placeholder.com/300?text=Digital+Coloring"
  },
  "ebook_automation": {
    title: "🤖 Bot Automation for Creators",
    price: "Rp 120.000",
    desc: "Cara creator jualan karya otomatis 24 jam menggunakan Telegram Bot.",
    image: "https://via.placeholder.com/300?text=Bot+Automation"
  }
};

// --- KONFIGURASI LAIN ---
export const CONFIG = {
  official_link: "t.me/AnimeDigitalSchool",
  admin_username: "AdminADS",
  // Kata-kata yang akan auto-delete
  bad_words: ["scam", "penipu", "babi", "anjing", "tokai", "bodoh", "judi", "slot"]
};

// --- TEMPLATE PESAN ---
export const MESSAGES = {
  welcome: (name) => 
    `🎌 *Konnichiwa, ${name}-san!*\n\n` +
    `Selamat datang di **Anime Digital School Hub**.\n` +
    `Kami menyediakan resource terbaik untuk ilustrator digital & automation enthusiast.\n\n` +
    `👇 *Mau belajar apa hari ini?*`,
  
  payment: 
    `💳 *INVOICE PEMBAYARAN*\n\n` +
    `Silahkan transfer ke rekening official kami:\n` +
    `• *BCA:* \`123456789\` a/n Anime Digital School\n` +
    `• *DANA/OVO:* \`08123456789\`\n\n` +
    `📸 *Wajib:* Kirim bukti transfer ke @AdminADS untuk mendapatkan akses file.`,
  
  toxic_warning: (name) => 
    `⚠️ *Peringatan:* Jaga ketikanmu, ${name}-san! Disini dilarang toxic.`
};
