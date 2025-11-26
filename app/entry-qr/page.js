'use client';

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParkingContext } from "../context/ParkingContext";
import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import BottomNav from "../components/BottomNav";

export default function EntryQRPage() {
    const router = useRouter();
    const { currentBooking, entryTime } = useParkingContext();
    const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds

    useEffect(() => {
        if (!currentBooking) {
            router.push('/map');
            return;
        }

        // Countdown timer
        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentBooking, router]);

    if (!currentBooking) {
        return null;
    }

    const qrData = JSON.stringify({
        type: 'entry',
        bookingId: currentBooking.id,
        location: currentBooking.location.name,
        slot: currentBooking.slot.id,
        timestamp: currentBooking.entryTime
    });

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div className="mobile-container">
            <header style={{ padding: '20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <div className="flex-between">
                    <Link href="/map">
                        <ArrowLeft size={24} color="var(--text-main)" />
                    </Link>
                    <h1 style={{ fontSize: '1.1rem', margin: 0 }}>Tiket Masuk</h1>
                    <div style={{ width: 24 }}></div>
                </div>
            </header>

            <div style={{ padding: '20px', paddingBottom: '100px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)' }}>

                {/* Timer Warning */}
                <div style={{
                    background: timeRemaining < 300 ? '#fef2f2' : 'rgba(255,255,255,0.2)',
                    color: timeRemaining < 300 ? '#991b1b' : 'white',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: '600'
                }}>
                    <Clock size={18} />
                    <span>Berlaku: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
                </div>

                <div style={{ background: 'white', padding: '30px', borderRadius: '24px', width: '100%', maxWidth: '300px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>Scan untuk Masuk</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        Tunjukkan QR Code ini pada scanner di gerbang masuk.
                    </p>

                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', marginBottom: '20px', display: 'inline-block' }}>
                        <QRCodeSVG
                            value={qrData}
                            size={180}
                            level="H"
                            includeMargin={false}
                        />
                    </div>

                    <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '20px', marginTop: '10px' }}>
                        <div className="flex-between" style={{ marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Lokasi</span>
                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{currentBooking.location.name}</span>
                        </div>
                        <div className="flex-between" style={{ marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Slot</span>
                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{currentBooking.slot.id}</span>
                        </div>
                        <div className="flex-between">
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Waktu Masuk</span>
                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                                {entryTime ? format(new Date(entryTime), 'HH:mm', { locale: id }) : '-'}
                            </span>
                        </div>
                    </div>
                </div>

                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '20px', fontSize: '0.875rem', textAlign: 'center', maxWidth: '300px' }}>
                    Tiket ini berlaku selama 15 menit. Silakan menuju lokasi parkir.
                </p>

                {/* Simulation Button */}
                <Link href="/exit-qr" className="btn" style={{ marginTop: '20px', background: 'white', color: 'var(--primary)', maxWidth: '300px' }}>
                    Simulasi: Selesai Parkir (Keluar)
                </Link>
            </div>

            <BottomNav active="qr" />
        </div>
    );
}
