"use client"

// Hooks
import { useUser } from '../hooks/useUser'
import { useMembership } from "../hooks/useMembership"

// Components
import MembershipStatusCard from "@/components/MembershipStatusCard"
import Button from '@/components/Button'
import ReturnArrow from '@/components/ReturnArrow'
import MembershipFeatures from "@/components/MembershipFeatures"
import InfoLabel from "@/components/InfoLabel"
import LicensePlates from "@/components/LicensePlates"

// React
import toast from 'react-hot-toast'

export default function MembershipPage() {
    const { data: user } = useUser()
    const { reactivateMutation } = useMembership()

    if(!user) return <main><h1>Session udløbet.</h1><Button href="/login">Gå til log ind</Button></main>

    const membershipStatus = user.membership_paused_at > 0 ? 'paused' : 'active'

    const handleReactivate = async () => {
        try {
            await reactivateMutation.mutateAsync()
            toast.success('Dit medlemskab er genoptaget')
        } catch {
            toast.error("Medlemskab kunne ikke genoptages. Kontakt support.");
        }
    }

    return (
        <main className="mt-xl mx-xs pb-3xl">
            <ReturnArrow />
            <div className="grid gap-lg">
                <div className="grid gap-s">
                    <div className="grid gap-xs">
                        <h1 className="font-extrabold text-xl">Dit medlemskab</h1>
                        <MembershipStatusCard user={user} membershipStatus={membershipStatus} />
                    </div>
                    <MembershipFeatures user={user} />
                </div>
                <div className="grid gap-xs">
                    <h2 className="font-extrabold text-xl">Handlinger</h2>
                    <div className="grid gap-2xs">
                        <Button className="justify-center" href="/update-membership">Skift medlemsskab</Button>
                        {membershipStatus === 'active' ? (
                            <Button className="justify-center" variant="secondary" icon={false} href="/pause-membership">Sæt på pause</Button>
                        ) : (
                            <Button className="justify-center" variant="secondary" icon={false} onClick={handleReactivate}>
                                Genoptag medlemskab
                            </Button>
                        )}
                    </div>
                    <InfoLabel message="Opsigelse af medlemskab sker automatisk ved sletning af profil" />
                </div>
                <div className="grid gap-xs">
                    <h2 className="font-extrabold text-xl">Dine biler</h2>
                    <LicensePlates />
                    <Button className="justify-center" href="/edit-license-plates">Rediger biler</Button>
                </div>
            </div>
        </main>
    )
}
