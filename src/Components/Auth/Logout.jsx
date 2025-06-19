"use client";
import { signOut } from 'next-auth/react';

export default function Logout() {
    const handleLogout = async () => {
        await signOut({ redirect: false });
        window.location.href = '/'; // Redirect to home page after logout
    };

    return (
        <button
            className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={handleLogout}
            aria-label="Cerrar sesión"
        >
            Cerrar sesión
        </button>
    );
}