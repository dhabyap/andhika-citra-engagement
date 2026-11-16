# Undangan Pertunangan Citra & Dhika — 4 Pilihan Design

Repo berisi **4 alternatif design undangan** (mockup HTML statis, tanpa build tool) untuk
acara pertunangan **Citra Ayu Kishardian Salsabila, S.H., M.H. & Ananda Dhika Fitdiyantama, S.Ikom.**

## Struktur

```
index.html                              → galeri: kartu 4 design + pratinjau langsung
designs/
  design-1-rose-garden.html             → arch + script, floral, romantis
  design-2-sky-butter.html              → modern pastel blob, nama besar, marquee
  design-3-rose-gold-editorial.html     → editorial Bodoni, angka 01–04, minimal
  design-4-peach-moss.html              → botani klasik, monogram C&D, paling lengkap
sheets/Code.gs                          → Apps Script: simpan RSVP ke Sheets + feed ucapan
preview/                                → screenshot tiap bagian (desktop + mobile)
reference/base-design-adhit-rahmah.html → design asal sebagai referensi (bukan bagian mockup)
```

## Cara review (untuk klien)

1. Buka `index.html` — semua design tampak sebagai kartu dengan pratinjau langsung.
2. Klik satu design, atau tombol **Buka design** / **Tab baru**.
3. Di dalam setiap design ada **bar pemilih** melayang di bagian bawah: tombol angka
   **1 2 3 4** untuk pindah design, tombol **Galeri** untuk kembali ke halaman galeri.
   Di keyboard: tombol `1`–`4` pindah design, `G` kembali ke galeri.

## Data acara (sama di keempat design)

| Item | Nilai |
|---|---|
| Jenis acara | Pertunangan (engagement) |
| Nama mempelai | CITRA AYU KISHARDIAN SALSABILA, S.H., M.H. & ANANDA DHIKA FITDIYANTAMA, S.IKOM. (kapital) |
| Tanggal | Sabtu, 26 Desember 2026 |
| Waktu | 13.30 WIB |
| Tempat | Bali World Hotel, Jl. Soekarno-Hatta No.713, Jatisari, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286 |
| Google Maps | https://maps.app.goo.gl/TAW5Nufp1EPWA2ff7?g_st=ic |
| Undangan personal | tambahkan `?to=Nama Tamu`, mis. `design-1-rose-garden.html?to=Bapak%20Budi` |

## Status mockup — yang belum produksi

- **Nomor WhatsApp RSVP belum diisi.** Design 1–3 memakai tombol "Kirim via WhatsApp"
  (`const RSVP_WA=""` di dalam `<script>`); selama kosong, form menampilkan pesan
  "Nomor WhatsApp RSVP belum diatur."
- **Design 4** sudah punya kode sambungan RSVP → Google Sheets (`CONFIG.RSVP_ENDPOINT`
  di awal `<script>`), tapi **endpoint-nya masih kosong**, jadi sekarang masih mode mockup:
  form tidak mengirim data dan "Ucapan Terbaru" menampilkan contoh. Isi endpoint = langsung
  hidup (langkah di bawah).
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
5. Simpan, buka halaman, kirim satu RSVP uji coba — baris baru harus muncul di sheet,
   dan ucapan yang diisi harus muncul di bagian "Ucapan Terbaru".

Yang dikirim: waktu, nama, konfirmasi, jumlah tamu, nomor HP, ucapan.
Yang dipublikasikan di halaman: **hanya nama + ucapan** (HP dan jumlah tamu tidak pernah
dikirim ke browser, sesuai kebijakan tampilan publik).

Catatan: Apps Script butuh 1–2 menit untuk menyelesaikan deployment pertama; kalau halaman
menampilkan "Gagal mengirim", tunggu sebentar lalu coba lagi.

## Kalau satu design sudah dipilih (langkah produksi)

1. Salin file design terpilih menjadi satu halaman tersendiri (tanpa folder `designs/`).
2. Hapus blok `<!-- ===== MOCKUP DESIGN SWITCHER ===== --> ... <!-- /MOCKUP DESIGN SWITCHER -->`
   yang ada tepat sebelum `</body>` (berisi style bar, HTML bar, dan script-nya).
3. Isi `RSVP_WA` dengan nomor WhatsApp (format `62...`, tanpa `+`/`0`), atau — untuk
   design 4 — isi `CONFIG.RSVP_ENDPOINT` sesuai bagian "Sambungkan RSVP" di atas.
4. Ganti monogram/foto dengan aset dari klien bila sudah tersedia.
