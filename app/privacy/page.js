'use client';

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText, AlertCircle } from "lucide-react";
import { useTranslation } from "../utils/useTranslation";
import BottomNav from "../components/BottomNav";

export default function PrivacyPage() {
    const { t } = useTranslation();

    const sections = [
        {
            icon: Shield,
            title: "Kebijakan Privasi",
            content: [
                "Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda.",
                "Data yang kami kumpulkan meliputi: nama, email, nomor telepon, dan riwayat parkir.",
                "Data Anda digunakan untuk meningkatkan layanan dan pengalaman pengguna.",
                "Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa izin Anda."
            ]
        },
        {
            icon: Lock,
            title: "Keamanan Data",
            content: [
                "Semua data pengguna dienkripsi menggunakan teknologi SSL/TLS.",
                "Password Anda disimpan dengan enkripsi hash yang aman.",
                "Kami melakukan backup data secara berkala untuk mencegah kehilangan data.",
                "Akses ke data dibatasi hanya untuk personel yang berwenang."
            ]
        },
        {
            icon: Eye,
            title: "Hak Pengguna",
            content: [
                "Anda berhak mengakses dan mengunduh data pribadi Anda kapan saja.",
                "Anda dapat meminta penghapusan akun dan data Anda.",
                "Anda berhak menolak penggunaan data untuk tujuan marketing.",
                "Anda dapat mengubah pengaturan privasi di menu Pengaturan."
            ]
        },
        {
            icon: FileText,
            title: "Syarat & Ketentuan",
            content: [
                "Dengan menggunakan aplikasi ini, Anda menyetujui syarat dan ketentuan kami.",
                "Pengguna bertanggung jawab atas keamanan akun mereka sendiri.",
                "Kami berhak menangguhkan akun yang melanggar ketentuan layanan.",
                "Tarif parkir dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya."
            ]
        },
        {
            icon: AlertCircle,
            title: "Cookies & Tracking",
            content: [
                "Kami menggunakan cookies untuk meningkatkan pengalaman pengguna.",
                "Cookies membantu kami mengingat preferensi dan pengaturan Anda.",
                "Anda dapat menonaktifkan cookies melalui pengaturan browser.",
                "Data lokasi hanya digunakan saat aplikasi aktif dan dengan izin Anda."
            ]
        }
    ];

    return (
        <div className="mobile-container">
            <header style={{
                padding: '20px',
                background: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div className="flex-between">
                    <Link href="/profile">
                        <ArrowLeft size={24} color="var(--text-main)" />
                    </Link>
                    <h1 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>
                        Privasi & Keamanan
                    </h1>
                    <div style={{ width: 24 }}></div>
                </div>
            </header>

            <div style={{
                padding: '20px',
                paddingBottom: '100px',
                background: 'var(--background)',
                flex: 1,
                overflowY: 'auto'
            }}>
                {/* Hero Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                    color: 'white',
                    padding: '30px 20px',
                    borderRadius: '16px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    <Shield size={48} style={{ marginBottom: '15px' }} />
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                        Data Anda Aman Bersama Kami
                    </h2>
                    <p style={{ fontSize: '0.875rem', opacity: 0.9, margin: 0 }}>
                        Kami berkomitmen melindungi privasi dan keamanan data pribadi Anda
                    </p>
                </div>

                {/* Sections */}
                {sections.map((section, index) => {
                    const IconComponent = section.icon;
                    return (
                        <div
                            key={index}
                            className="card"
                            style={{
                                marginBottom: '15px',
                                padding: '20px'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '15px'
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
                                    <IconComponent size={20} color="var(--primary)" />
                                </div>
                                <h3 style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: 'var(--text-main)',
                                    margin: 0
                                }}>
                                    {section.title}
                                </h3>
                            </div>

                            <ul style={{
                                margin: 0,
                                paddingLeft: '20px',
                                color: 'var(--text-muted)'
                            }}>
                                {section.content.map((item, i) => (
                                    <li key={i} style={{
                                        marginBottom: '8px',
                                        fontSize: '0.875rem',
                                        lineHeight: '1.6'
                                    }}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}

                {/* Contact Section */}
                <div className="card" style={{
                    background: 'var(--background)',
                    border: '2px dashed var(--border)',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontSize: '1rem',
                        marginBottom: '10px',
                        color: 'var(--text-main)'
                    }}>
                        Ada Pertanyaan?
                    </h3>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        marginBottom: '15px'
                    }}>
                        Hubungi tim kami untuk informasi lebih lanjut tentang privasi dan keamanan
                    </p>
                    <a
                        href="mailto:privacy@smartparking.com"
                        className="btn btn-primary"
                        style={{
                            display: 'inline-block',
                            textDecoration: 'none',
                            maxWidth: '250px'
                        }}
                    >
                        Hubungi Kami
                    </a>
                </div>

                {/* Last Updated */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                }}>
                    Terakhir diperbarui: 26 November 2024
                </div>
            </div>

            <BottomNav active="profile" />
        </div>
    );
}
