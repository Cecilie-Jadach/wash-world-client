"use client"

// Hooks
import { useState } from "react"
import { useMembership } from "@/app/hooks/useMembership"
import { useRouter } from 'next/navigation'
import { useUser } from "@/app/hooks/useUser"

// Components
import ReturnArrow from "@/components/ReturnArrow"
import MembershipCard from "@/components/MembershipCard"
import Button from "@/components/Button"
import IfNotUser from "@/components/IfNotUser"
import DialogModal from "@/components/DialogModal"

// React
import toast from 'react-hot-toast'

export default function UpdateMembership() {
    const [selectedMembership, setSelectedMembership] = useState("")
    const { updateMutation } = useMembership()
    const [activeDialogBox, setActiveDialogBox] = useState(false)
    const { data: user } = useUser()
    const router = useRouter()

    if (!user) return <IfNotUser />

    const handleUpdate = async () => {
        try {
            await updateMutation.mutateAsync(selectedMembership)
            toast.success('Skift af medlemskab er registreret')
            router.push('/membership')
        } catch {
            toast.error("Medlemskab kunne ikke ændres. Kontakt support.");
        }
    }
    return (
        <>
            <main className="mt-xl mx-xs pb-4xl">
                <div className="grid gap-ml">
                    <ReturnArrow />
                    <div className="grid gap-sm">
                        <div className="grid gap-3xs">
                            <h1 className="font-extrabold text-3xl">Skift medlemskab</h1>
                            <div className="bg-grey-10 border-l-4 border-l-green-white-background p-3xs">
                                <h2 className="text-sm">Nuværende medlemskab</h2>
                                <div className="flex justify-between">
                                    <p className="font-extrabold text-lg">{user.user_membership}</p>
                                    {user.user_membership === 'Guld' ? <p className="text-lg">139 kr./md.</p> : ''}
                                    {user.user_membership === 'Premium' ? <p className="text-lg">169 kr./md.</p> : ''}
                                    {user.user_membership === 'Brilliant' ? <p className="text-lg">199 kr./md.</p> : ''}
                                    {user.user_membership === 'Enkeltvask' ? <p className="text-lg">0 kr./md.</p> : ''}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-s">
                            <h3 className="font-extrabold text-lg">Skift til et andet medlemskab nedenfor</h3>
                            <MembershipCard membership="Guld" price={139} description="God og effektiv" selectedCard={selectedMembership === "Guld"} onSelect={setSelectedMembership} />
                            <MembershipCard membership="Premium" price={169} description="Ekstra grundig" selectedCard={selectedMembership === "Premium"} onSelect={setSelectedMembership} />
                            <MembershipCard membership="Brilliant" price={199} description="Bedste vask året rundt" selectedCard={selectedMembership === "Brilliant"} onSelect={setSelectedMembership} />
                            <MembershipCard membership="Enkeltvask" price={0} description="Køb enkeltvis vask ved vaskehallen fra 59 kr" selectedCard={selectedMembership === "Enkeltvask"} onSelect={setSelectedMembership} />
                        </div>
                        <Button className="justify-center" onClick={() => setActiveDialogBox(true)}>Bekræft skift</Button>
                    </div>
                </div>
            </main>

            {activeDialogBox && (
                <DialogModal
                    dialogMessage="Er du sikker på, at du vil skifte medlemskab?"
                    buttonText="Skift medlemskab"
                    onCancel={() => setActiveDialogBox(false)}
                    onConfirm={() => handleUpdate()}
                />
            )}
        </>
    )
}
