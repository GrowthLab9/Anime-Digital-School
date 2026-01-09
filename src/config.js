export const CONFIG = {
  welcomeMessage:
    "Welcome to *Anime Digital School*! 🎓✨\n\nTempat belajar desain, coding, dan ilustrasi dengan gaya anime.",
  classList: ["2D Illustration", "Live2D Rigging", "Manga Scriptwriting"],
  registrationSteps: [
    "Pilih kelas",
    "Bayar via E-Wallet",
    "Konfirmasi ke @Admin"
  ],
  adminUsername: "UsernameAdmin",
  websiteUrl: "https://github.com",
  startButtons: [
    [{ text: "📚 Daftar Kelas", callback_data: "list_kelas" }],
    [{ text: "📝 Cara Daftar", callback_data: "cara_daftar" }],
    [{ text: "🌐 Website", url: "WEBSITE_URL" }],
    [{ text: "👥 Hubungi Admin", callback_data: "hubungi_admin" }]
  ]
};
