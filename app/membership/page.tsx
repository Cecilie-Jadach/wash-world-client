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
            <h1 className="font-extrabold text-xl">Dit medlemskab</h1>
            <MembershipCard user={user} membershipStatus={membershipStatus}/>
            {membershipStatus === 'active' ? (
                <Button href="/pause-membership">Sæt på pause</Button>
            ): (<Button variant="secondary" icon={false} onClick={handleReactivate} disabled={reactivateMutation.isPending}>{reactivateMutation.isPending ? 'Venter...' : 'Genoptag medlemskab'}</Button>)}
        </main>
    )
}