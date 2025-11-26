'use client';

import Link from "next/link";
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "../utils/useTranslation";
import LanguageSelector from "../components/LanguageSelector";

export default function ForgotPassword() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = () => {
        if (!email) {
            setError(t('emailRequired') || 'Email harus diisi');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError(t('emailInvalid') || 'Format email tidak valid');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="mobile-container" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
                }}>
                    <CheckCircle size={40} color="white" />
                </div>

                <h1 style={{ marginBottom: '1rem' }}>{t('emailSent') || 'Email Terkirim!'}</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px' }}>
                    {t('resetEmailSent') || 'Kami telah mengirim link reset password ke'} <strong>{email}</strong>. {t('checkEmail') || 'Silakan cek email Anda.'}
                </p>

                <Link href="/login" className="btn btn-primary" style={{ marginBottom: '1rem' }}>
                    {t('backToLogin') || 'Kembali ke Login'}
                </Link>

                <button
                    onClick={() => {
                        setIsSuccess(false);
                        setEmail('');
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                    }}
                >
                    {t('resendEmail') || 'Kirim ulang email'}
                </button>
            </div>
        );
    }

    return (
        <div className="mobile-container" style={{ padding: '2rem', position: 'relative' }}>
            <LanguageSelector />

            <header style={{ marginBottom: '2rem' }}>
                <Link href="/login" style={{ display: 'inline-flex', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                    <ArrowLeft size={24} />
                </Link>
                <h1>{t('forgotPassword') || 'Lupa Password?'}</h1>
                <p>{t('forgotPasswordDesc') || 'Masukkan email Anda dan kami akan mengirim link untuk reset password'}</p>
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
                            style={{ paddingLeft: '40px', borderColor: error ? 'var(--danger)' : undefined }}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                        />
                    </div>
                    {error && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px', color: 'var(--danger)', fontSize: '0.875rem' }}>
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginBottom: '1rem', marginTop: '1rem' }}
                    disabled={isLoading}
                >
                    {isLoading ? (t('sending') || 'Mengirim...') : (t('sendResetLink') || 'Kirim Link Reset')}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                    {t('rememberPassword') || 'Ingat password Anda?'} <Link href="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>{t('login')}</Link>
                </p>
            </form>

            <div className="card" style={{ marginTop: '2rem', padding: '1rem', background: 'var(--surface)' }}>
                <h3 style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    {t('needHelp') || 'Butuh bantuan?'}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                    {t('contactSupport') || 'Hubungi customer service kami di'} <a href="mailto:support@smartparking.com" style={{ color: 'var(--primary)' }}>support@smartparking.com</a>
                </p>
            </div>
        </div>
    );
}
