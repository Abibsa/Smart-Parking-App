import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ParkingProvider } from "./context/ParkingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Parking App",
  description: "Aplikasi parkir cerdas untuk kota masa depan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ParkingProvider>
          {children}
        </ParkingProvider>
      </body>
    </html>
  );
}
