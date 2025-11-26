'use client';

import Link from "next/link";
import { Search, MapPin, ArrowRight, Navigation, Layers, Crosshair, Menu, User, Home, History, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useParkingContext } from "../context/ParkingContext";
import { parkingLocations } from "../data/mockData";
import BottomNav from "../components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../utils/useTranslation";

export default function MapPage() {
    const { setSelectedLocation, user } = useParkingContext();
    const { t } = useTranslation();
    const [selectedLoc, setSelectedLoc] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLocations, setFilteredLocations] = useState(parkingLocations);
    const [mapPosition, setMapPosition] = useState({ x: -500, y: -500 });
    const [zoomLevel, setZoomLevel] = useState(1);
    const [mapLayer, setMapLayer] = useState('default'); // 'default', 'satellite', 'terrain'
    const [showToast, setShowToast] = useState(null); // For showing notifications
    const [selectedFilter, setSelectedFilter] = useState('all'); // Filter: 'all', 'nearest', 'cheapest', 'covered'
    const [showSidebar, setShowSidebar] = useState(false); // Sidebar menu
    const mapRef = useRef(null);

    // Filter locations
    useEffect(() => {
        let filtered = parkingLocations;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(loc =>
                loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                loc.address.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category
        if (selectedFilter === 'nearest') {
            // Sort by distance (ascending)
            filtered = [...filtered].sort((a, b) => a.distance - b.distance);
        } else if (selectedFilter === 'cheapest') {
            // Sort by price (ascending)
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (selectedFilter === 'covered') {
            // Filter only covered/indoor parking (for demo, we'll show locations with totalSlots > 80)
            filtered = filtered.filter(loc => loc.totalSlots >= 80);
        }
        // 'all' shows everything (no additional filter)

        setFilteredLocations(filtered);
    }, [searchQuery, selectedFilter]);

    const handleFilterChange = (filterId) => {
        setSelectedFilter(filterId);
        const filterNames = {
            'all': '📍 Semua Lokasi',
            'nearest': '📍 Terdekat',
            'cheapest': '💰 Termurah',
            'covered': '🏢 Indoor'
        };
        showToastMessage(filterNames[filterId]);
    };

    const handleSelectLocation = (location) => {
        setSelectedLoc(location);
        setSelectedLocation(location);
    };

    const handleViewSlots = () => {
        if (selectedLoc) {
            setSelectedLocation(selectedLoc);
        }
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.2, 3)); // Max zoom 3x
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.2, 0.5)); // Min zoom 0.5x
    };

    const showToastMessage = (message) => {
        setShowToast(message);
        setTimeout(() => setShowToast(null), 2000);
    };

    const handleLayerToggle = () => {
        setMapLayer(prev => {
            let newLayer;
            if (prev === 'default') newLayer = 'satellite';
            else if (prev === 'satellite') newLayer = 'terrain';
            else newLayer = 'default';

            const layerNames = {
                'default': 'Peta Normal',
                'satellite': 'Mode Satelit',
                'terrain': 'Mode Terrain'
            };
            showToastMessage(`📍 ${layerNames[newLayer]}`);
            return newLayer;
        });
    };

    const handleRecenter = () => {
        // User location is at 50% of map (1000px from top-left in a 2000px map)
        // To center it in viewport, we need to position the map so user location appears in center
        // Viewport center is at (viewportWidth/2, viewportHeight/2)
        // We need to offset the map by (1000 - viewportWidth/2, 1000 - viewportHeight/2)

        // Assuming standard mobile viewport ~390px width, ~844px height
        // But we'll use a safe calculation: move map so its center (1000, 1000) is at viewport center
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate offset needed to center the map's center point (where user is)
        const offsetX = -(1000 - viewportWidth / 2);
        const offsetY = -(1000 - viewportHeight / 2);

        setMapPosition({ x: offsetX, y: offsetY });
        setZoomLevel(1);
        showToastMessage('🎯 Kembali ke lokasi Anda');
    };

    const categories = [
        { id: 'all', label: t('viewAll') || 'Semua' },
        { id: 'nearest', label: t('nearest') || 'Terdekat' },
        { id: 'cheapest', label: t('cheapest') || 'Termurah' },
        { id: 'covered', label: t('covered') || 'Indoor' },
    ];

    return (
        <div className="mobile-container" style={{ overflow: 'hidden', position: 'relative', background: '#f8f9fa' }}>

            {/* Map Container (Draggable & Zoomable) */}
            <motion.div
                ref={mapRef}
                drag
                dragConstraints={{
                    top: -1000 * zoomLevel,
                    left: -1000 * zoomLevel,
                    right: 0,
                    bottom: 0,
                }}
                dragElastic={0.1}
                animate={{
                    scale: zoomLevel,
                    x: mapPosition.x,
                    y: mapPosition.y
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                    width: '2000px',
                    height: '2000px',
                    backgroundImage: 'url(/images/map-bg.png)',
                    backgroundSize: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    cursor: 'grab',
                    originX: 0.5,
                    originY: 0.5,
                    filter: mapLayer === 'satellite'
                        ? 'brightness(0.9) contrast(1.1) saturate(1.3)'
                        : mapLayer === 'terrain'
                            ? 'sepia(0.3) brightness(1.1) contrast(0.9)'
                            : 'none'
                }}
                onDragEnd={(e, info) => {
                    setMapPosition({ x: mapPosition.x + info.offset.x, y: mapPosition.y + info.offset.y });
                }}
            >
                {/* User Location (Blue Dot) */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(' + (1 / zoomLevel) + ')', // Counter-scale to keep size constant
                    zIndex: 5
                }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        background: '#000000',
                        borderRadius: '50%',
                        border: '3px solid white',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '60px',
                            height: '60px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: '50%',
                            animation: 'pulse 2s infinite'
                        }}></div>
                    </div>
                    {/* Viewport/Direction Cone */}
                    <div style={{
                        position: 'absolute',
                        top: '-40px',
                        left: '-30px',
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent)',
                        clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                        transform: 'rotate(0deg)',
                        pointerEvents: 'none'
                    }}></div>
                </div>

                {/* Parking Markers */}
                {filteredLocations.map((location, index) => {
                    // Distribute markers somewhat randomly around the center for demo
                    const offsetX = (index % 3 - 1) * 300 + (index * 50);
                    const offsetY = (Math.floor(index / 3) - 1) * 300 + (index * 30);

                    const isSelected = selectedLoc?.id === location.id;

                    return (
                        <motion.button
                            key={location.id}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent drag
                                handleSelectLocation(location);
                            }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: (isSelected ? 1.2 : 1) * (1 / Math.sqrt(zoomLevel)), opacity: 1 }} // Adjust scale based on zoom
                            whileHover={{ scale: 1.1 * (1 / Math.sqrt(zoomLevel)) }}
                            style={{
                                position: 'absolute',
                                top: `calc(50% + ${offsetY}px)`,
                                left: `calc(50% + ${offsetX}px)`,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                zIndex: isSelected ? 10 : 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            {/* Price Tag Bubble */}
                            <div style={{
                                background: isSelected ? '#EA4335' : 'white',
                                color: isSelected ? 'white' : '#333',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                marginBottom: '4px',
                                whiteSpace: 'nowrap',
                                border: isSelected ? 'none' : '1px solid #ddd'
                            }}>
                                Rp {(location.price / 1000).toFixed(0)}k
                            </div>

                            {/* Pin Icon */}
                            <div style={{
                                position: 'relative',
                                color: isSelected ? '#EA4335' : '#EA4335'
                            }}>
                                <MapPin size={isSelected ? 40 : 32} fill={isSelected ? '#EA4335' : 'rgba(234, 67, 53, 0.1)'} />
                                {isSelected && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-5px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '10px',
                                        height: '4px',
                                        background: 'rgba(0,0,0,0.3)',
                                        borderRadius: '50%',
                                        filter: 'blur(2px)'
                                    }}></div>
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* UI Overlays */}

            {/* Top Search Bar */}
            <div style={{ position: 'absolute', top: '20px', left: '16px', right: '16px', zIndex: 20 }}>
                <div style={{
                    background: 'var(--surface)',
                    borderRadius: '30px',
                    padding: '10px 16px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <button
                        onClick={() => setShowSidebar(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Menu size={24} color="var(--text-muted)" />
                    </button>
                    <input
                        type="text"
                        placeholder={t('searchLocation') || "Cari lokasi parkir..."}
                        style={{
                            border: 'none',
                            outline: 'none',
                            width: '100%',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            color: 'var(--text-main)',
                            background: 'transparent'
                        }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {user ? (
                        <Link href="/profile">
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                {user.name.charAt(0)}
                            </div>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <User size={24} color="var(--text-muted)" />
                        </Link>
                    )}
                </div>

                {/* Filter Chips */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    padding: '12px 0 4px 0',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => handleFilterChange(cat.id)}
                            style={{
                                background: selectedFilter === cat.id ? 'var(--primary)' : 'var(--surface)',
                                border: selectedFilter === cat.id ? '2px solid var(--primary)' : 'none',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                color: selectedFilter === cat.id ? 'white' : 'var(--text-main)',
                                boxShadow: selectedFilter === cat.id ? '0 2px 6px rgba(220, 38, 38, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
                                whiteSpace: 'nowrap',
                                fontWeight: selectedFilter === cat.id ? '600' : '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div style={{
                position: 'absolute',
                right: '16px',
                bottom: '100px', // Above bottom nav
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                zIndex: 20
            }}>
                {/* Zoom Controls */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--surface)',
                    borderRadius: '24px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    overflow: 'hidden'
                }}>
                    <button
                        onClick={handleZoomIn}
                        style={{
                            width: '48px',
                            height: '48px',
                            background: 'var(--surface)',
                            border: 'none',
                            borderBottom: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            color: 'var(--text-main)'
                        }}
                    >
                        +
                    </button>
                    <button
                        onClick={handleZoomOut}
                        style={{
                            width: '48px',
                            height: '48px',
                            background: 'var(--surface)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            color: 'var(--text-main)'
                        }}
                    >
                        -
                    </button>
                </div>

                {/* Layer Indicator */}
                {mapLayer !== 'default' && (
                    <div style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        textAlign: 'center',
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        {mapLayer === 'satellite' ? '🛰️ Satelit' : '🗺️ Terrain'}
                    </div>
                )}

                <button
                    onClick={handleLayerToggle}
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: mapLayer !== 'default' ? 'var(--primary)' : 'var(--surface)',
                        border: 'none',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}>
                    <Layers size={24} color={mapLayer !== 'default' ? 'white' : 'var(--text-main)'} />
                </button>
                <button
                    onClick={handleRecenter}
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'var(--surface)',
                        border: 'none',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <Crosshair size={24} color="var(--primary)" />
                </button>
            </div>

            {/* Bottom Sheet for Location Details */}
            <AnimatePresence>
                {selectedLoc && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            position: 'absolute',
                            bottom: '70px', // Above bottom nav
                            left: 0,
                            right: 0,
                            background: 'var(--surface)',
                            borderTopLeftRadius: '24px',
                            borderTopRightRadius: '24px',
                            padding: '20px',
                            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                            zIndex: 30,
                            maxHeight: '60vh',
                            overflowY: 'auto'
                        }}
                    >
                        {/* Drag Handle */}
                        <div style={{ width: '36px', height: '4px', background: 'var(--border)', borderRadius: '2px', margin: '0 auto 16px auto' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                            <div>
                                <h2 style={{ fontSize: '1.375rem', fontWeight: '400', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                                    {selectedLoc.name}
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    <span>{selectedLoc.distance} km</span>
                                    <span>•</span>
                                    <span>{selectedLoc.address}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedLoc(null)}
                                style={{ background: 'var(--background)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', cursor: 'pointer' }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                            <Link href="/slots" onClick={handleViewSlots} style={{ flex: 1, textDecoration: 'none' }}>
                                <button style={{
                                    width: '100%',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '20px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    <Navigation size={18} />
                                    {t('viewSlots') || 'Lihat Slot'}
                                </button>
                            </Link>
                            <button style={{
                                flex: 1,
                                background: 'var(--surface)',
                                color: 'var(--primary)',
                                border: '1px solid var(--border)',
                                padding: '10px 20px',
                                borderRadius: '20px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                                <MapPin size={18} />
                                {t('save') || 'Simpan'}
                            </button>
                        </div>

                        {/* Info Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t('available') || 'Tersedia'}</div>
                                <div style={{ fontSize: '1.125rem', fontWeight: '500', color: 'var(--success)' }}>
                                    {selectedLoc.availableSlots} {t('slots') || 'Slot'}
                                </div>
                            </div>
                            <div style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--background)' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t('price') || 'Harga'}</div>
                                <div style={{ fontSize: '1.125rem', fontWeight: '500', color: 'var(--text-main)' }}>
                                    Rp {(selectedLoc.price / 1000).toFixed(0)}k<span style={{ fontSize: '0.875rem', fontWeight: '400', color: 'var(--text-muted)' }}>/jam</span>
                                </div>
                            </div>
                        </div>

                        {/* Images Scroll (Mock) */}
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '12px', color: 'var(--text-main)' }}>Foto</div>
                            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                                {[1, 2, 3].map(i => (
                                    <div key={i} style={{
                                        minWidth: '120px',
                                        height: '80px',
                                        borderRadius: '8px',
                                        background: `linear-gradient(45deg, #e0e0e0, #f5f5f5)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-muted)',
                                        fontSize: '0.75rem'
                                    }}>
                                        Foto {i}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            {showToast && (
                <div style={{
                    position: 'fixed',
                    top: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '24px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 100,
                    animation: 'slideDown 0.3s ease',
                    maxWidth: '80%',
                    textAlign: 'center'
                }}>
                    {showToast}
                </div>
            )}

            {/* Sidebar Menu */}
            {showSidebar && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={() => setShowSidebar(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 999,
                            animation: 'fadeIn 0.3s ease'
                        }}
                    />

                    {/* Sidebar */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: '280px',
                        background: 'var(--surface)',
                        zIndex: 1000,
                        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                        animation: 'slideInLeft 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* Header */}
                        <div style={{
                            padding: '20px',
                            borderBottom: '1px solid var(--border)',
                            background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Smart Parking</h2>
                                <button
                                    onClick={() => setShowSidebar(false)}
                                    style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: 'white'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                            {user && (
                                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                                    👋 Halo, {user.name}
                                </div>
                            )}
                        </div>

                        {/* Menu Items */}
                        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                            <Link href="/home" onClick={() => setShowSidebar(false)} style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', background: 'var(--background)' }}>
                                    <Home size={20} color="var(--primary)" />
                                    <span style={{ fontWeight: '500' }}>Home</span>
                                </div>
                            </Link>

                            <Link href="/history" onClick={() => setShowSidebar(false)} style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', background: 'var(--background)' }}>
                                    <History size={20} color="var(--text-muted)" />
                                    <span style={{ fontWeight: '500' }}>Riwayat</span>
                                </div>
                            </Link>

                            <Link href="/profile" onClick={() => setShowSidebar(false)} style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', background: 'var(--background)' }}>
                                    <User size={20} color="var(--text-muted)" />
                                    <span style={{ fontWeight: '500' }}>Profil</span>
                                </div>
                            </Link>

                            <Link href="/settings" onClick={() => setShowSidebar(false)} style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', background: 'var(--background)' }}>
                                    <Settings size={20} color="var(--text-muted)" />
                                    <span style={{ fontWeight: '500' }}>Pengaturan</span>
                                </div>
                            </Link>
                        </div>

                        {/* Footer */}
                        <div style={{ padding: '20px', borderTop: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                                Smart Parking v1.0.0
                            </div>
                        </div>
                    </div>
                </>
            )}

            <BottomNav active="map" />

            <style jsx global>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes slideDown {
          0% { 
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          100% { 
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideInLeft {
          0% { 
            transform: translateX(-100%);
          }
          100% { 
            transform: translateX(0);
          }
        }
      `}</style>
        </div>
    );
}
