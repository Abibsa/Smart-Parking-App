'use client';

import Link from "next/link";
import { Mail, Lock, User as UserIcon, ArrowLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParkingContext } from "../context/ParkingContext";
import { useTranslation } from "../utils/useTranslation";
import LanguageSelector from "../components/LanguageSelector";

export default function Register() {
    const router = useRouter();
    const { login } = useParkingContext();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = t('nameRequired') || 'Nama harus diisi';
        } else if (formData.name.length < 3) {
            newErrors.name = t('nameMinLength') || 'Nama minimal 3 karakter';
        }

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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t('confirmPasswordRequired') || 'Konfirmasi password harus diisi';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('passwordNotMatch') || 'Password tidak cocok';
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
            // Auto login after registration
            login(formData.email, formData.password, formData.name);
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
                <h1>{t('registerTitle') || 'Buat Akun Baru'}</h1>
                <p>{t('registerSubtitle') || 'Daftar untuk memulai parkir pintar'}</p>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">{t('name')}</label>
                    <div style={{ position: 'relative' }}>
                        <UserIcon size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            className="input"
                            placeholder={t('namePlaceholder') || 'Nama lengkap'}
                            style={{ paddingLeft: '40px', borderColor: errors.name ? 'var(--danger)' : undefined }}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    {errors.name && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px', color: 'var(--danger)', fontSize: '0.875rem' }}>
                            <AlertCircle size={14} />
                            <span>{errors.name}</span>
                        </div>
                    )}
                </div>

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

                <div className="input-group">
                    <label className="label">{t('confirmPassword')}</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                        <input
                            type="password"
                            className="input"
                            placeholder="••••••••"
                            style={{ paddingLeft: '40px', borderColor: errors.confirmPassword ? 'var(--danger)' : undefined }}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px', color: 'var(--danger)', fontSize: '0.875rem' }}>
                            <AlertCircle size={14} />
                            <span>{errors.confirmPassword}</span>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginBottom: '1rem', marginTop: '1rem' }}
                    disabled={isLoading}
                >
                    {isLoading ? (t('processing') || 'Memproses...') : (t('register') || 'Daftar')}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                    {t('haveAccount') || 'Sudah punya akun?'} <Link href="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>{t('login')}</Link>
                </p>
            </form>
        </div>
    );
}
