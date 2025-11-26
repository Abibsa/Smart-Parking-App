# Smart Parking App 🚗

Aplikasi parkir cerdas berbasis Next.js dengan tampilan modern dan interaktif untuk Smart City.

## ✨ Fitur Utama

### 1. **Autentikasi**
- Login dengan validasi form real-time
- Register dengan konfirmasi password
- Persistensi data user menggunakan localStorage

### 2. **Pencarian Lokasi Parkir**
- Peta interaktif dengan pin lokasi
- Search bar untuk mencari lokasi
- Informasi real-time: slot tersedia, harga, jarak
- Multiple lokasi parkir dengan data dinamis

### 3. **Pemilihan Slot Parkir**
- Grid view slot parkir per lantai
- Status real-time (Tersedia/Terisi)
- Filter berdasarkan lantai
- Visual indicator untuk slot tersedia
- Hover effects untuk interaksi yang lebih baik

### 4. **Pembayaran Digital**
- Multiple metode pembayaran (E-Wallet, QRIS, Kartu)
- Estimasi durasi parkir (1-5 jam)
- Kalkulasi harga otomatis
- Summary pembayaran lengkap
- Loading state saat processing

### 5. **QR Code Masuk & Keluar**
- **QR Code Real**: Menggunakan library qrcode.react
- **Entry QR**: 
  - Countdown timer 15 menit
  - Warning visual saat waktu hampir habis
  - Data booking terenkripsi dalam QR
- **Exit QR**: 
  - Kalkulasi durasi parkir otomatis
  - Total biaya berdasarkan waktu aktual
  - Animasi success payment

### 6. **Riwayat Transaksi**
- Daftar lengkap transaksi parkir
- Detail: lokasi, durasi, harga, metode pembayaran
- Format tanggal lokal Indonesia
- Empty state untuk user baru
- Data tersimpan di localStorage

## 🛠️ Teknologi

- **Framework**: Next.js 16 (App Router)
- **Styling**: Vanilla CSS dengan CSS Variables
- **Icons**: Lucide React
- **QR Code**: qrcode.react
- **Date Handling**: date-fns
- **State Management**: React Context API
- **Storage**: localStorage untuk persistensi data

## 🚀 Cara Menjalankan

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Buka Browser**
   ```
   http://localhost:3000
   ```

## 📱 Alur Aplikasi

1. **Landing Page** → Pilih Login/Register
2. **Login/Register** → Validasi form → Redirect ke Map
3. **Map** → Pilih lokasi parkir → Lihat detail → Klik "Lihat Slot"
4. **Slots** → Pilih lantai → Pilih slot tersedia → Redirect ke Payment
5. **Payment** → Pilih durasi → Pilih metode → Bayar → Redirect ke Entry QR
6. **Entry QR** → Scan QR di gate → Klik "Simulasi Keluar" → Redirect ke Exit QR
7. **Exit QR** → Lihat total biaya → Scan QR keluar → Lihat Riwayat
8. **History** → Lihat semua transaksi

## 🎨 Fitur Realistis

### State Management
- Context API untuk global state
- Data user, booking, dan history tersinkronisasi
- Automatic save ke localStorage

### Form Validation
- Email format validation
- Password strength check
- Confirm password matching
- Real-time error messages
- Visual feedback (border merah untuk error)

### Dynamic Data
- Slot parkir dengan status real-time
- Multiple lokasi dengan data berbeda
- Kalkulasi harga berdasarkan durasi aktual
- Timer countdown untuk entry ticket

### QR Code
- QR Code yang bisa di-scan (real QR, bukan icon)
- Data JSON terenkripsi di dalam QR
- Berbeda untuk entry dan exit
- Include booking ID, timestamp, location

### Animations & Transitions
- Smooth page transitions
- Hover effects pada cards dan buttons
- Loading states
- Success animations
- Slide-up animations

### UX Enhancements
- Empty states dengan call-to-action
- Loading indicators
- Disabled states untuk buttons
- Focus states untuk accessibility
- Responsive design (mobile-first)

## 📊 Data Structure

### User
```javascript
{
  id: string,
  name: string,
  email: string
}
```

### Booking
```javascript
{
  id: string,
  location: Location,
  slot: Slot,
  paymentMethod: string,
  entryTime: ISO string,
  exitTime: ISO string,
  duration: number (hours),
  totalPrice: number,
  status: 'active' | 'completed'
}
```

### Location
```javascript
{
  id: number,
  name: string,
  address: string,
  distance: number,
  availableSlots: number,
  totalSlots: number,
  price: number,
  floors: Floor[]
}
```

## 🎯 Best Practices

- **Component Reusability**: BottomNav component digunakan di semua halaman utama
- **Client-Side Rendering**: Menggunakan 'use client' untuk interaktivitas
- **Error Handling**: Redirect otomatis jika data tidak lengkap
- **Data Persistence**: localStorage untuk data yang tidak hilang saat refresh
- **Responsive Design**: Mobile-first dengan max-width container
- **Accessibility**: Focus states, semantic HTML, proper labels

## 📝 Notes

- Data parkir adalah mock data untuk demo
- QR Code bisa di-scan dengan QR scanner real
- Timer menggunakan real countdown (bukan simulasi)
- Kalkulasi harga menggunakan waktu aktual (date-fns)
- Semua form memiliki validasi real-time

## 🔮 Future Enhancements

- Integrasi dengan backend API
- Real-time slot updates via WebSocket
- Push notifications untuk reminder
- Payment gateway integration
- GPS tracking untuk navigasi
- Rating & review sistem
- Loyalty points
- Multi-language support

---

**Dibuat dengan ❤️ untuk Smart City Indonesia**
