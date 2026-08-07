# 🌿 EcoAir Dashboard

Dashboard monitoring cuaca, kualitas udara (AQI), dan indeks UV secara real-time. Dibangun dengan **React + Vite + Tailwind CSS**, memakai [Open-Meteo API](https://open-meteo.com/) yang 100% gratis dan tidak butuh API key.

## Fitur

- 📍 Deteksi lokasi otomatis lewat Geolocation browser (dengan reverse geocoding untuk nama kota)
- 🔍 Pencarian kota manual dengan autocomplete
- 🌬️ Indikator kualitas udara (US AQI) lengkap dengan strip gradien visual + saran aktivitas
- ☀️ Indeks UV harian dengan level & rekomendasi
- ⏱️ Prakiraan cuaca per jam (24 jam ke depan)
- 📅 Prakiraan 7 hari ke depan
- ⭐ Simpan lokasi favorit (disimpan di `localStorage`, tidak hilang saat refresh)

## Cara Menjalankan

```bash
# 1. Masuk ke folder project
cd ecoair-dashboard

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka browser ke `http://localhost:5173`.

## Build untuk Production

```bash
npm run build
npm run preview   # untuk preview hasil build
```

Hasil build ada di folder `dist/`, siap di-deploy ke Vercel, Netlify, GitHub Pages, dsb.

## Struktur Project

```
ecoair-dashboard/
├── src/
│   ├── api/
│   │   └── openMeteo.js         # Semua pemanggilan Open-Meteo API
│   ├── components/               # Komponen UI (Header, SearchBar, kartu2, dst)
│   ├── hooks/
│   │   ├── useGeolocation.js     # Wrapper Browser Geolocation API
│   │   └── useLocalStorage.js    # Sinkronisasi state <-> localStorage
│   ├── utils/
│   │   ├── weatherCodes.js       # Mapping kode cuaca WMO -> label & ikon
│   │   └── helpers.js            # Helper AQI, UV, format tanggal/jam
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Tentang API

Semua data diambil dari endpoint gratis Open-Meteo, tanpa perlu daftar atau API key:

- **Geocoding** — `https://geocoding-api.open-meteo.com/v1/search` (cari kota)
- **Reverse Geocoding** — `https://geocoding-api.open-meteo.com/v1/reverse` (koordinat -> nama kota)
- **Forecast** — `https://api.open-meteo.com/v1/forecast` (cuaca saat ini, per jam, 7 hari, UV index)
- **Air Quality** — `https://air-quality-api.open-meteo.com/v1/air-quality` (US AQI, PM2.5, PM10, ozon)

Dokumentasi lengkap: https://open-meteo.com/en/docs

## Kustomisasi

- **Lokasi default**: ubah `DEFAULT_LOCATION` di `src/App.jsx`.
- **Warna & tema**: edit token warna di `tailwind.config.js` (palet "space/dusk/indigo/mist/aurora/haze/ember").
- **Bahasa**: teks UI saat ini dalam Bahasa Indonesia; ubah string di masing-masing komponen dan `hourly`/`daily` locale di `helpers.js` bila ingin Bahasa Inggris.

## Catatan Teknis

- Tidak ada backend — semua fetch dilakukan langsung dari browser ke Open-Meteo (CORS sudah diizinkan oleh mereka).
- Favorit disimpan per-browser via `localStorage`, key: `ecoair:favorites`.
- Jika izin lokasi ditolak, aplikasi tetap bisa dipakai lewat pencarian kota manual.
