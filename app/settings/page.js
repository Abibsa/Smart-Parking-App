'use client';

import Link from "next/link";
import { ArrowLeft, Moon, Sun, Bell, Globe, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParkingContext } from "../context/ParkingContext";
import BottomNav from "../components/BottomNav";

export default function SettingsPage() {
    const { isDarkMode, toggleDarkMode, language } = useParkingContext();

    // Notification states
    const [pushNotifications, setPushNotifications] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showToast, setShowToast] = useState(null);

    // Load settings from localStorage
    useEffect(() => {
        const savedPush = localStorage.getItem('pushNotifications');
        const savedSound = localStorage.getItem('soundEnabled');

        if (savedPush !== null) setPushNotifications(savedPush === 'true');
        if (savedSound !== null) setSoundEnabled(savedSound === 'true');
    }, []);

    // Save settings
    const saveSetting = (key, value) => {
        localStorage.setItem(key, value.toString());
    };

    const showToastMessage = (message) => {
        setShowToast(message);
        setTimeout(() => setShowToast(null), 2000);
    };

    const handlePushToggle = () => {
        const newValue = !pushNotifications;
        setPushNotifications(newValue);
        saveSetting('pushNotifications', newValue);
        showToastMessage(newValue ? '🔔 Push Notifications Aktif' : '🔕 Push Notifications Nonaktif');
    };

    const handleSoundToggle = () => {
        const newValue = !soundEnabled;
        setSoundEnabled(newValue);
        saveSetting('soundEnabled', newValue);
        showToastMessage(newValue ? '🔊 Suara Notifikasi Aktif' : '🔇 Suara Notifikasi Nonaktif');
    };

    return (
        <div className="mobile-container">
            <header style={{ padding: '20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <div className="flex-between">
                    <Link href="/profile">
                        <ArrowLeft size={24} color="var(--text-main)" />
                    </Link>
                    <h1 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>Pengaturan</h1>
                    <div style={{ width: 24 }}></div>
                </div>
            </header>

            <div style={{ padding: '20px', paddingBottom: '100px', background: 'var(--background)', flex: 1, overflowY: 'auto' }}>

                {/* Appearance */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Tampilan
                    </h3>

                    <div className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: isDarkMode ? '#1e293b' : '#fef3c7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {isDarkMode ? <Moon size={20} color="#60a5fa" /> : <Sun size={20} color="#f59e0b" />}
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>Dark Mode</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {isDarkMode ? 'Aktif' : 'Nonaktif'}
                                </div>
                            </div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: isDarkMode ? 'var(--primary)' : '#cbd5e1',
                                transition: '0.4s',
                                borderRadius: '28px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    content: '',
                                    height: '20px',
                                    width: '20px',
                                    left: isDarkMode ? '26px' : '4px',
                                    bottom: '4px',
                                    backgroundColor: 'white',
                                    transition: '0.4s',
                                    borderRadius: '50%'
                                }}></span>
                            </span>
                        </label>
                    </div>
                </div>

                {/* Notifications */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Notifikasi
                    </h3>

                    <div className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: pushNotifications ? '#FEE2E2' : 'var(--background)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease'
                            }}>
                                <Bell size={20} color={pushNotifications ? 'var(--primary)' : 'var(--text-muted)'} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>Push Notifications</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Notifikasi parkir & pembayaran</div>
                            </div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                            <input
                                type="checkbox"
                                checked={pushNotifications}
                                onChange={handlePushToggle}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: pushNotifications ? 'var(--primary)' : '#cbd5e1',
                                transition: '0.4s',
                                borderRadius: '28px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    content: '',
                                    height: '20px',
                                    width: '20px',
                                    left: pushNotifications ? '26px' : '4px',
                                    bottom: '4px',
                                    backgroundColor: 'white',
                                    transition: '0.4s',
                                    borderRadius: '50%'
                                }}></span>
                            </span>
                        </label>
                    </div>

                    <div className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: soundEnabled ? '#FEE2E2' : 'var(--background)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease'
                            }}>
                                <Volume2 size={20} color={soundEnabled ? 'var(--primary)' : 'var(--text-muted)'} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>Suara</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Notifikasi dengan suara</div>
                            </div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                            <input
                                type="checkbox"
                                checked={soundEnabled}
                                onChange={handleSoundToggle}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: soundEnabled ? 'var(--primary)' : '#cbd5e1',
                                transition: '0.4s',
                                borderRadius: '28px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    content: '',
                                    height: '20px',
                                    width: '20px',
                                    left: soundEnabled ? '26px' : '4px',
                                    bottom: '4px',
                                    backgroundColor: 'white',
                                    transition: '0.4s',
                                    borderRadius: '50%'
                                }}></span>
                            </span>
                        </label>
                    </div>
                </div>

                {/* Language */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Bahasa
                    </h3>

                    <Link href="/language" className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        textDecoration: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
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
                            <Globe size={20} color="#16a34a" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>
                                {language === 'id' ? 'Bahasa Indonesia' : language === 'en' ? 'English' : '中文'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {language === 'id' ? 'Indonesian' : language === 'en' ? 'English' : 'Mandarin Chinese'}
                            </div>
                        </div>
                        <ArrowLeft size={20} color="var(--text-muted)" style={{ transform: 'rotate(180deg)' }} />
                    </Link>
                </div>

            </div>

            {/* Toast Notification */}
            {showToast && (
                <div style={{
                    position: 'fixed',
                    top: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '24px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 100,
                    animation: 'slideDown 0.3s ease',
                    maxWidth: '80%',
                    textAlign: 'center'
                }}>
                    {showToast}
                </div>
            )}

            <BottomNav active="profile" />

            <style jsx global>{`
                @keyframes slideDown {
                    0% { 
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    100% { 
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
