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
import ToggleNotification from "@/components/ToggleNotification"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function Profile() {
    const { data: user, isPending } = useUser()
    const { reactivateMutation } = useMembership()
    const { handleLogout, deleteUserMutation } = useAuth()
    const [activeDialogBox, setActiveDialogBox] = useState(false)

    if (isPending) return (
        <LoadingSpinner />
    )

    if (!user) return <IfNotUser />

    const membershipStatus = user.membership_paused_at > 0 ? 'paused' : 'active'

    return (
        <>
            <div className="mt-xl mx-xs pb-4xl">

                <div className="grid gap-lg">
                    {/* Dine oplysninger */}
                    <div className="grid gap-xs">
                        <h1 className="font-extrabold text-3xl">Profil</h1>
                        <h2 className="text-xl font-extrabold">Dine oplysninger</h2>
                        <div className="grid gap-s bg-grey-5 border-b border-b-grey-10 p-s">
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
                    <div className="grid gap-xs">
                        <h2 className="text-xl font-extrabold">Dit medlemskab</h2>
                        <MembershipStatusCard user={user} membershipStatus={membershipStatus} />
                        <Button href="/membership?from=profile">Rediger medlemskab</Button>
                    </div>

                    {/* Dine biler */}
                    <div className="grid gap-xs">
                        <h2 className="text-xl font-extrabold">Dine biler</h2>
                        <LicensePlates />
                        <Button href="/edit-license-plates">Rediger biler</Button>
                    </div>

                    {/* Betalingsoplysninger */}
                    <div className="grid gap-xs">
                        <h2 className="text-xl font-extrabold">Betalingsoplysninger</h2>
                        <div className="grid gap-2xs">
                            <p>Dine kortoplysninger er tilknyttet {user.user_payment_method}.</p>
                            <p>Ønsker du at ændre dine oplysninger, skal dette gøres direkte i {user.user_payment_method}.</p>
                        </div>
                    </div>

                    {/* Toggle Notifikationer */}
                    <div className="grid gap-xs">
                        <h2 className="text-xl font-extrabold">App-instillinger</h2>
                        <div className="flex justify-between gap-3xs bg-grey-5 p-s border-b border-b-grey-10">
                            <p className="font-extrabold">Notifikationer</p>
                            <ToggleNotification />
                        </div>
                    </div>

                    {/* Log ud og slet profil */}
                    <div className="grid gap-sm">
                        <Button variant="dark" icon={false} onClick={handleLogout}>Log ud</Button>
                        <p onClick={() => setActiveDialogBox(true)} className="text-error-red font-extrabold cursor-pointer">Slet profil</p>
                    </div>
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
