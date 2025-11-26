'use client';

import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParkingContext } from "../context/ParkingContext";
import { QRCodeSVG } from "qrcode.react";
import { format, differenceInMinutes } from "date-fns";
import { id } from "date-fns/locale";
import BottomNav from "../components/BottomNav";

export default function ExitQRPage() {
    const router = useRouter();
    const { currentBooking, entryTime, completeBooking } = useParkingContext();
    const [completedBooking, setCompletedBooking] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!currentBooking && !completedBooking) {
            router.push('/map');
            return;
        }

        if (currentBooking && !completedBooking) {
            // Complete the booking
            const completed = completeBooking();
            setCompletedBooking(completed);
            setShowSuccess(true);

            // Hide success animation after 2 seconds
            setTimeout(() => setShowSuccess(false), 2000);
        }
    }, [currentBooking, completedBooking, completeBooking, router]);

    if (!completedBooking) {
        return (
            <div className="mobile-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="spinner" style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid var(--border)',
                        borderTop: '4px solid var(--primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <p>Memproses pembayaran...</p>
                </div>
            </div>
        );
    }

    const qrData = JSON.stringify({
        type: 'exit',
        bookingId: completedBooking.id,
        location: completedBooking.location.name,
        slot: completedBooking.slot.id,
        totalPrice: completedBooking.totalPrice,
        timestamp: completedBooking.exitTime
    });

    const actualDuration = differenceInMinutes(
        new Date(completedBooking.exitTime),
        new Date(completedBooking.entryTime)
    );

    return (
        <div className="mobile-container">
            <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>

            <header style={{ padding: '20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <div className="flex-between">
                    <Link href="/map">
                        <ArrowLeft size={24} color="var(--text-main)" />
                    </Link>
                    <h1 style={{ fontSize: '1.1rem', margin: 0 }}>Tiket Keluar</h1>
                    <div style={{ width: 24 }}></div>
                </div>
            </header>

            <div style={{ padding: '20px', paddingBottom: '100px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>

                {showSuccess && (
                    <div className="slide-up" style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: '#dcfce7',
                            color: '#166534',
                            marginBottom: '10px',
                            animation: 'slideUp 0.5s ease-out'
                        }}>
                            <CheckCircle size={48} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', color: '#166534', marginBottom: '5px' }}>Pembayaran Berhasil</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Terima kasih telah menggunakan Smart Parking</p>
                    </div>
                )}

                {!showSuccess && (
                    <div className="slide-up" style={{ marginBottom: '20px', textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: '#dcfce7',
                            color: '#166534',
                            marginBottom: '10px'
                        }}>
                            <CheckCircle size={32} />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', color: '#166534', marginBottom: '5px' }}>Pembayaran Berhasil</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Silakan scan QR ini di pintu keluar.</p>
                    </div>
                )}

                <div className="slide-up" style={{ background: 'var(--surface)', padding: '30px', borderRadius: '24px', width: '100%', maxWidth: '300px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid var(--border)' }}>
                    <div style={{ background: 'var(--background)', padding: '20px', borderRadius: '16px', marginBottom: '20px', display: 'inline-block' }}>
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
                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{completedBooking.location.name}</span>
                        </div>
                        <div className="flex-between" style={{ marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Slot</span>
                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>{completedBooking.slot.id}</span>
                        </div>
                        <div className="flex-between" style={{ marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Durasi</span>
                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                                {actualDuration < 60 ? `${actualDuration} menit` : `${Math.ceil(actualDuration / 60)} jam`}
                            </span>
                        </div>
                        <div className="flex-between" style={{ marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Waktu Keluar</span>
                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                                {format(new Date(completedBooking.exitTime), 'HH:mm', { locale: id })}
                            </span>
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', marginTop: '15px', paddingTop: '15px' }}>
                            <div className="flex-between">
                                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Total Bayar</span>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)' }}>
                                    Rp {completedBooking.totalPrice.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <Link href="/history" className="btn btn-primary" style={{ marginTop: '30px', maxWidth: '300px' }}>
                    Lihat Riwayat
                </Link>
            </div>

            <BottomNav active="qr" />
        </div>
    );
}
