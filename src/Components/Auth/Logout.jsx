"use client";
import { signOut } from 'next-auth/react';

export default function Logout() {
    const handleLogout = async () => {
        await signOut({ redirect: false });
        window.location.href = '/'; // Redirect to home page after logout
    };

    return (
        <button
            className="flex w-full text-black py-2 bg-error justify-center rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={handleLogout}
            aria-label="Cerrar sesión"
        >
            Cerrar sesión
        </button>
    );
}