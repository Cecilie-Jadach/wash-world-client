"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useProfile } from "@/app/hooks/useProfile";
import { useUpdateUser } from "@/app/hooks/useUpdateUser";

export default function EditProfileInformation() {
    const router = useRouter();
    const { data: user } = useProfile();
    const updateUser = useUpdateUser();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [primaryLocation, setPrimaryLocation] = useState("");

    useEffect(() => {
        if (user) {
            setEmail(user.user_email);
            setPhone(user.user_phone);
            setPrimaryLocation(user.user_primary_location);
        }
    }, [user]);

    const errorMsg = updateUser.error?.message ?? "";
    const emailError = errorMsg.toLowerCase().includes("email") ? errorMsg : undefined;
    const phoneError = errorMsg.toLowerCase().includes("phone") ? errorMsg : undefined;
    const locationError = errorMsg.toLowerCase().includes("location") ? errorMsg : undefined;
    const genericError = !emailError && !phoneError && !locationError ? errorMsg || undefined : undefined;

    const handleSubmit = () => {
        updateUser.mutate(
            { email, phone, primary_location: primaryLocation },
            { onSuccess: () => router.push("/profile") }
        );
    };

    return (
        <div className="mx-2xs mt-xl pb-4xl flex flex-col gap-ml">
            <a href="/profile">
                <Image src="/icons/arrow_left_icon.svg" alt="Arrow left icon" height={15} width={20} />
            </a>

            <div className="flex flex-col gap-s">
                <h2 className="text-xl font-extrabold">Dine oplysninger</h2>
                <div className="flex flex-col gap-s bg-grey-5 border-b border-b-grey-10 p-s">
                    <Input
                        id="email"
                        label="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                        bgWhite
                    />
                    <Input
                        id="phone"
                        label="Mobilnummer"
                        phoneLabel="+45"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={phoneError}
                        bgWhite
                    />
                    <Input
                        id="primary_location"
                        label="Primær vaskehal"
                        value={primaryLocation}
                        onChange={(e) => setPrimaryLocation(e.target.value)}
                        error={locationError}
                        bgWhite
                    />
                </div>
                {genericError && <p className="text-error-red text-sm">{genericError}</p>}
            </div>

            <Button onClick={handleSubmit} disabled={updateUser.isPending}>
                {updateUser.isPending ? "Gemmer..." : "Gem ændringer"}
            </Button>
        </div>
    );
}
