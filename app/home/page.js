'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MapPin, Clock, TrendingUp, Car, QrCode, History as HistoryIcon, User, ChevronRight, Calendar } from "lucide-react";
import { useParkingContext } from "../context/ParkingContext";
import { useTranslation } from "../utils/useTranslation";
import BottomNav from "../components/BottomNav";

export default function HomePage() {
    const router = useRouter();
    const { user, currentBooking, parkingHistory } = useParkingContext();
    const { t } = useTranslation();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    const totalSpent = parkingHistory.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    const totalSessions = parkingHistory.length;
    const recentHistory = parkingHistory.slice(0, 3);

    return (
        <div className="mobile-container">
            <header style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                color: 'white',
                borderBottomLeftRadius: '30px',
                borderBottomRightRadius: '30px',
                boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '5px' }}>
                            {t('hello')}, 👋
                        </div>
                        <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '700' }}>
                            {user.name}
                        </h1>
                    </div>
                    <Link href="/profile" style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255,255,255,0.3)'
                    }}>
                        <User size={24} color="white" />
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        padding: '15px',
                        borderRadius: '15px',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <Car size={20} />
                            <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>{t('totalParking')}</span>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{totalSessions}</div>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        padding: '15px',
                        borderRadius: '15px',
                        border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <TrendingUp size={20} />
                            <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>{t('totalSpent')}</span>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                            Rp {(totalSpent / 1000).toFixed(0)}k
                        </div>
                    </div>
                </div>
            </header>

            <div style={{ padding: '20px', paddingBottom: '100px', background: 'var(--background)', flex: 1, overflowY: 'auto' }}>

                {currentBooking && (
                    <div style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--text-main)' }}>
                            {t('activeParking')}
                        </h2>
                        <Link href="/entry-qr" className="card" style={{
                            background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '20px',
                            textDecoration: 'none',
                            display: 'block'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <div>
                                    <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '5px' }}>
                                        {currentBooking.location.name}
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                        {currentBooking.slot?.id || currentBooking.slot}
                                    </div>
                                </div>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <QrCode size={28} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', fontSize: '0.875rem', opacity: 0.9 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Clock size={16} />
                                    <span>{new Date(currentBooking.entryTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Calendar size={16} />
                                    <span>{new Date(currentBooking.entryTime).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                <div style={{ marginBottom: '25px' }}>
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--text-main)' }}>
                        {t('quickActions')}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        <Link href="/map" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                            <div style={{
                                width: '100%',
                                aspectRatio: '1',
                                borderRadius: '15px',
                                background: '#FEE2E2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '8px',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <MapPin size={28} color="#DC2626" />
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: '500' }}>
                                {t('findParking')}
                            </div>
                        </Link>
                        <Link href="/entry-qr" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                            <div style={{
                                width: '100%',
                                aspectRatio: '1',
                                borderRadius: '15px',
                                background: '#F4F4F5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '8px',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <QrCode size={28} color="#18181B" />
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: '500' }}>
                                {t('scanQR')}
                            </div>
                        </Link>
                        <Link href="/history" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                            <div style={{
                                width: '100%',
                                aspectRatio: '1',
                                borderRadius: '15px',
                                background: '#F4F4F5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '8px',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <HistoryIcon size={28} color="#71717A" />
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: '500' }}>
                                {t('history')}
                            </div>
                        </Link>
                        <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                            <div style={{
                                width: '100%',
                                aspectRatio: '1',
                                borderRadius: '15px',
                                background: '#FEF2F2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '8px',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <User size={28} color="#991B1B" />
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: '500' }}>
                                {t('profile')}
                            </div>
                        </Link>
                    </div>
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h2 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>
                            {t('recentActivity')}
                        </h2>
                        <Link href="/history" style={{
                            fontSize: '0.875rem',
                            color: 'var(--primary)',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            {t('viewAll')}
                            <ChevronRight size={16} />
                        </Link>
                    </div>

                    {recentHistory.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {recentHistory.map((item) => (
                                <div key={item.id} className="card" style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '5px' }}>
                                                {item.location.name}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                {item.slot?.id || item.slot}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1rem' }}>
                                                Rp {(item.totalPrice / 1000).toFixed(0)}k
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                {item.duration} {t('hours')}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontSize: '0.75rem',
                                        color: 'var(--text-muted)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <Clock size={14} />
                                            {new Date(item.exitTime).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}, {new Date(item.exitTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div style={{
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            background: '#dcfce7',
                                            color: '#166534',
                                            fontSize: '0.7rem',
                                            fontWeight: '600'
                                        }}>
                                            {t('completed')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card" style={{
                            padding: '40px 20px',
                            textAlign: 'center',
                            color: 'var(--text-muted)'
                        }}>
                            <HistoryIcon size={40} style={{ margin: '0 auto 15px', opacity: 0.5 }} />
                            <div style={{ fontSize: '0.875rem' }}>{t('noHistory')}</div>
                            <div style={{ fontSize: '0.75rem', marginTop: '5px' }}>{t('historyEmpty')}</div>
                            <Link href="/map" className="btn btn-primary" style={{
                                marginTop: '20px',
                                display: 'inline-block'
                            }}>
                                {t('startParking')}
                            </Link>
                        </div>
                    )}
                </div>

            </div>

            <BottomNav active="home" />
        </div>
    );
}
