// Mock parking locations data - Real locations in Central Java
export const parkingLocations = [
    {
        id: 1,
        name: 'Hotel Harper Yogyakarta',
        address: 'Jl. Jend. Sudirman No.70, Yogyakarta',
        distance: 2.3,
        availableSlots: 35,
        totalSlots: 80,
        price: 5000,
        lat: -7.7828,
        lng: 110.3670,
        floors: [
            {
                floor: 1,
                slots: [
                    { id: 'A1', status: 'available' },
                    { id: 'A2', status: 'occupied' },
                    { id: 'A3', status: 'available' },
                    { id: 'A4', status: 'available' },
                    { id: 'A5', status: 'occupied' },
                    { id: 'A6', status: 'available' },
                ]
            },
            {
                floor: 2,
                slots: [
                    { id: 'B1', status: 'available' },
                    { id: 'B2', status: 'available' },
                    { id: 'B3', status: 'occupied' },
                    { id: 'B4', status: 'available' },
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Pasar Klewer Solo',
        address: 'Jl. Jend. Urip Sumoharjo, Surakarta',
        distance: 1.5,
        availableSlots: 18,
        totalSlots: 60,
        price: 3000,
        lat: -7.5755,
        lng: 110.8243,
        floors: [
            {
                floor: 1,
                slots: [
                    { id: 'C1', status: 'available' },
                    { id: 'C2', status: 'occupied' },
                    { id: 'C3', status: 'available' },
                    { id: 'C4', status: 'available' },
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'The Village Purwokerto',
        address: 'Jl. Jend. Gatot Subroto, Purwokerto',
        distance: 3.8,
        availableSlots: 52,
        totalSlots: 120,
        price: 4000,
        lat: -7.4297,
        lng: 109.2401,
        floors: [
            {
                floor: 1,
                slots: [
                    { id: 'D1', status: 'available' },
                    { id: 'D2', status: 'occupied' },
                    { id: 'D3', status: 'available' },
                    { id: 'D4', status: 'available' },
                ]
            },
            {
                floor: 2,
                slots: [
                    { id: 'E1', status: 'available' },
                    { id: 'E2', status: 'available' },
                ]
            }
        ]
    },
    {
        id: 4,
        name: 'Tambang Pasir Pemalang',
        address: 'Jl. Raya Pemalang-Randudongkal, Pemalang',
        distance: 5.2,
        availableSlots: 25,
        totalSlots: 50,
        price: 2000,
        lat: -6.8926,
        lng: 109.3782,
        floors: [
            {
                floor: 1,
                slots: [
                    { id: 'F1', status: 'available' },
                    { id: 'F2', status: 'occupied' },
                    { id: 'F3', status: 'available' },
                ]
            }
        ]
    },
    {
        id: 5,
        name: 'MG Suites Semarang',
        address: 'Jl. MT Haryono No.972, Semarang',
        distance: 4.1,
        availableSlots: 42,
        totalSlots: 100,
        price: 6000,
        lat: -6.9825,
        lng: 110.4089,
        floors: [
            {
                floor: 1,
                slots: [
                    { id: 'G1', status: 'available' },
                    { id: 'G2', status: 'available' },
                    { id: 'G3', status: 'occupied' },
                ]
            },
            {
                floor: 2,
                slots: [
                    { id: 'H1', status: 'available' },
                    { id: 'H2', status: 'available' },
                ]
            }
        ]
    },
    {
        id: 6,
        name: 'Ruko Solo Baru',
        address: 'Jl. Solo Baru, Sukoharjo',
        distance: 2.7,
        availableSlots: 30,
        totalSlots: 70,
        price: 3500,
        lat: -7.5698,
        lng: 110.7647,
        floors: [
            {
                floor: 1,
                slots: [
                    { id: 'I1', status: 'available' },
                    { id: 'I2', status: 'occupied' },
                    { id: 'I3', status: 'available' },
                    { id: 'I4', status: 'available' },
                ]
            }
        ]
    },
    {
        id: 7,
        name: 'RS Panti Waluyo Solo',
        address: 'Jl. A. Yani No.1, Surakarta',
        distance: 1.8,
        availableSlots: 15,
        totalSlots: 90,
        price: 4000,
        lat: -7.5619,
        lng: 110.8154,
        floors: [
            {
                floor: 1,
                slots: [
                    { id: 'J1', status: 'available' },
                    { id: 'J2', status: 'occupied' },
                    { id: 'J3', status: 'available' },
                ]
            },
            {
                floor: 2,
                slots: [
                    { id: 'K1', status: 'available' },
                    { id: 'K2', status: 'available' },
                ]
            }
        ]
    },
    {
        id: 8,
        name: 'RS UNS Surakarta',
        address: 'Jl. Ir. Sutami No.36A, Surakarta',
        distance: 3.2,
        availableSlots: 8,
        totalSlots: 110,
        price: 5000,
        lat: -7.5595,
        lng: 110.8557,
        floors: [
            {
                floor: 1,
                slots: [
                    { id: 'L1', status: 'available' },
                    { id: 'L2', status: 'occupied' },
                ]
            },
            {
                floor: 2,
                slots: [
                    { id: 'M1', status: 'available' },
                    { id: 'M2', status: 'available' },
                ]
            }
        ]
    },
    {
        id: 9,
        name: 'RS Orthopedi Surakarta',
        address: 'Jl. A. Yani, Pabelan, Surakarta',
        distance: 2.9,
        availableSlots: 22,
        totalSlots: 85,
        price: 4500,
        lat: -7.5506,
        lng: 110.7734,
        floors: [
            {
                floor: 1,
                slots: [
                    { id: 'N1', status: 'available' },
                    { id: 'N2', status: 'occupied' },
                    { id: 'N3', status: 'available' },
                ]
            }
        ]
    },
    {
        id: 10,
        name: 'Edutorium UMS Surakarta',
        address: 'Jl. A. Yani, Pabelan, Kartasura, Sukoharjo',
        distance: 3.5,
        availableSlots: 48,
        totalSlots: 150,
        price: 3000,
        lat: -7.5563,
        lng: 110.7699,
        floors: [
            {
                floor: 1,
                slots: [
                    { id: 'O1', status: 'available' },
                    { id: 'O2', status: 'available' },
                    { id: 'O3', status: 'occupied' },
                    { id: 'O4', status: 'available' },
                ]
            },
            {
                floor: 2,
                slots: [
                    { id: 'P1', status: 'available' },
                    { id: 'P2', status: 'available' },
                ]
            }
        ]
    }
];

export const paymentMethods = [
    { id: 'ewallet', name: 'E-Wallet', description: 'GoPay, OVO, Dana', icon: 'Wallet' },
    { id: 'qris', name: 'QRIS', description: 'Scan QR Code', icon: 'QrCode' },
    { id: 'card', name: 'Kartu Kredit/Debit', description: 'Visa, Mastercard', icon: 'CreditCard' }
];
