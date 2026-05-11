"use client"
import { useState } from 'react'
import { MembershipStatus, MembershipStatusCardProps } from "../types/membership"
import { useMembership } from "../app/hooks/useMembership"

export default function MembershipStatusCard({ membership, price, washes, status, token }: MembershipStatusCardProps) {
    // State til at holde styr på om medlemskabet er aktivt eller pauseret
    const [membershipStatus, setMembershipStatus] = useState<MembershipStatus>(status)
    // State til antal måneder brugeren vil pausere
    const [pauseMonths, setPauseMonths] = useState<number>(1)
    // Hent pause og reactivate mutations fra custom hook useMembership.ts
    const { pauseMutation, reactivateMutation } = useMembership(token)

    // Kaldes når brugeren klikker på "Pausér medlemskab"
    const handlePause = async () => {
        // mutateAsync kalder pauseMembershipFetch med pauseMonths
        await pauseMutation.mutateAsync(pauseMonths)
        // Opdater state så UI'et skifter til "På pause"
        setMembershipStatus('paused')
    }

    // Kaldes når brugeren klikker på "Genaktiver medlemsskab"
    const handleReactivate = async () => {
        // mutateAsync kalder reactivateMembershipFetch
        await reactivateMutation.mutateAsync()
        // Opdater state så UI'et skifter til "Aktivt"
        setMembershipStatus('active')
    }

    return (
        <div>
            <div>   
                <p>{membership}</p>
                <div>
                    {/* Status label skifter farve og tekst afhængigt af membershipStatus */}
                    <span className={membershipStatus === 'active' 
                        ? 'bg-green-white-background text-white px-xs py-4xs rounded-full' 
                        : 'bg-grey-10 text-black px-xs py-4xs rounded-full'}>
                        {membershipStatus === 'active' ? 'Aktivt' : 'På pause'}
                    </span>

                    {membershipStatus === 'active' ? (
                        <div>
                            <select onChange={(e) => setPauseMonths(Number(e.target.value))}>
                                <option value={1}>1 måned</option>
                                <option value={2}>2 måneder</option>
                                <option value={3}>3 måneder</option>
                            </select>
                            {/* disabled mens requesten kører så brugeren ikke klikker flere gange */}
                            <button 
                                onClick={handlePause}
                                disabled={pauseMutation.isPending}
                            >
                                {/* Skift tekst mens der ventes på svar fra Flask */}
                                {pauseMutation.isPending ? 'Venter...' : 'Pausér medlemskab'}
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={handleReactivate}
                            disabled={reactivateMutation.isPending}
                        >
                            {reactivateMutation.isPending ? 'Venter...' : 'Genaktivér medlemskab'}
                        </button>
                    )}
                    {/* Vis fejlbesked hvis requesten fejler */}
                    {pauseMutation.isError && <p>{pauseMutation.error.message}</p>}
                    {reactivateMutation.isError && <p>{reactivateMutation.error.message}</p>}
                </div>
            </div>
            <p>{price} kr/md.</p>
            <div className="flex justify-between">
                <p>Vaske denne måned</p>
                <p>{washes}</p>
            </div>
        </div>
    )
}