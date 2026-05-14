"use client"

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { useUser } from "@/app/hooks/useUser";
import { useLocations } from "../hooks/useLocations";

export default function EditProfileInformation() {
    const { data: user } = useUser();
    const { data } = useLocations();

    if (!user) return null;

    return (
        <div className="mx-2xs mt-xl pb-4xl flex flex-col gap-ml">
            {/* Go back arrow */}
            <Image src="/icons/arrow_left_icon.svg" alt="Arrow left icon" height={20} width={20} />

            {/* Dine oplysninger */}
            <div className="flex flex-col gap-s">
                <h2 className="text-xl font-extrabold">Dine oplysninger</h2>
                <div className="flex flex-col gap-s bg-grey-5 border-b border-b-grey-10 p-s">
                    <Input
                        id="email"
                        label="E-mail"
                        placeholder={user.user_email}
                        bgWhite
                    />
                    <Input
                        id="phone"
                        label="Mobilnummer"
                        phoneLabel="+45"
                        placeholder={user.user_phone}
                        bgWhite
                    />
                    <div className="flex flex-col gap-3xs text-md">
                        <Label htmlFor="primary_location">Primær vaskehal</Label>
                        <div className="relative">
                            <select
                                id="primary_location"
                                className="w-full appearance-none border-b border-grey-10 bg-white px-2xs py-xs outline-none"
                            >
                                <option value="">{user.user_primary_location}</option>
                                {(data ?? []).map((location) => (
                                    <option key={location.location_name} value={location.location_name}>
                                        {location.location_name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-2xs top-[50%] translate-y-[-50%] pointer-events-none">
                                <Image src="/icons/chevron_green_icon.svg" alt="Green chevron" height={13} width={13} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button>Gem ændringer</Button>
        </div>
    )
}
