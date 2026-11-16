# Undangan Pertunangan Citra & Dhika — Design Terpilih: Peach & Moss

Repo berisi **design undangan terpilih** (Peach & Moss, design 4) untuk acara pertunangan **Citra Ayu Kishardian Salsabila, S.H., M.H. & Ananda Dhika Fitdiyantama, S.Ikom.**

Design 1–3 (Rose Garden, Sky & Butter, Rose Gold Editorial) sudah diarsipkan lokal (di luar repo) dan **tidak dipublikasikan ke GitHub Pages**.

## Struktur

```
index.html                              → tautan ke design terpilih (Peach & Moss)
designs/
  design-4-peach-moss.html              → botani klasik, monogram C&D, RSVP Google Sheets, buku tamu
sheets/Code.gs                          → Apps Script: simpan RSVP ke Sheets + feed ucapan
preview/                                → screenshot design 4 (desktop + mobile)
reference/base-design-adhit-rahmah.html → design asal sebagai referensi (bukan bagian mockup)
```

## Data acara

| Item | Nilai |
|---|---|
| Jenis acara | Pertunangan (engagement) |
| Nama mempelai | CITRA AYU KISHARDIAN SALSABILA, S.H., M.H. & ANANDA DHIKA FITDIYANTAMA, S.IKOM. (kapital) |
| Tanggal | Sabtu, 26 Desember 2026 |
| Waktu | 13.30 WIB |
| Tempat | Bali World Hotel, Jl. Soekarno-Hatta No.713, Jatisari, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286 |
| Google Maps | https://maps.app.goo.gl/TAW5Nufp1EPWA2ff7?g_st=ic |
| Undangan personal | tambahkan `?to=Nama Tamu`, mis. `design-4-peach-moss.html?to=Bapak%20Budi` |

## Status mockup — yang belum produksi

- **Design 4** sudah punya kode sambungan RSVP → Google Sheets (`CONFIG.RSVP_ENDPOINT` di awal `<script>`), tapi **endpoint-nya masih kosong**, jadi sekarang masih mode mockup: form tidak mengirim data dan "Ucapan Terbaru" menampilkan contoh. Isi endpoint = langsung hidup (langkah di bawah).
- **Monogram** design 4 masih SVG sementara.
- **Font** diambil dari Google Fonts (butuh internet).

## Sambungkan RSVP design 4 ke Google Sheets

1. Buat Google Sheets baru, beri nama tab-nya `RSVP`.
2. **Extensions > Apps Script**, hapus isi `Code.gs`, tempel isi `sheets/Code.gs` dari repo ini.
3. **Deploy > New deployment > Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   Salin URL yang berakhiran `/exec`.
4. Buka `designs/design-4-peach-moss.html`, isi baris:
   `const CONFIG = { RSVP_ENDPOINT: "https://script.google.com/macros/s/XXXX/exec" };`
5. Simpan, buka halaman, kirim satu RSVP uji coba — baris baru harus muncul di sheet, dan ucapan yang diisi harus muncul di bagian "Ucapan Terbaru".

Yang dikirim: waktu, nama, konfirmasi, jumlah tamu, nomor HP, ucapan.
Yang dipublikasikan di halaman: **hanya nama + ucapan** (HP dan jumlah tamu tidak pernah dikirim ke browser, sesuai kebijakan tampilan publik).

Catatan: Apps Script butuh 1–2 menit untuk menyelesaikan deployment pertama; kalau halaman menampilkan "Gagal mengirim", tunggu sebentar lalu coba lagi.

## Kalau design final sudah siap (langkah produksi)

1. Salin `designs/design-4-peach-moss.html` menjadi satu halaman tersendiri (tanpa folder `designs/`).
2. Blok `<!-- ===== MOCKUP DESIGN SWITCHER ===== --> ... <!-- /MOCKUP DESIGN SWITCHER -->` sudah dihapus dari file ini.
3. Isi `CONFIG.RSVP_ENDPOINT` sesuai bagian "Sambungkan RSVP" di atas.
4. Ganti monogram/foto dengan aset dari klien bila sudah tersedia.
