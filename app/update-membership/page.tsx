"use client"

import ReturnArrow from "@/components/ReturnArrow"
import MembershipCard from "@/components/MembershipCard"
import { useState } from "react";
import Button from "@/components/Button"
import { useMembership } from "@/app/hooks/useMembership"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useUser } from "@/app/hooks/useUser";

export default function UpdateMembership() {
const [selectedMembership, setSelectedMembership] = useState("");
const { updateMutation } = useMembership()
const [showModal, setShowModal] = useState(false)
const { data: user } = useUser();
const router = useRouter()

if (!user) return null;

const handleUpdate = async () => {
    await updateMutation.mutateAsync(selectedMembership)
    toast.success('Skift af medlemskab er registreret')
    router.push('/membership')
}
return (
    <main className="mt-xl mx-xs pb-3xl">
        <div className="grid gap-sm">
        <ReturnArrow/>
        <div className="grid gap-3xs">
            <h1 className="font-extrabold text-3xl">Skift medlemsskab</h1>
            <p>Dit medlemskab er <strong>{user.user_membership}</strong>. Du kan skifte dit medlemsskab nedenfor.</p>
        </div>
        <div className="flex flex-col gap-s">
            <MembershipCard membership="Guld" price={139} description="God og effektiv" selectedCard={selectedMembership === "Guld"} onSelect={setSelectedMembership}/>
            <MembershipCard membership="Premium" price={169} description="Ekstra grundig" selectedCard={selectedMembership === "Premium"} onSelect={setSelectedMembership}/>
            <MembershipCard membership="Brilliant" price={199} description="Bedste vask året rundt" selectedCard={selectedMembership === "Brilliant"} onSelect={setSelectedMembership}/>
            <MembershipCard membership="Enkeltvask" price={0} description="Køb enkeltvis vask ved vaskehallen fra 59 kr" selectedCard={selectedMembership === "Enkeltvask"} onSelect={setSelectedMembership}/>
        </div>
        <Button className="justify-center" onClick={() => setShowModal(true)}>Bekræft skift</Button>
        </div>

        {showModal && (
            <div onClick={() => setShowModal(false)}
                style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px' }}>
                    <div onClick={(e) => e.stopPropagation()} className="bg-white border border-black p-sm grid gap-xs">
                    <p>Er du sikker på, at du vil skifte medlemsskab?</p>
                    <div className="flex gap-2xs">
                        <Button onClick={() => setShowModal(false)} icon={false} variant="secondary">Annuller</Button>
                        <Button onClick={handleUpdate} icon={false} disabled={updateMutation.isPending}>{updateMutation.isPending ? 'Venter...' : 'Ja, skift medlemskab'}</Button>
                    </div>
                    </div>

            </div>
        )}
    </main>
)
}
