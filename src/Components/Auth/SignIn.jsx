"use client"
import { signIn } from 'next-auth/react'

const GoogleButton = () => {
    return (
        <>
            <button
                className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => signIn()}
                aria-label="Sign in"
            >
                Iniciar sesión
            </button>
        </>
    )
}


export default GoogleButton