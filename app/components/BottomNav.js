'use client';

import Link from "next/link";
import { Home, MapPin, QrCode, Clock, User } from "lucide-react";
import { useTranslation } from "../utils/useTranslation";

export default function BottomNav({ active }) {
    const { t } = useTranslation();

    return (
        <nav className="bottom-nav">
            <Link href="/home" className={`nav-item ${active === 'home' ? 'active' : ''}`}>
                <Home size={24} />
                <span>{t('home')}</span>
            </Link>
            <Link href="/map" className={`nav-item ${active === 'map' ? 'active' : ''}`}>
                <MapPin size={24} />
                <span>{t('map')}</span>
            </Link>
            <Link href="/entry-qr" className={`nav-item ${active === 'qr' ? 'active' : ''}`}>
                <div style={{
                    background: 'var(--primary)',
                    padding: '12px',
                    borderRadius: '50%',
                    marginTop: '-24px',
                    color: 'white',
                    boxShadow: '0 4px 10px rgba(220, 38, 38, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <QrCode size={24} />
                </div>
                <span>{t('scan')}</span>
            </Link>
            <Link href="/history" className={`nav-item ${active === 'history' ? 'active' : ''}`}>
                <Clock size={24} />
                <span>{t('history')}</span>
            </Link>
            <Link href="/profile" className={`nav-item ${active === 'profile' ? 'active' : ''}`}>
                <User size={24} />
                <span>{t('profile')}</span>
            </Link>
        </nav>
    );
}
