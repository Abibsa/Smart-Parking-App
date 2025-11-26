'use client';

import { useParkingContext } from '../context/ParkingContext';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSelector() {
    const { language, changeLanguage } = useParkingContext();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'id', label: '🇮🇩 Indonesia' },
        { code: 'en', label: '🇺🇸 English' },
        { code: 'zh', label: '🇨🇳 中文' }
    ];

    return (
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 50 }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '20px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
            >
                <Globe size={16} />
                <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>{language}</span>
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    minWidth: '140px',
                    border: '1px solid #f0f0f0'
                }}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                changeLanguage(lang.code);
                                setIsOpen(false);
                            }}
                            style={{
                                display: 'block',
                                width: '100%',
                                textAlign: 'left',
                                padding: '10px 16px',
                                background: language === lang.code ? '#f0f9ff' : 'white',
                                color: language === lang.code ? '#0284c7' : '#333',
                                border: 'none',
                                borderBottom: '1px solid #f5f5f5',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: language === lang.code ? '600' : '400'
                            }}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
