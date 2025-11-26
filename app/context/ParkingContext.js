'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ParkingContext = createContext();

export function ParkingProvider({ children }) {
    const [user, setUser] = useState(null);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [parkingHistory, setParkingHistory] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [entryTime, setEntryTime] = useState(null);
    const [exitTime, setExitTime] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('id'); // 'id', 'en', 'zh'

    // Load data from localStorage on mount with deduplication
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('parkingUser');
            const savedHistory = localStorage.getItem('parkingHistory');
            const savedBooking = localStorage.getItem('currentBooking');
            const savedDarkMode = localStorage.getItem('darkMode');
            const savedLanguage = localStorage.getItem('language');

            if (savedUser) setUser(JSON.parse(savedUser));
            if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
            if (savedLanguage) setLanguage(savedLanguage);

            // Deduplicate history based on unique IDs
            if (savedHistory) {
                const history = JSON.parse(savedHistory);
                const uniqueHistory = [];
                const seenIds = new Set();

                history.forEach(item => {
                    if (item.id && !seenIds.has(item.id)) {
                        seenIds.add(item.id);
                        uniqueHistory.push(item);
                    }
                });

                setParkingHistory(uniqueHistory);
                // Save deduplicated data back to localStorage
                if (uniqueHistory.length !== history.length) {
                    localStorage.setItem('parkingHistory', JSON.stringify(uniqueHistory));
                }
            }

            if (savedBooking) setCurrentBooking(JSON.parse(savedBooking));
        }
    }, []);

    // Save to localStorage when data changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (user) localStorage.setItem('parkingUser', JSON.stringify(user));
            if (parkingHistory.length > 0) localStorage.setItem('parkingHistory', JSON.stringify(parkingHistory));
            if (currentBooking) localStorage.setItem('currentBooking', JSON.stringify(currentBooking));
            localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
            localStorage.setItem('language', language);
        }
    }, [user, parkingHistory, currentBooking, isDarkMode, language]);

    // Apply dark mode to document
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [isDarkMode]);

    const login = (email, password) => {
        const userData = {
            email,
            name: email.split('@')[0],
            id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        setUser(userData);
        return userData;
    };

    const register = (name, email, password) => {
        const userData = {
            email,
            name,
            id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        };
        setUser(userData);
        return userData;
    };

    const logout = () => {
        setUser(null);
        setCurrentBooking(null);
        localStorage.removeItem('parkingUser');
        localStorage.removeItem('currentBooking');
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    const createBooking = (location, slot, paymentMethod) => {
        const booking = {
            id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            location,
            slot,
            paymentMethod,
            entryTime: new Date().toISOString(),
            status: 'active',
            userId: user?.id
        };
        setCurrentBooking(booking);
        setEntryTime(new Date());
        return booking;
    };

    const completeBooking = () => {
        if (!currentBooking || !entryTime) return null;

        const exit = new Date();
        setExitTime(exit);

        const durationMs = exit - new Date(entryTime);
        const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));
        const pricePerHour = currentBooking.location.price;
        const totalPrice = durationHours * pricePerHour;

        const completedBooking = {
            ...currentBooking,
            exitTime: exit.toISOString(),
            duration: durationHours,
            totalPrice,
            status: 'completed'
        };

        // Only add if not already in history (prevent duplicates from React strict mode)
        setParkingHistory(prev => {
            const exists = prev.some(item => item.id === completedBooking.id);
            if (exists) {
                return prev; // Don't add duplicate
            }
            return [completedBooking, ...prev];
        });

        setCurrentBooking(null);
        setEntryTime(null);
        localStorage.removeItem('currentBooking');

        return completedBooking;
    };

    const value = {
        user,
        login,
        register,
        logout,
        currentBooking,
        createBooking,
        completeBooking,
        parkingHistory,
        selectedLocation,
        setSelectedLocation,
        selectedSlot,
        setSelectedSlot,
        entryTime,
        exitTime,
        isDarkMode,
        toggleDarkMode,
        language,
        changeLanguage
    };

    return (
        <ParkingContext.Provider value={value}>
            {children}
        </ParkingContext.Provider>
    );
}

export function useParkingContext() {
    const context = useContext(ParkingContext);
    if (!context) {
        throw new Error('useParkingContext must be used within ParkingProvider');
    }
    return context;
}
