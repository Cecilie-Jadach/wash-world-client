"use client"
//Hooks 
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useUser } from "@/app/hooks/useUser"
import { useLocations } from "@/app/hooks/useLocations"
import { useUpdateUser } from "@/app/hooks/useUpdateUser"

//Components
import Button from "@/components/Button"
import Input from "@/components/Input"
import Label from "@/components/Label"
import Error from "@/components/Error"
import ReturnArrow from "@/components/ReturnArrow"

//React
import toast from "react-hot-toast"

//Next
import Image from "next/image"
import { useRouter } from "next/navigation"

// Matches the field names the backend expects on PATCH /users/update
type EditFormData = {
    email: string;
    phone: string;
    primary_location: string;
}

export default function EditProfileInformation() {
    const { data: user } = useUser();
    const { data } = useLocations();
    const { updateUser, error } = useUpdateUser();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty }
    } = useForm<EditFormData>({ mode: "onTouched" });

    // Pre-fill the inputs with the user's current values when data is ready
    useEffect(() => {
        if (user) {
            reset({
                email: user.user_email,
                phone: user.user_phone,
                primary_location: user.user_primary_location,
            });
        }
    }, [user, reset]);

    // Don't render the form until we have the user data to fill it with
    if (!user) return null

    const onSubmit = async (data: EditFormData) => {
        try {
            await updateUser(data);
            toast.success("Ændringer gemt");
            // Go back to the profile page after a successful save
            router.push("/profile");
        } catch {
            toast.error("Ændringer kunne ikke gemmes");
        }
    };

    return (
        <div className="mt-xl mx-xs pb-4xl">
            <div className="grid gap-ml">
                <ReturnArrow />
                {/* Dine oplysninger */}
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-sm">
                    <div className="grid gap-xs">
                        <h2 className="text-xl font-extrabold">Dine oplysninger</h2>
                        <div className="grid gap-s bg-grey-5 border-b border-b-grey-10 p-s">
                            <Input
                                id="email"
                                label="E-mail"
                                type="email"
                                error={errors.email?.message}
                                bgWhite
                                {...register("email", {
                                    required: "E-mail er påkrævet",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Ugyldig e-mail" }
                                })}
                            />
                            <Input
                                id="phone"
                                label="Mobilnummer"
                                phoneLabel="+45"
                                type="tel"
                                inputMode="numeric"
                                error={errors.phone?.message}
                                bgWhite
                                {...register("phone", {
                                    required: "Mobilnummer er påkrævet",
                                    minLength: { value: 8, message: "Mobilnummer skal være 8 cifre" },
                                    maxLength: { value: 8, message: "Mobilnummer skal være 8 cifre" },
                                    pattern: { value: /^[0-9]*$/, message: "Kun tal er tilladt" },
                                    // Strip any non-digit characters as the user types
                                    onChange: (e) => { e.target.value = e.target.value.replace(/\D/g, "") }
                                })}
                            />
                            <div className="grid gap-3xs text-md">
                                <Label htmlFor="primary_location">Primær vaskehal</Label>
                                <div className="relative">
                                    <select
                                        id="primary_location"
                                        className="w-full appearance-none border-b border-grey-10 bg-white px-2xs py-xs outline-none"
                                        {...register("primary_location", {
                                            required: "Primær vaskehal er påkrævet"
                                        })}
                                    >
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
                                {errors.primary_location && <Error>{errors.primary_location.message}</Error>}
                            </div>
                        </div>
                    </div>

                    {error && <Error>{error.message}</Error>}

                    {/* Disabled until the user changes at least one field */}
                    <Button type="submit" disabled={!isDirty}>
                        Gem ændringer
                    </Button>
                </form>
            </div>
        </div>
    );
}
