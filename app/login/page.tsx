"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState<string>('')

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
            method: 'POST',
            body: formData
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.error)
            return
        }

        // Gem token i localStorage
        localStorage.setItem('token', data.access_token)

        // Send brugeren videre til forsiden
        router.push('/')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Adgangskode" />
            {error && <p>{error}</p>}
            <button type="submit">Log ind</button>
        </form>
    )
}