# Smart Parking App 🚗
> **UAS Interaksi Manusia dan Komputer (IMK)**
> Semester 5 - Smart City Solution

Aplikasi parkir cerdas berbasis web yang dirancang untuk memberikan pengalaman parkir yang seamless, modern, dan efisien. Dibangun menggunakan teknologi web terbaru untuk memenuhi standar antarmuka pengguna (UI) dan pengalaman pengguna (UX) yang baik.

---

## 📋 Daftar Isi
- [Tentang Proyek](#-tentang-proyek)
- [Fitur Unggulan](#-fitur-unggulan)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Folder](#-struktur-folder)
- [Instalasi dan Menjalankan](#-instalasi-dan-menjalankan)
- [Panduan Penggunaan Singkat](#-panduan-penggunaan-singkat)
- [Data & State Management](#-data--state-management)
- [Pengembang](#-pengembang)

---

## 📖 Tentang Proyek

Smart Parking App adalah solusi digital untuk mengatasi masalah pencarian parkir di area perkotaan. Aplikasi ini memungkinkan pengguna untuk:
1.  Mencari lokasi parkir terdekat.
2.  Melihat ketersediaan slot secara *real-time*.
3.  Melakukan reservasi (booking) slot parkir.
4.  Melakukan pembayaran non-tunai.
5.  Masuk dan keluar area parkir menggunakan teknologi QR Code.

Proyek ini dibuat untuk memenuhi tugas **Ujian Akhir Semester (UAS)** mata kuliah **Interaksi Manusia dan Komputer**, dengan fokus pada desain antarmuka yang intuitif dan kemudahan interaksi pengguna.

---

## ✨ Fitur Unggulan

### 1. Autentikasi Pengguna
- **Register & Login**: Sistem akun yang aman dengan validasi form lengkap.
- **User Session**: Penyimpanan sesi pengguna agar tidak perlu login berulang kali (menggunakan `localStorage`).

### 2. Peta & Lokasi (Maps)
- **Interactive Map**: Tampilan peta visual untuk melihat lokasi gedung parkir.
- **Detail Lokasi**: Informasi lengkap mengenai jarak, harga per jam, dan total slot tersedia.

### 3. Manajemen Slot Parkir
- **Visualisasi Slot**: Tampilan denah parkir yang realistis (Grid View).
- **Status Indikator**: Pembedaan warna jelas untuk slot Kosong (Hijau) dan Terisi (Merah).
- **Multi-floor**: Dukungan untuk gedung parkir bertingkat.

### 4. Sistem Pembayaran & Tiket
- **Simulasi Payment Gateway**: Mendukung berbagai metode (E-Wallet, QRIS, Kartu).
- **QR Code Entry/Exit**: Generate QR Code unik yang mengenkripsi data booking untuk keamanan.
- **Timer Mundur**: Batas waktu check-in untuk mencegah booking palsu.

### 5. Riwayat & Laporan
- **History Transaksi**: Rekapitulasi penggunaan parkir lengkap dengan tanggal dan biaya.
- **Status Booking**: Pelacakan status aktif atau selesai.

---

## 🛠 Teknologi yang Digunakan

- **Frontend Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: CSS Modules & Global CSS (Responsive Design)
- **Icons**: [Lucide React](https://lucide.dev/)
- **QR Code**: `qrcode.react` untuk generate QR dinamis.
- **Date/Time**: `date-fns` untuk manipulasi waktu yang akurat.
- **State Management**: React Context API (`AuthContext`, `BookingContext`).

---

## 📂 Struktur Folder

Berikut adalah struktur direktori utama proyek ini:

```bash
smart-parking/
├── app/
│   ├── components/      # Komponen UI reusable (Button, Card, Navbar, dll)
│   ├── context/         # Global State (Auth, Booking)
│   ├── data/            # Mock Data (Lokasi parkir, user dummy)
│   ├── entry-qr/        # Halaman QR Code Masuk
│   ├── exit-qr/         # Halaman QR Code Keluar
│   ├── home/            # Halaman Dashboard Utama
│   ├── login/           # Halaman Login
│   ├── map/             # Halaman Pencarian Lokasi
│   ├── payment/         # Halaman Pembayaran
│   ├── slots/           # Halaman Pemilihan Slot
│   ├── utils/           # Fungsi bantuan (Formatter harga, waktu)
│   ├── globals.css      # Style global & variabel warna
│   ├── layout.js        # Layout utama aplikasi
│   └── page.js          # Landing Page
├── public/              # Aset statis (Gambar, Icon)
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Instalasi dan Menjalankan

Ikuti langkah-langkah ini untuk menjalankan aplikasi di komputer lokal Anda:

### Prasyarat
- **Node.js** (Versi 18 atau terbaru disarankan)
- **npm** (Bawaan Node.js)

### Langkah-langkah

1.  **Clone atau Download Project**
    Pastikan Anda berada di folder root proyek `smart-parking`.

2.  **Install Dependencies**
    Buka terminal dan jalankan perintah:
    ```bash
    npm install
    ```

3.  **Jalankan Development Server**
    Mulai server lokal dengan perintah:
    ```bash
    npm run dev
    ```

4.  **Akses Aplikasi**
    Buka browser (Chrome/Edge/Firefox) dan kunjungi:
    ```
    http://localhost:3000
    ```

---

## 📱 Panduan Penggunaan Singkat

1.  **Mulai**: Buka aplikasi, klik **"Mulai Sekarang"**.
2.  **Akun**: Daftar akun baru atau login jika sudah punya.
3.  **Cari Parkir**: Pilih lokasi parkir dari peta yang tersedia.
4.  **Pilih Slot**: Pilih lantai dan nomor slot yang berwarna hijau (kosong).
5.  **Bayar**: Tentukan durasi dan metode pembayaran, lalu selesaikan transaksi.
6.  **Check-In**: Tunjukkan QR Code yang muncul saat tiba di gerbang masuk.
7.  **Check-Out**: Saat selesai, masuk ke menu tiket dan lakukan proses keluar (scan QR keluar).

---

## 💾 Data & State Management

Aplikasi ini menggunakan **Client-Side Storage** (`localStorage`) untuk mensimulasikan database.
- Data user, booking aktif, dan riwayat transaksi **TIDAK AKAN HILANG** saat browser di-refresh.
- Untuk mereset data (menghapus semua riwayat), Anda dapat menghapus *Local Storage* melalui Developer Tools browser (Application > Local Storage > Clear).

---

## 👨‍💻 Pengembang

**Nama Mahasiswa**  
*Mahasiswa Semester 5 - Teknik Informatika / Sistem Informasi*  
*Mata Kuliah: Interaksi Manusia dan Komputer*

---
*Dibuat dengan ❤️ menggunakan Next.js*
