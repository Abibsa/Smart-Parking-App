'use client';

import Link from "next/link";
import { ArrowLeft, MessageCircle, Mail, Phone, ChevronDown } from "lucide-react";
import { useState } from "react";
import BottomNav from "../components/BottomNav";

export default function HelpPage() {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            q: "Bagaimana cara membooking slot parkir?",
            a: "Pilih lokasi di peta, pilih slot yang tersedia, lakukan pembayaran, dan scan QR code di gerbang masuk."
        },
        {
            q: "Metode pembayaran apa saja yang tersedia?",
            a: "Kami menerima E-Wallet (GoPay, OVO, Dana), QRIS, dan Kartu Kredit/Debit."
        },
        {
            q: "Bagaimana jika saya kehilangan tiket QR?",
            a: "Anda dapat mengakses tiket QR dari halaman riwayat atau hubungi customer service kami."
        },
        {
            q: "Apakah saya bisa membatalkan booking?",
            a: "Pembatalan dapat dilakukan maksimal 15 menit sebelum waktu masuk dengan refund penuh."
        },
        {
            q: "Bagaimana cara menghubungi customer service?",
            a: "Anda dapat menghubungi kami melalui chat, email, atau telepon yang tersedia di halaman ini."
        }
    ];

    return (
        <div className="mobile-container">
            <header style={{ padding: '20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <div className="flex-between">
                    <Link href="/profile">
                        <ArrowLeft size={24} color="var(--text-main)" />
                    </Link>
                    <h1 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>Pusat Bantuan</h1>
                    <div style={{ width: 24 }}></div>
                </div>
            </header>

            <div style={{ padding: '20px', paddingBottom: '100px', background: 'var(--background)', flex: 1, overflowY: 'auto' }}>

                {/* Contact Options */}
                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Hubungi Kami
                    </h3>

                    <div className="grid-2" style={{ gap: '10px' }}>
                        <button className="card" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '20px',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: '#dbeafe',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <MessageCircle size={24} color="var(--primary)" />
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-main)' }}>Live Chat</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Online 24/7</div>
                            </div>
                        </button>

                        <button className="card" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '20px',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: '#dcfce7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Mail size={24} color="#16a34a" />
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-main)' }}>Email</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>support@smartparking.id</div>
                            </div>
                        </button>
                    </div>

                    <button className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginTop: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left'
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: '#fef3c7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Phone size={24} color="#d97706" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>Telepon</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>+62 21 1234 5678</div>
                        </div>
                    </button>
                </div>

                {/* FAQ */}
                <div>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Pertanyaan Umum (FAQ)
                    </h3>

                    {faqs.map((faq, index) => (
                        <div key={index} className="card" style={{ marginBottom: '10px', padding: 0, overflow: 'hidden' }}>
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    textAlign: 'left'
                                }}
                            >
                                <span style={{ fontWeight: '600', color: 'var(--text-main)', flex: 1 }}>{faq.q}</span>
                                <ChevronDown
                                    size={20}
                                    color="var(--text-muted)"
                                    style={{
                                        transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s'
                                    }}
                                />
                            </button>
                            {openFaq === index && (
                                <div style={{
                                    padding: '0 15px 15px 15px',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.6',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}>
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>

            <BottomNav active="profile" />
        </div>
    );
}
