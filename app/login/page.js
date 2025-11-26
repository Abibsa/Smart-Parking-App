'use client';

import Link from "next/link";
import { Mail, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParkingContext } from "../context/ParkingContext";
import { useTranslation } from "../utils/useTranslation";
import LanguageSelector from "../components/LanguageSelector";

export default function Login() {
    const router = useRouter();
    const { login } = useParkingContext();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = t('emailRequired') || 'Email harus diisi';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('emailInvalid') || 'Format email tidak valid';
        }

        if (!formData.password) {
            newErrors.password = t('passwordRequired') || 'Password harus diisi';
        } else if (formData.password.length < 6) {
            newErrors.password = t('passwordMinLength') || 'Password minimal 6 karakter';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            login(formData.email, formData.password);
            setIsLoading(false);
            router.push('/home');
        }, 800);
    };

    return (
        <div className="mobile-container" style={{ padding: '2rem', position: 'relative' }}>
            <LanguageSelector />

            <header style={{ marginBottom: '2rem' }}>
                <Link href="/" style={{ display: 'inline-flex', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                    <ArrowLeft size={24} />
                </Link>
                <h1>{t('loginTitle') || 'Selamat Datang Kembali'}</h1>
                <p>{t('loginSubtitle') || 'Silakan masuk untuk melanjutkan'}</p>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">{t('email')}</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                        <input
                            type="email"
                            className="input"
                            placeholder={t('emailPlaceholder') || 'nama@email.com'}
                            style={{ paddingLeft: '40px', borderColor: errors.email ? 'var(--danger)' : undefined }}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    {errors.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px', color: 'var(--danger)', fontSize: '0.875rem' }}>
                            <AlertCircle size={14} />
                            <span>{errors.email}</span>
                        </div>
                    )}
                </div>

                <div className="input-group">
                    <label className="label">{t('password')}</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                        <input
                            type="password"
                            className="input"
                            placeholder="••••••••"
                            style={{ paddingLeft: '40px', borderColor: errors.password ? 'var(--danger)' : undefined }}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    {errors.password && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px', color: 'var(--danger)', fontSize: '0.875rem' }}>
                            <AlertCircle size={14} />
                            <span>{errors.password}</span>
                        </div>
                    )}
                </div>

                <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
                    <Link href="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>
                        {t('forgotPassword') || 'Lupa Password?'}
                    </Link>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginBottom: '1rem' }}
                    disabled={isLoading}
                >
                    {isLoading ? (t('processing') || 'Memproses...') : (t('login') || 'Masuk')}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                    {t('noAccount') || 'Belum punya akun?'} <Link href="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>{t('register') || 'Daftar'}</Link>
                </p>
            </form>
        </div>
    );
}
