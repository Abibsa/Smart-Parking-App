'use client';

import Link from "next/link";
import { ArrowLeft, Filter, Car } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParkingContext } from "../context/ParkingContext";
import BottomNav from "../components/BottomNav";

export default function SlotsPage() {
    const router = useRouter();
    const { selectedLocation, setSelectedSlot } = useParkingContext();
    const [selectedFloor, setSelectedFloor] = useState(0);
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        if (!selectedLocation) {
            router.push('/map');
            return;
        }

        if (selectedLocation.floors && selectedLocation.floors.length > 0) {
            setSlots(selectedLocation.floors[selectedFloor].slots);
        }
    }, [selectedLocation, selectedFloor, router]);

    const handleSlotSelect = (slot) => {
        if (slot.status === 'available') {
            setSelectedSlot(slot);
            router.push('/payment');
        }
    };

    if (!selectedLocation) {
        return null;
    }

    const availableCount = slots.filter(s => s.status === 'available').length;
    const occupiedCount = slots.filter(s => s.status === 'occupied').length;

    return (
        <div className="mobile-container">
            <header style={{ padding: '20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                    <Link href="/map">
                        <ArrowLeft size={24} color="var(--text-main)" />
                    </Link>
                    <h1 style={{ fontSize: '1.1rem', margin: 0 }}>Pilih Slot Parkir</h1>
                    <Filter size={24} color="var(--text-main)" />
                </div>

                {/* Floor Tabs */}
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px', marginBottom: '10px' }}>
                    {selectedLocation.floors.map((floor, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedFloor(index)}
                            className="badge"
                            style={{
                                background: selectedFloor === index ? 'var(--primary)' : 'var(--background)',
                                color: selectedFloor === index ? 'white' : 'var(--text-muted)',
                                border: 'none',
                                padding: '8px 16px',
                                cursor: 'pointer'
                            }}
                        >
                            Lantai {floor.floor}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--success)' }}></div>
                        <span>Tersedia ({availableCount})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--text-muted)' }}></div>
                        <span>Terisi ({occupiedCount})</span>
                    </div>
                </div>
            </header>

            <div style={{ padding: '20px', paddingBottom: '100px', background: 'var(--background)', flex: 1, overflowY: 'auto' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {selectedLocation.name} - Lantai {selectedLocation.floors[selectedFloor].floor}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                    {slots.map(slot => (
                        <button
                            key={slot.id}
                            onClick={() => handleSlotSelect(slot)}
                            disabled={slot.status === 'occupied'}
                            style={{
                                background: 'var(--surface)',
                                padding: '20px',
                                borderRadius: '16px',
                                border: slot.status === 'available' ? '2px solid var(--primary)' : '1px solid var(--border)',
                                opacity: slot.status === 'occupied' ? 0.6 : 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px',
                                position: 'relative',
                                cursor: slot.status === 'available' ? 'pointer' : 'not-allowed',
                                boxShadow: slot.status === 'available' ? '0 4px 12px rgba(220, 38, 38, 0.1)' : 'none',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                transform: slot.status === 'available' ? 'scale(1)' : 'scale(0.98)'
                            }}
                            onMouseEnter={(e) => {
                                if (slot.status === 'available') {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.2)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (slot.status === 'available') {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.1)';
                                }
                            }}
                        >
                            {slot.status === 'available' && (
                                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }}></div>
                            )}
                            <Car size={32} color={slot.status === 'available' ? 'var(--primary)' : 'var(--text-muted)'} />
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{slot.id}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {slot.status === 'available' ? 'Tersedia' : 'Terisi'}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <BottomNav active="slots" />
        </div>
    );
}
