# Baswara Studio v2 — React + TypeScript (multi-page)

Vite + React 18 + TSX + React Router. Font di-host sendiri lewat `@fontsource-variable`
(Archivo dengan axis width, dan Newsreader), jadi tidak bergantung pada Google Fonts.

## Menjalankan
```bash
npm install
npm run dev
npm run build     # menghasilkan dist/ dan dist/404.html
npm run preview
```

## Halaman
| Route       | Isi                                                            |
|-------------|----------------------------------------------------------------|
| `/`         | Hero, pernyataan studio, karya pilihan, kategori layanan       |
| `/work`     | 12 foto + lightbox (keyboard, swipe)                           |
| `/services` | Daftar harga per kategori; klik baris -> form kontak terisi    |
| `/about`    | Cerita studio dan spesialisasi                                 |
| `/contact`  | Form yang membuka WhatsApp dengan pesan siap kirim, alamat, jam |

## Mengubah konten
Semua teks, harga, jam buka, dan daftar foto ada di `src/data/site.ts`.
Warna dan ukuran ada di variabel `:root` pada `src/styles/global.css`.
Item harga dengan `validUntil` otomatis hilang setelah tanggalnya lewat.

## Deploy
`public/CNAME` disertakan. `scripts/spa-fallback.mjs` menyalin `index.html` ke `404.html`
supaya URL langsung seperti `/services` bekerja di GitHub Pages. Di Netlify/Vercel
cukup atur rewrite semua path ke `index.html`.
