"use client"
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchUserQuery } from '../hooks/useUser'
import { User } from '../../types/user'
import MembershipCard from "../../components/MembershipStatusCard"
import Button from '../../components/Button'
import ReturnArrow from '../../components/ReturnArrow'
import { useMembership } from "../hooks/useMembership"
import toast from 'react-hot-toast'
import MembershipFeatures from "../../components/MembershipFeatures"
import InfoLabel from "../../components/InfoLabel"

export default function MembershipPage() {
    const [token, setToken] = useState<string>('')
    const { reactivateMutation } = useMembership(token)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) setToken(storedToken)
    }, [])

    const { data: user } = useQuery<User>({
        queryKey: ['user'],
        queryFn: () => fetchUserQuery(token),
        enabled: !!token
    })

    if (!user) return <p>Loader...</p>

    const membershipStatus = user.membership_paused_at > 0 ? 'paused' : 'active'

    const handleReactivate = async () => {
        await reactivateMutation.mutateAsync()
        toast.success('Dit medlemskab er genoptaget')}

    return (
        <main className="m-2xs pb-xl">
            <ReturnArrow />
            <div className="grid gap-lg">
                <div className="grid gap-s">
                    <div className="grid gap-xs">
                        <h1 className="font-extrabold text-xl">Dit medlemskab</h1>
                        <MembershipCard user={user} membershipStatus={membershipStatus}/>
                    </div>
                    <MembershipFeatures user={user}/>
                </div>
                <div className="grid gap-xs">
                    <h2 className="font-extrabold text-xl">Handlinger</h2>
                    <div className="grid gap-2xs">
                        <Button className="justify-center" href="/">Skift medlemsskab</Button>
                        {membershipStatus === 'active' ? (
                        <Button className="justify-center" variant="secondary" icon={false} href="/pause-membership">Sæt på pause</Button>
                        ): (<Button className="justify-center" variant="secondary" icon={false} onClick={handleReactivate} disabled={reactivateMutation.isPending}>{reactivateMutation.isPending ? 'Venter...' : 'Genoptag medlemskab'}</Button>)}
                    </div>
                    <InfoLabel message="Opsigelse af medlemskab sker automatisk ved sletning af profil"/>
                </div>
                <div>
                    <h2 className="font-extrabold text-xl">Dine biler</h2>
                    <div>
                        
                    </div>
                </div>
            </div>
        </main>
    )
}