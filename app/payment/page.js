'use client';

import Link from "next/link";
import { ArrowLeft, CreditCard, Wallet, QrCode as QrIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParkingContext } from "../context/ParkingContext";
import { paymentMethods } from "../data/mockData";

export default function PaymentPage() {
    const router = useRouter();
    const { selectedLocation, selectedSlot, createBooking } = useParkingContext();
    const [selectedPayment, setSelectedPayment] = useState('ewallet');
    const [isProcessing, setIsProcessing] = useState(false);
    const [estimatedDuration, setEstimatedDuration] = useState(3);

    useEffect(() => {
        if (!selectedLocation || !selectedSlot) {
            router.push('/map');
        }
    }, [selectedLocation, selectedSlot, router]);

    if (!selectedLocation || !selectedSlot) {
        return null;
    }

    const totalPrice = estimatedDuration * selectedLocation.price;

    const handlePayment = () => {
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            createBooking(selectedLocation, selectedSlot, selectedPayment);
            setIsProcessing(false);
            router.push('/entry-qr');
        }, 1500);
    };

    const getPaymentIcon = (iconName) => {
        switch (iconName) {
            case 'Wallet': return <Wallet size={24} color="var(--primary)" />;
            case 'QrCode': return <QrIcon size={24} color="var(--primary)" />;
            case 'CreditCard': return <CreditCard size={24} color="var(--primary)" />;
            default: return null;
        }
    };

    return (
        <div className="mobile-container">
            <header style={{ padding: '20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <div className="flex-between">
                    <Link href="/slots">
                        <ArrowLeft size={24} color="var(--text-main)" />
                    </Link>
                    <h1 style={{ fontSize: '1.1rem', margin: 0 }}>Pembayaran</h1>
                    <div style={{ width: 24 }}></div>
                </div>
            </header>

            <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
                {/* Summary Card */}
                <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', color: 'white', border: 'none', boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)' }}>
                    <div style={{ opacity: 0.8, fontSize: '0.875rem', marginBottom: '5px' }}>Total Biaya</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
                        Rp {totalPrice.toLocaleString('id-ID')}
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Lokasi</div>
                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedLocation.name}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Slot</div>
                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{selectedSlot.id}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Estimasi Durasi</div>
                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{estimatedDuration} Jam</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Tarif/Jam</div>
                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Rp {(selectedLocation.price / 1000).toFixed(0)}k</div>
                        </div>
                    </div>
                </div>

                {/* Duration Selector */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Estimasi Durasi Parkir</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {[1, 2, 3, 4, 5].map(hours => (
                            <button
                                key={hours}
                                onClick={() => setEstimatedDuration(hours)}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: estimatedDuration === hours ? '2px solid var(--primary)' : '1px solid var(--border)',
                                    background: estimatedDuration === hours ? '#FEE2E2' : 'var(--surface)',
                                    color: estimatedDuration === hours ? 'var(--primary)' : 'var(--text-main)',
                                    fontWeight: estimatedDuration === hours ? '600' : '400',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {hours}h
                            </button>
                        ))}
                    </div>
                </div>

                <h3 style={{ fontSize: '1rem', marginBottom: '15px' }}>Metode Pembayaran</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {paymentMethods.map(method => (
                        <label
                            key={method.id}
                            className="card"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                cursor: 'pointer',
                                margin: 0,
                                borderColor: selectedPayment === method.id ? 'var(--primary)' : 'var(--border)',
                                borderWidth: selectedPayment === method.id ? '2px' : '1px',
                                background: selectedPayment === method.id ? '#FEF2F2' : 'var(--surface)'
                            }}
                        >
                            <input
                                type="radio"
                                name="payment"
                                value={method.id}
                                checked={selectedPayment === method.id}
                                onChange={(e) => setSelectedPayment(e.target.value)}
                                style={{ accentColor: 'var(--primary)', width: '20px', height: '20px' }}
                            />
                            <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '8px' }}>
                                {getPaymentIcon(method.icon)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600' }}>{method.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{method.description}</div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div style={{ padding: '20px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
                <button
                    onClick={handlePayment}
                    className="btn btn-primary"
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Memproses Pembayaran...' : 'Bayar Sekarang'}
                </button>
            </div>
        </div>
    );
}
