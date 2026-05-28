"use client"

import { useEffect } from "react"
import { useAuth } from "@/app/hooks/useAuth"

export default function AccountDeletedPage() {
    const { handleLogout } = useAuth()

    // Redirect to login page with handleLogout function after 3 seconds, empty dependency array ensures the timer starts once on mount
    useEffect(() => {
        const timer = setTimeout(handleLogout, 3000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <main className="mx-xs my-lg flex flex-col gap-2xs items-center justify-center h-[80vh]">
            <h1 className="font-extrabold text-xl text-center">Din profil er blevet slettet</h1>
            <p className="text-center">Du vil nu blive ført til login siden.</p>
        </main>
    )
}
