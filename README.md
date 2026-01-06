# 🎌 Anime Digital School Bot (ADS-Bot)

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Cloudflare_Workers-orange)
![License](https://img.shields.io/badge/License-MIT-blue)
![Category](https://img.shields.io/badge/Category-E--commerce-red)

**Anime Digital School Bot** adalah sistem otomatisasi Telegram modular yang dirancang khusus untuk penjualan produk digital (E-book/Kursus) dan manajemen komunitas art. Dibangun di atas infrastruktur *serverless* Cloudflare Workers untuk memastikan kecepatan maksimal dan operasional 24/7 tanpa biaya hosting besar.

---

## 🚀 Fitur Unggulan

### 🛒 Digital Marketplace
* **Interactive Catalog**: Menu produk interaktif dengan detail harga dan deskripsi.
* **Streamlined Payment**: Alur instruksi pembayaran yang jelas untuk pembeli.
* **Modular Config**: Tambah/edit produk hanya melalui satu file konfigurasi (`src/config.js`).

### 🛡️ Smart Moderation (Community)
* **Anti-Link System**: Menghapus tautan eksternal secara otomatis untuk mencegah spam.
* **Anti-Toxic Filter**: Sensor kata-kata kasar/negatif secara real-time.
* **Auto-Welcome**: Menyapa member baru dengan pesan personal bertema anime.

### ⚙️ Developer Friendly
* **Modular Architecture**: Pemisahan antara Logika, API, dan Data.
* **Serverless Ready**: Tidak memerlukan VPS, cukup deploy ke Cloudflare.

---

## 📂 Struktur Project

```text
├── src/
│   ├── config.js         # Pengaturan Produk, Harga, & Kata Kasar
│   ├── telegram.js       # Helper API Telegram (Otot)
│   ├── handlers.js       # Logika Bisnis & Fitur (Otak)
│   └── index.js          # Main Entry Point
├── wrangler.toml         # Konfigurasi Cloudflare
└── LICENSE               # Lisensi MIT
