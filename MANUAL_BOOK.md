# Buku Panduan Pengguna (User Manual)
# Smart Parking App

**Versi Dokumen:** 1.0  
**Tanggal:** 5 Desember 2025

---

## Daftar Isi

1.  [Pendahuluan](#1-pendahuluan)
2.  [Persyaratan Sistem](#2-persyaratan-sistem)
3.  [Instalasi dan Pemasangan](#3-instalasi-dan-pemasangan)
4.  [Menjalankan Aplikasi](#4-menjalankan-aplikasi)
5.  [Panduan Penggunaan](#5-panduan-penggunaan)
    *   [5.1 Registrasi Akun](#51-registrasi-akun)
    *   [5.2 Login](#52-login)
    *   [5.3 Mencari Lokasi Parkir](#53-mencari-lokasi-parkir)
    *   [5.4 Memilih Slot Parkir](#54-memilih-slot-parkir)
    *   [5.5 Pembayaran](#55-pembayaran)
    *   [5.6 Masuk Area Parkir (Check-In)](#56-masuk-area-parkir-check-in)
    *   [5.7 Keluar Area Parkir (Check-Out)](#57-keluar-area-parkir-check-out)
    *   [5.8 Melihat Riwayat Transaksi](#58-melihat-riwayat-transaksi)
6.  [Pemecahan Masalah](#6-pemecahan-masalah)

---

## 1. Pendahuluan

**Smart Parking App** adalah aplikasi berbasis web modern yang dirancang untuk memudahkan pengguna dalam mencari, memesan, dan membayar parkir secara digital. Aplikasi ini mendukung konsep *Smart City* dengan fitur-fitur seperti pemantauan slot real-time, pembayaran non-tunai, dan sistem tiket berbasis QR Code.

### Fitur Utama:
*   **Pencarian Lokasi:** Menemukan lokasi parkir terdekat dengan informasi slot tersedia.
*   **Booking Slot:** Memilih lantai dan nomor slot parkir secara spesifik.
*   **Pembayaran Digital:** Mendukung berbagai metode pembayaran (E-Wallet, QRIS, Kartu).
*   **Sistem QR Code:** Check-in dan check-out mudah menggunakan scan QR.
*   **Riwayat:** Mencatat semua aktivitas parkir pengguna.

---

## 2. Persyaratan Sistem

Sebelum melakukan instalasi, pastikan komputer Anda memenuhi persyaratan berikut:

*   **Sistem Operasi:** Windows 10/11, macOS, atau Linux.
*   **Node.js:** Versi 18.17.0 atau yang lebih baru (Disarankan versi LTS terbaru).
*   **Package Manager:** npm (biasanya sudah terinstal bersama Node.js).
*   **Web Browser:** Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari (versi terbaru).
*   **Koneksi Internet:** Diperlukan untuk mengunduh *dependencies* saat instalasi.

---

## 3. Instalasi dan Pemasangan

Ikuti langkah-langkah berikut untuk memasang aplikasi di komputer lokal Anda:

### Langkah 1: Ekstrak/Unduh Kode Sumber
Pastikan Anda memiliki folder proyek `smart-parking`. Jika file dalam bentuk ZIP, ekstrak terlebih dahulu ke lokasi yang mudah diakses (contoh: `D:\Projects\smart-parking`).

### Langkah 2: Buka Terminal
1.  Buka aplikasi terminal (Command Prompt, PowerShell, atau Terminal di VS Code).
2.  Arahkan direktori ke folder proyek. Contoh:
    ```bash
    cd "d:\Semester 5\Interaksi Manusia dan Komputer\UAS\Smart Parking App\smart-parking"
    ```

### Langkah 3: Instalasi Dependencies
Jalankan perintah berikut untuk mengunduh dan menginstal semua pustaka yang dibutuhkan aplikasi:

```bash
npm install
```

*Tunggu hingga proses instalasi selesai. Pastikan tidak ada pesan error berwarna merah. Jika ada peringatan (warning), biasanya dapat diabaikan.*

---

## 4. Menjalankan Aplikasi

Setelah instalasi berhasil, Anda dapat menjalankan aplikasi dalam mode pengembangan (*development mode*).

1.  Di terminal (pastikan masih di dalam folder proyek), jalankan perintah:
    ```bash
    npm run dev
    ```

2.  Terminal akan menampilkan pesan seperti:
    ```
    Ready in [waktu] ms
    - Local: http://localhost:3000
    ```

3.  Buka browser Anda dan kunjungi alamat: **http://localhost:3000**

Aplikasi sekarang sudah berjalan dan siap digunakan.

---

## 5. Panduan Penggunaan

### 5.1 Registrasi Akun
1.  Pada halaman awal (Landing Page), klik tombol **"Mulai Sekarang"** atau **"Register"**.
2.  Isi formulir pendaftaran:
    *   **Nama Lengkap:** Masukkan nama Anda.
    *   **Email:** Masukkan alamat email yang valid.
    *   **Password:** Buat kata sandi yang aman.
    *   **Konfirmasi Password:** Ulangi kata sandi tersebut.
3.  Klik tombol **"Daftar"**.
4.  Jika berhasil, Anda akan diarahkan ke halaman Login atau langsung masuk ke menu utama.

### 5.2 Login
1.  Jika Anda sudah memiliki akun, klik tombol **"Masuk"** di halaman awal.
2.  Masukkan **Email** dan **Password** yang terdaftar.
3.  Klik tombol **"Masuk"**.

### 5.3 Mencari Lokasi Parkir
1.  Setelah login, Anda akan melihat halaman **Peta (Map)**.
2.  Gunakan kolom pencarian di bagian atas untuk mencari nama gedung atau lokasi.
3.  Klik pada pin lokasi di peta atau daftar lokasi di bawah untuk melihat detail (Harga per jam, Jarak, Slot Tersedia).
4.  Klik tombol **"Lihat Slot"** untuk melanjutkan pemesanan.

### 5.4 Memilih Slot Parkir
1.  Pilih **Lantai** yang diinginkan (Lantai 1, Lantai 2, dst).
2.  Perhatikan status slot:
    *   **Kotak Hijau/Biru:** Slot Kosong (Bisa dipilih).
    *   **Kotak Merah/Abu-abu:** Slot Terisi (Tidak bisa dipilih).
3.  Klik pada salah satu slot kosong.
4.  Klik tombol **"Booking Slot Ini"** untuk melanjutkan.

### 5.5 Pembayaran
1.  Pilih **Durasi Parkir** (estimasi waktu parkir Anda, misal: 2 Jam).
2.  Pilih **Metode Pembayaran** (DANA, OVO, GoPay, atau Kartu Kredit).
3.  Sistem akan menghitung total biaya secara otomatis.
4.  Klik tombol **"Bayar Sekarang"**.
5.  Tunggu proses verifikasi pembayaran selesai.

### 5.6 Masuk Area Parkir (Check-In)
1.  Setelah pembayaran berhasil, Anda akan mendapatkan **QR Code Masuk (Entry QR)**.
2.  Arahkan QR Code ini ke mesin scanner di gerbang masuk parkir (Simulasi: Klik tombol scan atau biarkan timer berjalan).
3.  **PENTING:** QR Code ini memiliki batas waktu (biasanya 15 menit). Segera lakukan scan sebelum kadaluarsa.

### 5.7 Keluar Area Parkir (Check-Out)
1.  Saat ingin keluar parkir, buka kembali aplikasi.
2.  Masuk ke menu **Tiket Aktif** atau ikuti alur setelah Check-In.
3.  Klik tombol **"Keluar Parkir"** atau **"Simulasi Keluar"**.
4.  Sistem akan menghitung durasi aktual. Jika ada kelebihan waktu, mungkin ada biaya tambahan (tergantung kebijakan).
5.  Tunjukkan **QR Code Keluar (Exit QR)** ke scanner gerbang keluar.

### 5.8 Melihat Riwayat Transaksi
1.  Klik menu **Riwayat** (ikon jam/kertas) di navigasi bawah.
2.  Anda dapat melihat daftar semua parkir yang pernah dilakukan beserta detail tanggal, lokasi, dan biaya.

---

## 6. Pemecahan Masalah

### Aplikasi tidak bisa dibuka (Localhost refused to connect)
*   Pastikan Anda sudah menjalankan perintah `npm run dev` di terminal.
*   Pastikan terminal tidak ditutup selama penggunaan aplikasi.

### Gagal Login atau Register
*   Periksa kembali format email (harus mengandung @ dan domain).
*   Pastikan password dan konfirmasi password sama.
*   Coba refresh halaman browser.

### Peta tidak muncul
*   Pastikan koneksi internet Anda aktif (diperlukan untuk memuat gambar peta).

### QR Code tidak muncul
*   Coba kembali ke halaman sebelumnya dan masuk lagi.
*   Pastikan pembayaran sudah berstatus "Berhasil".

---

## 7. Navigasi Aplikasi

### Menu Utama (Bottom Navigation)
Aplikasi dilengkapi dengan navigasi bawah yang memudahkan akses ke fitur-fitur utama:

*   **🏠 Home:** Halaman utama/dashboard.
*   **🗺️ Map:** Pencarian lokasi parkir.
*   **📋 History:** Riwayat transaksi parkir.
*   **⚙️ Settings:** Pengaturan akun dan preferensi.

### Fitur Tambahan

#### Pengaturan (Settings)
1.  Klik ikon **Settings** di navigasi bawah.
2.  Anda dapat mengakses:
    *   **Profil:** Lihat dan edit informasi akun.
    *   **Bahasa:** Pilih bahasa aplikasi (jika tersedia).
    *   **Notifikasi:** Atur preferensi pemberitahuan.
    *   **Bantuan:** Akses panduan dan FAQ.
    *   **Kebijakan Privasi:** Baca kebijakan penggunaan data.

#### Profil Pengguna
*   Lihat informasi akun Anda (Nama, Email).
*   Edit data profil jika diperlukan.
*   Logout dari akun.

---

## 8. Tips Penggunaan

### Untuk Pengalaman Terbaik:
1.  **Booking di Muka:** Lakukan booking sebelum berangkat untuk memastikan slot tersedia.
2.  **Perhatikan Timer:** QR Code masuk memiliki batas waktu, segera lakukan check-in.
3.  **Simpan Tiket:** Jangan tutup aplikasi sebelum check-out selesai.
4.  **Cek Riwayat:** Gunakan menu History untuk melacak pengeluaran parkir bulanan.

### Keamanan:
*   Jangan bagikan QR Code Anda kepada orang lain.
*   Logout setelah selesai menggunakan aplikasi di perangkat publik.
*   Gunakan password yang kuat saat registrasi.

---

## 9. FAQ (Pertanyaan yang Sering Diajukan)

**Q: Apakah saya harus membayar untuk menggunakan aplikasi ini?**  
A: Aplikasi ini gratis untuk diunduh dan digunakan. Anda hanya membayar biaya parkir sesuai tarif lokasi.

**Q: Apakah data saya aman?**  
A: Ya, data Anda disimpan secara lokal di browser Anda (localStorage). Untuk versi produksi, data akan dienkripsi dan disimpan di server yang aman.

**Q: Bagaimana jika saya lupa password?**  
A: Klik link "Lupa Password" di halaman login, kemudian ikuti instruksi untuk reset password melalui email.

**Q: Apakah bisa booking untuk orang lain?**  
A: Ya, Anda bisa booking slot dan memberikan QR Code kepada orang yang akan menggunakan parkir tersebut.

**Q: Bagaimana jika saya parkir lebih lama dari durasi yang dibooking?**  
A: Sistem akan menghitung durasi aktual saat check-out. Jika melebihi, akan ada biaya tambahan yang otomatis dihitung.

**Q: Apakah aplikasi ini bisa digunakan offline?**  
A: Sebagian fitur memerlukan koneksi internet (peta, pembayaran). Namun QR Code yang sudah di-generate bisa digunakan offline.

**Q: Metode pembayaran apa saja yang didukung?**  
A: Saat ini mendukung E-Wallet (DANA, OVO, GoPay), QRIS, dan Kartu Kredit/Debit.

---

## 10. Informasi Teknis (Untuk Developer)

### Teknologi yang Digunakan:
*   **Framework:** Next.js 16 (React 19)
*   **Styling:** CSS Modules + Global CSS
*   **State Management:** React Context API
*   **QR Code:** qrcode.react library
*   **Icons:** Lucide React
*   **Date Handling:** date-fns

### Build untuk Production:
Jika ingin membuat versi production (untuk deploy):
```bash
npm run build
npm start
```

### Environment Variables:
Untuk konfigurasi tambahan, buat file `.env.local` di root folder:
```
NEXT_PUBLIC_API_URL=https://api.smartparking.id
NEXT_PUBLIC_MAPS_API_KEY=your_maps_api_key
```

---

## 11. Troubleshooting Lanjutan

### Error: "Module not found"
*   Pastikan semua dependencies sudah terinstall dengan benar.
*   Coba hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan `npm install` lagi.

### Aplikasi lambat atau lag
*   Tutup tab browser lain yang tidak diperlukan.
*   Clear cache browser (Ctrl + Shift + Delete).
*   Restart development server (`Ctrl + C` di terminal, lalu `npm run dev` lagi).

### Data hilang setelah refresh
*   Periksa apakah browser dalam mode Incognito/Private (localStorage tidak persisten di mode ini).
*   Pastikan browser tidak memblokir localStorage (cek Settings > Privacy).

### QR Code tidak bisa di-scan
*   Pastikan QR Code ditampilkan dengan jelas (tidak blur).
*   Gunakan aplikasi QR Scanner yang mendukung format QR Code standar.
*   Coba screenshot QR Code dan scan dari galeri.

### Slot yang dipilih tiba-tiba terisi
*   Ini bisa terjadi jika ada pengguna lain yang booking di waktu bersamaan.
*   Coba pilih slot lain atau refresh halaman untuk update status terbaru.

---

## 12. Kontak dan Dukungan

**Butuh Bantuan Lebih Lanjut?**

📧 **Email:** support@smartparking.id  
📱 **WhatsApp:** +62 812-3456-7890  
🌐 **Website:** www.smartparking.id  
💬 **Live Chat:** Tersedia di aplikasi (Menu Help)

**Jam Operasional Support:**  
Senin - Jumat: 08.00 - 17.00 WIB  
Sabtu: 09.00 - 15.00 WIB  
Minggu & Libur: Tutup

---

## Lampiran

### A. Glosarium
*   **QR Code:** Quick Response Code, kode batang 2D yang dapat di-scan.
*   **Check-In:** Proses masuk ke area parkir.
*   **Check-Out:** Proses keluar dari area parkir.
*   **Slot:** Tempat parkir individual untuk satu kendaraan.
*   **E-Wallet:** Dompet digital (DANA, OVO, GoPay, dll).

### B. Shortcut Keyboard (Desktop)
*   `Ctrl + K` - Buka pencarian cepat
*   `Ctrl + H` - Buka halaman History
*   `Ctrl + M` - Buka halaman Map
*   `Esc` - Tutup modal/popup

### C. Changelog (Riwayat Versi)
**Versi 1.0.0** (5 Desember 2025)
*   ✅ Fitur Login & Register
*   ✅ Pencarian lokasi parkir
*   ✅ Booking slot real-time
*   ✅ Pembayaran digital
*   ✅ QR Code check-in/out
*   ✅ Riwayat transaksi

---

**© 2025 Smart Parking App - Solusi Parkir Cerdas untuk Smart City Indonesia**

*Dokumen ini dibuat untuk keperluan akademis (UAS Interaksi Manusia dan Komputer)*
