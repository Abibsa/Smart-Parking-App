'use client';

import Link from "next/link";
import { ArrowLeft, User, Mail, LogOut, History, Settings, HelpCircle, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useParkingContext } from "../context/ParkingContext";
import BottomNav from "../components/BottomNav";

import { useTranslation } from "../utils/useTranslation";

export default function ProfilePage() {
    const router = useRouter();
    const { user, logout, parkingHistory } = useParkingContext();
    const { t } = useTranslation();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    const handleLogout = () => {
        if (confirm(t('logoutConfirm') || 'Apakah Anda yakin ingin keluar?')) {
            logout();
            router.push('/');
        }
    };

    // Show loading or nothing while redirecting
    if (!user) {
        return null;
    }

    const totalSpent = parkingHistory.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    const totalSessions = parkingHistory.length;

    return (
        <div className="mobile-container">
            <header style={{ padding: '20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <div className="flex-between">
                    <Link href="/map">
                        <ArrowLeft size={24} color="var(--text-main)" />
                    </Link>
                    <h1 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>{t('myProfile')}</h1>
                    <div style={{ width: 24 }}></div>
                </div>
            </header>

            <div style={{ padding: '20px', paddingBottom: '100px', background: 'var(--background)', flex: 1, overflowY: 'auto' }}>

                {/* User Info Card */}
                <div className="card" style={{
                    background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                    color: 'white',
                    border: 'none',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 15px',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <User size={40} color="white" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{user.name}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', opacity: 0.9 }}>
                        <Mail size={14} />
                        <span style={{ fontSize: '0.875rem' }}>{user.email}</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid-2" style={{ marginBottom: '20px' }}>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px' }}>{t('totalParking')}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{totalSessions}</div>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '5px' }}>{t('totalSpent')}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                            Rp {(totalSpent / 1000).toFixed(0)}k
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {t('account')}
                    </h3>

                    <Link href="/history" className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '10px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: '#FEE2E2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <History size={20} color="var(--primary)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600' }}>{t('parkingHistory')}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('viewAllTransactions')}</div>
                        </div>
                        <ArrowLeft size={20} color="var(--text-muted)" style={{ transform: 'rotate(180deg)' }} />
                    </Link>

                    <Link href="/settings" className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '10px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'var(--surface)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Settings size={20} color="var(--text-muted)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{t('settings')}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dark mode, notifikasi, bahasa</div>
                        </div>
                        <ArrowLeft size={20} color="var(--text-muted)" style={{ transform: 'rotate(180deg)' }} />
                    </Link>
                </div>

                {/* Support */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {t('help')}
                    </h3>

                    <Link href="/help" className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '10px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: '#fef3c7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <HelpCircle size={20} color="#d97706" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{t('helpCenter')}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FAQ & Kontak support</div>
                        </div>
                        <ArrowLeft size={20} color="var(--text-muted)" style={{ transform: 'rotate(180deg)' }} />
                    </Link>

                    <Link href="/privacy" className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '10px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: '#dcfce7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Shield size={20} color="#16a34a" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{t('privacySecurity')}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Kebijakan & syarat layanan</div>
                        </div>
                        <ArrowLeft size={20} color="var(--text-muted)" style={{ transform: 'rotate(180deg)' }} />
                    </Link>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="btn"
                    style={{
                        background: '#fee2e2',
                        color: '#991b1b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <LogOut size={20} />
                    <span>{t('logout')}</span>
                </button>

                {/* App Version */}
                <div style={{ textAlign: 'center', marginTop: '30px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    Smart Parking v1.0.0
                </div>
            </div>

            <BottomNav active="profile" />
        </div>
    );
}
