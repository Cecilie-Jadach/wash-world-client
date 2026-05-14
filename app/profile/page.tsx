"use client"

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import MembershipStatusCard from "@/components/MembershipStatusCard";
import Input from "@/components/Input";
import DeleteModal from "@/components/DeleteModal";
import { useProfile } from "@/app/hooks/useProfile";
import { useAuth } from "@/app/hooks/useAuth";

export default function Profile() {
    const [activeDeleteBox, setActiveDeleteBox] = useState(false);
    const { data: user } = useProfile();
    const { handleLogout, deleteUserMutation } = useAuth();

    return (
        <>
            <div className="mx-2xs mt-xl pb-4xl flex flex-col gap-lg">
                {/* Top section */}
                <div className="flex gap-m">
                    <Image src="/icons/user_icon.svg" alt="User icon" height={60} width={60} />
                    <h1 className="text-3xl font-extrabold">Profil</h1>
                </div>

                {/* Dine oplysninger */}
                <div className="flex flex-col gap-s">
                    <h2 className="text-xl font-extrabold">Dine oplysninger</h2>
                    <div className="flex flex-col gap-s bg-grey-5 border-b border-b-grey-10 p-s">
                        <Input
                            id="email"
                            label="E-mail"
                            placeholder={user?.user_email}
                            readOnly
                        />
                        <Input
                            id="phone"
                            label="Mobilnummer"
                            phoneLabel="+45"
                            placeholder={user?.user_phone}
                            readOnly
                        />
                        <Input
                            id="primary_location"
                            label="Primær vaskehal"
                            placeholder={user?.user_primary_location}
                            readOnly
                        />
                    </div>
                    <Button>Rediger dine oplysninger</Button>
                </div>

                {/* Dit medlemskab */}
                <div className="flex flex-col gap-s">
                    <h2 className="text-xl font-extrabold">Dit medlemskab</h2>
                    <div className="bg-grey-5 border-b border-b-grey-10 p-s">
                        <p>MembershipStatusCard</p>
                    </div>
                    <Button>Rediger medlemskab</Button>
                </div>


                {/* Dine biler */}
                <div className="flex flex-col gap-s">
                    <h2 className="text-xl font-extrabold">Dine biler</h2>
                    <div className="flex flex-col gap-s bg-grey-5 border-b border-b-grey-10 p-s">
                        <Input
                            id="license_plate"
                            label="Nummerplade"
                            placeholder={user?.user_license_plate}
                            showLicensePlate
                            readOnly
                        />
                    </div>
                    <Button>Rediger biler</Button>
                </div>

                {/* Betalingsoplysninger */}
                <div className="flex flex-col gap-s">
                    <h2 className="text-xl font-extrabold">Betalingsoplysninger</h2>
                    <div className="flex flex-col gap-2xs">
                        <p>Dine kortoplysninger er tilknyttet {user?.user_payment_method}.</p>
                        <p>Ønsker du at ændre dine oplysninger, skal dette gøres direkte i {user?.user_payment_method}.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-sm">
                    <Button variant="dark" icon={false} onClick={handleLogout}>Log ud</Button>
                    <p onClick={() => setActiveDeleteBox(true)} className="text-error-red font-extrabold">Slet profil</p>
                </div>

            </div>
            {/* Confirm delete box */}
            {/* Backdrop */}
            <div className={`fixed inset-0 bg-black top-[0] w-full h-full transition-opacity duration-500 ${activeDeleteBox ? 'opacity-30' : 'opacity-0 pointer-events-none'}`} />

            {activeDeleteBox && (
                <DeleteModal
                    deleteMessage="Er du sikker på, at du vil slette din profil?"
                    buttonText="Slet profil"
                    onCancel={() => setActiveDeleteBox(false)}
                    onConfirm={() => deleteUserMutation.mutate()}
                />
            )}
        </>
    )
}
