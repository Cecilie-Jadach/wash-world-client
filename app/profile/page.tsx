"use client"

// Hooks
import { useState } from "react"
import { useUser } from "@/app/hooks/useUser"
import { useAuth } from "@/app/hooks/useAuth"
import { useMembership } from "@/app/hooks/useMembership"

// Components
import Button from "@/components/Button"
import Input from "@/components/Input"
import DialogModal from "@/components/DialogModal"
import LicensePlates from "@/components/LicensePlates"
import MembershipStatusCard from "@/components/MembershipStatusCard"
import IfNotUser from "@/components/IfNotUser"

export default function Profile() {
    const { data: user } = useUser()
    const { reactivateMutation } = useMembership()
    const { handleLogout, deleteUserMutation } = useAuth()
    const [activeDialogBox, setActiveDialogBox] = useState(false)

    if (!user) return <IfNotUser />

    const membershipStatus = user.membership_paused_at > 0 ? 'paused' : 'active'

    return (
        <>
            <div className="mx-2xs mt-xl pb-4xl flex flex-col gap-lg">

                {/* Dine oplysninger */}
                <div className="flex flex-col gap-s">
                    <h2 className="text-xl font-extrabold">Dine oplysninger</h2>
                    <div className="flex flex-col gap-s bg-grey-5 border-b border-b-grey-10 p-s">
                        <Input
                            id="email"
                            label="E-mail"
                            placeholder={user.user_email}
                            readOnly
                        />
                        <Input
                            id="phone"
                            label="Mobilnummer"
                            phoneLabel="+45"
                            placeholder={user.user_phone}
                            readOnly
                        />
                        <Input
                            id="primary_location"
                            label="Primær vaskehal"
                            placeholder={user.user_primary_location}
                            readOnly
                        />
                    </div>
                    <Button href="/edit-profile-information">Rediger dine oplysninger</Button>
                </div>

                {/* Dit medlemskab */}
                <div className="flex flex-col gap-s">
                    <h2 className="text-xl font-extrabold">Dit medlemskab</h2>
                    <MembershipStatusCard user={user} membershipStatus={membershipStatus} />
                    <Button href="/membership">Rediger medlemskab</Button>
                </div>

                {/* Dine biler */}
                <div className="flex flex-col gap-s">
                    <h2 className="text-xl font-extrabold">Dine biler</h2>
                    <LicensePlates />
                    <Button href="/edit-license-plates">Rediger biler</Button>
                </div>

                {/* Betalingsoplysninger */}
                <div className="flex flex-col gap-s">
                    <h2 className="text-xl font-extrabold">Betalingsoplysninger</h2>
                    <div className="flex flex-col gap-2xs">
                        <p>Dine kortoplysninger er tilknyttet {user.user_payment_method}.</p>
                        <p>Ønsker du at ændre dine oplysninger, skal dette gøres direkte i {user.user_payment_method}.</p>
                    </div>
                </div>

                {/* Log ud og slet profil */}
                <div className="flex flex-col gap-sm">
                    <Button variant="dark" icon={false} onClick={handleLogout}>Log ud</Button>
                    <p onClick={() => setActiveDialogBox(true)} className="text-error-red font-extrabold cursor-pointer">Slet profil</p>
                </div>

            </div>

            {activeDialogBox && (
                <DialogModal
                    dialogMessage="Er du sikker på, at du vil slette din profil?"
                    buttonText="Slet profil"
                    onCancel={() => setActiveDialogBox(false)}
                    onConfirm={() => deleteUserMutation.mutate()}
                />
            )}
        </>
    )
}
