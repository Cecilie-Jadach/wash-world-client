"use client"

import { useState, useEffect } from 'react'
import ReturnArrow from "../../components/ReturnArrow"
import MembershipStatusCard from "../../components/MembershipStatusCard"
import Button from "../../components/Button"

export default function page() {
    const status = "active"
    const [token, setToken] = useState<string>('')

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) setToken(storedToken)
    }, [])
    
return (
    <main className="m-2xs pb-xl">
        <ReturnArrow/>
        <h1 className="font-extrabold text-xl">Dit medlemsskab</h1>
        <MembershipStatusCard membership="Premium" price={169} washes={3} status={status} token={token}/>
        <h2 className="font-extrabold text-xl">Handlinger</h2>
        <div className="grid">
        <Button>Skift medlemsskab</Button>
        <Button variant="secondary" icon={false}>Sæt på pause</Button>
        </div>
    </main>
)
}
