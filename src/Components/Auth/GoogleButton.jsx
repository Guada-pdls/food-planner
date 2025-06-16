"use client"
import { signIn } from 'next-auth/react'

const GoogleButton = () => {
	return (
		<>
			<button
				className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				onClick={() => signIn('google')}
				aria-label="Sign in with Google"
			>
				Iniciar sesión con Google
			</button>
		</>
	)
}


export default GoogleButton