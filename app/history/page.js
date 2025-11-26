'use client';

import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Calendar, Trash2 } from "lucide-react";
import { useParkingContext } from "../context/ParkingContext";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import BottomNav from "../components/BottomNav";

import { useTranslation } from "../utils/useTranslation";

export default function HistoryPage() {
    const { parkingHistory } = useParkingContext();
    const { t } = useTranslation();

    const clearHistory = () => {
        if (confirm(t('clearConfirm') || 'Apakah Anda yakin ingin menghapus semua riwayat?')) {
            localStorage.removeItem('parkingHistory');
            window.location.reload();
        }
    };

    return (
        <div className="mobile-container">
            <header style={{ padding: '20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="flex-between">
                    <Link href="/map">
                        <ArrowLeft size={24} color="var(--text-main)" />
                    </Link>
                    <h1 style={{ fontSize: '1.1rem', margin: 0 }}>{t('parkingHistory')}</h1>
                    {parkingHistory.length > 0 ? (
                        <button onClick={clearHistory} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                            <Trash2 size={20} color="var(--danger)" />
                        </button>
                    ) : (
                        <div style={{ width: 24 }}></div>
                    )}
                </div>
            </header>

            <div style={{ padding: '20px', paddingBottom: '100px', background: 'var(--background)', flex: 1, overflowY: 'auto' }}>
                {parkingHistory.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'var(--background)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px',
                            border: '2px dashed var(--border)'
                        }}>
                            <Clock size={32} color="var(--text-muted)" />
                        </div>
                        <h3 style={{ marginBottom: '10px', color: 'var(--text-main)' }}>{t('noHistory')}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>
                            {t('historyEmpty')}
                        </p>
                        <Link href="/map" className="btn btn-primary" style={{ maxWidth: '200px', margin: '0 auto' }}>
                            {t('startParking')}
                        </Link>
                    </div>
                ) : (
                    <>
                        <div style={{ marginBottom: '15px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            {t('totalTransactions')} {parkingHistory.length} {t('transactions')}
                        </div>
                        {parkingHistory.map((item, index) => (
                            <div key={item.id || `history-${index}`} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
                                <div className="flex-between">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <MapPin size={16} color="var(--primary)" />
                                        <span style={{ fontWeight: '600' }}>{item.location.name}</span>
                                    </div>
                                    <span className="badge badge-success">{item.status === 'completed' ? t('completed') : t('active')}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '24px' }}>
                                    <Calendar size={12} />
                                    <span>
                                        {format(new Date(item.entryTime), 'dd MMM yyyy, HH:mm', { locale: id })}
                                    </span>
                                </div>

                                <div style={{
                                    background: 'var(--background)',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '10px',
                                    fontSize: '0.875rem'
                                }}>
                                    <div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '2px' }}>{t('slot')}</div>
                                        <div style={{ fontWeight: '600' }}>{item.slot.id}</div>
                                    </div>
                                    <div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '2px' }}>{t('duration')}</div>
                                        <div style={{ fontWeight: '600' }}>{item.duration} {t('hours')}</div>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid var(--border)', marginTop: '5px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                        <Clock size={14} />
                                        <span>{t('totalPayment')}</span>
                                    </div>
                                    <div style={{ fontWeight: 'bold', color: 'var(--text-main)', fontSize: '1.1rem' }}>
                                        Rp {item.totalPrice.toLocaleString('id-ID')}
                                    </div>
                                </div>

                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {t('paidVia')}: <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>
                                        {item.paymentMethod === 'ewallet' ? 'E-Wallet' :
                                            item.paymentMethod === 'qris' ? 'QRIS' : 'Kartu'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            <BottomNav active="history" />
        </div>
    );
}
