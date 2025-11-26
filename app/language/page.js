'use client';

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useParkingContext } from "../context/ParkingContext";
import BottomNav from "../components/BottomNav";

export default function LanguagePage() {
    const { language, changeLanguage } = useParkingContext();

    const languages = [
        { code: 'id', name: 'Bahasa Indonesia', nativeName: 'Indonesian', flag: '🇮🇩' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
        { code: 'zh', name: '中文', nativeName: 'Mandarin Chinese', flag: '🇨🇳' }
    ];

    const handleLanguageChange = (code) => {
        changeLanguage(code);
    };

    return (
        <div className="mobile-container">
            <header style={{ padding: '20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <div className="flex-between">
                    <Link href="/settings">
                        <ArrowLeft size={24} color="var(--text-main)" />
                    </Link>
                    <h1 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>
                        {language === 'id' ? 'Pilih Bahasa' : language === 'en' ? 'Select Language' : '选择语言'}
                    </h1>
                    <div style={{ width: 24 }}></div>
                </div>
            </header>

            <div style={{ padding: '20px', paddingBottom: '100px', background: 'var(--background)', flex: 1, overflowY: 'auto' }}>

                <div style={{ marginBottom: '15px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {language === 'id' ? 'Pilih bahasa yang Anda inginkan' :
                        language === 'en' ? 'Choose your preferred language' :
                            '选择您喜欢的语言'}
                </div>

                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="card"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginBottom: '10px',
                            cursor: 'pointer',
                            border: language === lang.code ? '2px solid var(--primary)' : 'none',
                            background: language === lang.code ? 'rgba(37, 99, 235, 0.05)' : 'var(--surface)',
                            transition: 'all 0.3s',
                            width: '100%',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{
                            fontSize: '2rem',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            background: 'var(--background)'
                        }}>
                            {lang.flag}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '2px' }}>
                                {lang.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {lang.nativeName}
                            </div>
                        </div>
                        {language === lang.code && (
                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Check size={16} color="white" />
                            </div>
                        )}
                    </button>
                ))}

                <div style={{
                    marginTop: '30px',
                    padding: '15px',
                    background: 'var(--surface)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        {language === 'id' ? (
                            <>
                                <strong style={{ color: 'var(--text-main)' }}>Catatan:</strong> Perubahan bahasa akan diterapkan ke seluruh aplikasi. Beberapa konten mungkin masih dalam bahasa asli.
                            </>
                        ) : language === 'en' ? (
                            <>
                                <strong style={{ color: 'var(--text-main)' }}>Note:</strong> Language changes will be applied throughout the app. Some content may still be in the original language.
                            </>
                        ) : (
                            <>
                                <strong style={{ color: 'var(--text-main)' }}>注意：</strong>语言更改将应用于整个应用程序。某些内容可能仍为原始语言。
                            </>
                        )}
                    </div>
                </div>

            </div>

            <BottomNav active="profile" />
        </div>
    );
}
