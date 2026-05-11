"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignUp } from "../hooks/useSignup";
import { Location } from "@/types/location";
import { SignupFormData } from "@/types/signup"
import Label from "@/components/Label";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Card from "@/components/Card";
import PaymentCard from "@/components/PaymentCard";
import Error from "@/components/Error";
import MembershipIndicator from "@/components/MembershipIndicatior";

const TOTAL_STEPS = 8;

const stepField: Partial<Record<number, keyof SignupFormData>> = {
    2: "email",
    3: "password",
    4: "phone",
    5: "license_plate",
    6: "primary_location",
    7: "terms_accepted",
}

export default function Signup() {
    const { signUp, isLoading, error, message } = useSignUp()
    const [selectedMembership, setSelectedMembership] = useState("")
    const [selectedPayment, setSelectedPayment] = useState("")
    const [locations, setLocations] = useState<Location[]>([]);
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors }
    } = useForm<SignupFormData>({ mode: "onTouched" })

    const [watchEmail, watchConfirmEmail, watchPassword, watchConfirmPassword, watchPhone, watchLicensePlate, watchLocation, watchTerms] =
        watch(["email", "confirm_email", "password", "confirm_password", "phone", "license_plate", "primary_location", "terms_accepted"])

    const canProceed = (): boolean => {
        switch (step) {
            case 1: return !!selectedMembership
            case 2: return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchEmail ?? "") && watchConfirmEmail === watchEmail
            case 3: return (watchPassword?.length ?? 0) >= 8 && watchConfirmPassword === watchPassword
            case 4: return (watchPhone?.length ?? 0) === 8 && /^[0-9]*$/.test(watchPhone ?? "")
            case 5: return /^[A-Z]{2}\d{5}$/.test(watchLicensePlate ?? "")
            case 6: return !!watchLocation
            case 7: return !!watchTerms
            case 8: return !!selectedPayment
            default: return true
        }
    }

    const handleNext = async () => {
        if (step === 2) {
            const [validEmail, validConfirm] = await Promise.all([trigger("email"), trigger("confirm_email")])
            if (!validEmail || !validConfirm) return
        } else if (step === 3) {
            const [validPassword, validConfirm] = await Promise.all([trigger("password"), trigger("confirm_password")])
            if (!validPassword || !validConfirm) return
        } else {
            const field = stepField[step]
            if (field) {
                const valid = await trigger(field)
                if (!valid) return
            }
        }
        setStep(s => s + 1)
    }

    const onSubmit = async (data: SignupFormData) => {
        const formData = new FormData()
        formData.append("membership", selectedMembership)
        formData.append("payment", selectedPayment)
        formData.append("email", data.email)
        formData.append("confirm_email", data.confirm_email)
        formData.append("password", data.password)
        formData.append("confirm_password", data.confirm_password)
        formData.append("phone", data.phone)
        formData.append("license_plate", data.license_plate)
        formData.append("primary_location", data.primary_location)
        formData.append("terms_accepted", data.terms_accepted ? "1" : "0")
        formData.append("access_to_all_washes", data.access_to_all_washes ? "1" : "0")
        formData.append("offers_accepted", data.offers_accepted ? "1" : "0")
        await signUp(formData)
    }

    useEffect(() => {
        const fetchLocations = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locations`);
            const data = await res.json();
            setLocations(data.locations);
        };
        fetchLocations();
    }, []);

    return (
        <main className="m-2xs pb-xl">
            {/* Progress indicator */}
            <div className="flex items-center gap-2xs mb-s">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${i < step ? "bg-green-white-background" : "bg-grey-10"}`}
                    />
                ))}
            </div>
            <p className="text-sm text-grey-40 mb-xs">Trin {step} af {TOTAL_STEPS}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-xs">

                {/* Step 1: Membership */}
                {step === 1 && (
                    <div>
                        <h1 className="font-extrabold text-3xl mb-s">Medlemskaber</h1>
                        <div className="flex flex-col gap-s">
                            <Card membership="Guld" price={139} description="God og effektiv" selectedCard={selectedMembership === "Guld"} onSelect={setSelectedMembership} />
                            <Card membership="Premium" price={169} description="Ekstra grundig" selectedCard={selectedMembership === "Premium"} onSelect={setSelectedMembership} showBadge />
                            <Card membership="Brilliant" price={199} description="Bedste vask året rundt" selectedCard={selectedMembership === "Brilliant"} onSelect={setSelectedMembership} />
                            <Card membership="Enkeltvask" price={0} description="Køb enkeltvis vask ved vaskehallen fra 59 kr" selectedCard={selectedMembership === "Enkeltvask"} onSelect={setSelectedMembership} />
                        </div>
                    </div>

                )}

                {/* Step 2: Email */}
                {step === 2 && (
                    <div>
                        <MembershipIndicator value={selectedMembership} />
                        <div className="flex flex-col gap-s">
                            <Input
                                id="email"
                                label="E-mail"
                                placeholder="Din e-mail"
                                type="email"
                                showRequired
                                error={errors.email?.message}
                                {...register("email", {
                                    required: "E-mail er påkrævet",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Ugyldig e-mail" }
                                })}
                            />
                            <Input
                                id="confirm_email"
                                label="Gentag e-mail"
                                placeholder="Gentag din e-mail"
                                type="email"
                                showRequired
                                error={errors.confirm_email?.message}
                                {...register("confirm_email", {
                                    required: "Gentag e-mail er påkrævet",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Ugyldig e-mail" },
                                    validate: value => value === watchEmail || "E-mails matcher ikke"
                                })}
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Password */}
                {step === 3 && (
                    <div>
                        <MembershipIndicator value={selectedMembership} />
                        <div className="flex flex-col gap-s">
                            <Input
                                id="password"
                                label="Adgangskode"
                                placeholder="Din adgangskode"
                                type="password"
                                showRequired
                                error={errors.password?.message}
                                {...register("password", {
                                    required: "Adgangskode er påkrævet",
                                    minLength: { value: 8, message: "Adgangskode skal være mindst 8 tegn" }
                                })}
                            />
                            <Input
                                id="confirm_password"
                                label="Gentag adgangskode"
                                placeholder="Gentag din adgangskode"
                                type="password"
                                showRequired
                                error={errors.confirm_password?.message}
                                {...register("confirm_password", {
                                    required: "Adgangskode er påkrævet",
                                    minLength: { value: 8, message: "Adgangskode skal være mindst 8 tegn" },
                                    validate: value => value === watchPassword || "Adgangskoder matcher ikke"
                                })}
                            />
                        </div>
                    </div>

                )}

                {/* Step 4: Phone */}
                {step === 4 && (
                    <div>
                        <MembershipIndicator value={selectedMembership} />
                        <Input
                            id="phone"
                            label="Mobilnummer"
                            phoneLabel="+45"
                            type="tel"
                            inputMode="numeric"
                            showRequired
                            error={errors.phone?.message}
                            {...register("phone", {
                                required: "Mobilnummer er påkrævet",
                                minLength: { value: 8, message: "Mobilnummer skal være 8 cifre" },
                                maxLength: { value: 8, message: "Mobilnummer skal være 8 cifre" },
                                pattern: { value: /^[0-9]*$/, message: "Kun tal er tilladt" },
                                onChange: (e) => { e.target.value = e.target.value.replace(/\D/g, "") }
                            })}
                        />
                    </div>

                )}

                {/* Step 5: License plate */}
                {step === 5 && (
                    <div>
                        <MembershipIndicator value={selectedMembership} />
                        <Input
                            id="license_plate"
                            label="Nummerplade"
                            placeholder="AB12345"
                            type="text"
                            showLicensePlate
                            showRequired
                            error={errors.license_plate?.message}
                            {...register("license_plate", {
                                required: "Nummerplade er påkrævet",
                                pattern: { value: /^[A-Z]{2}\d{5}$/, message: "Nummerplade skal være 2 bogstaver og 5 tal (fx AB12345)" },
                                onChange: (e) => { e.target.value = e.target.value.toUpperCase() }
                            })}
                        />
                    </div>

                )}

                {/* Step 6: Location */}
                {step === 6 && (
                    <div>
                        <MembershipIndicator value={selectedMembership} />
                        <div className="flex flex-col gap-3xs text-md">
                            <Label htmlFor="primary_location" required>Vælg primær vaskehal</Label>
                            <div className="relative">
                                <select
                                    id="primary_location"
                                    className="w-full appearance-none border-b border-grey-10 bg-grey-5 px-2xs py-xs outline-none"
                                    {...register("primary_location", {
                                        required: "Primær vaskehal er påkrævet",
                                    })}
                                >
                                    <option value="">Vælg primær vaskehal</option>
                                    {locations.map((location) => (
                                        <option key={location.location_name} value={location.location_name}>
                                            {location.location_name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-2xs top-[50%] translate-y-[-50%] pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                        <path d="M5.81956 7.45552L0.203156 1.83909C-0.0677186 1.56822 -0.0677186 1.12906 0.203156 0.858213L0.85822 0.203149C1.12863 -0.0672629 1.56689 -0.0677833 1.83794 0.201993L6.31001 4.65312L10.7821 0.201993C11.0531 -0.0677833 11.4914 -0.0672629 11.7618 0.203149L12.4168 0.858213C12.6877 1.12909 12.6877 1.56824 12.4168 1.83909L6.80047 7.45552C6.52959 7.72637 6.09044 7.72637 5.81956 7.45552Z" fill="#06C167" />
                                    </svg>
                                </div>
                            </div>
                            {errors.primary_location && <Error>{errors.primary_location.message}</Error>}
                        </div>
                        <p className="text-md mt-xs">Husk at du kan vaske i alle vaskehaller i Danmark</p>
                    </div>

                )}

                {/* Step 7: Terms and conditions */}
                {step === 7 && (
                    <div>
                        <MembershipIndicator value={selectedMembership} />
                        <p className="mb-m">Tilkøb <strong>fri adgang til alle vaskehaller</strong> og vask i alle vores 130 andre vaskehaller uden ekstra beregning.</p>
                        <div className="flex flex-col gap-xs">
                            <Checkbox
                                id="access_to_all_washes"
                                label={<span>Fri adgang til alle vaskehaller 10 kr/mdr.</span>}
                                {...register("access_to_all_washes")}
                            />
                            <Checkbox
                                id="terms_accepted"
                                showRequired
                                error={errors.terms_accepted?.message}
                                label={<span>Jeg accepterer Wash Worlds <a className="underline" href="https://washworld.dk/vilkaar" target="_blank">vilkår</a></span>}
                                {...register("terms_accepted", {
                                    required: "Accepteret vilkår er påkrævet"
                                })}
                            />
                            {errors.terms_accepted && <Error>{errors.terms_accepted.message}</Error>}
                            <Checkbox
                                id="offers_accepted"
                                label={<span>Jeg accepterer, at Wash World må sende mig tilbud.</span>}
                                {...register("offers_accepted")}
                            />
                        </div>
                    </div>

                )}

                {/* Step 8: Payment */}
                {step === 8 && (
                    <div>
                        <MembershipIndicator value={selectedMembership} />
                        <div className="flex flex-col gap-3xs">
                            <Label htmlFor="payment" required>Vælg betalingsmetode</Label>
                            <div className="flex gap-xs">
                                <PaymentCard image="mobilepay" selectedCard={selectedPayment === 'mobilepay'} onSelect={setSelectedPayment} />
                                <PaymentCard image="applepay" selectedCard={selectedPayment === 'applepay'} onSelect={setSelectedPayment} />
                            </div>
                        </div>
                    </div>

                )}

                {/* Navigation */}
                <div className="flex gap-xs mt-s">
                    {step > 1 && (
                        <Button variant="secondary" icon={false} onClick={() => setStep(s => s - 1)}>Tilbage</Button>
                    )}
                    {step < TOTAL_STEPS ? (
                        <Button onClick={handleNext} disabled={!canProceed()}>Næste</Button>
                    ) : (
                        <Button type="submit" disabled={isLoading || !canProceed()}>Start nu</Button>
                    )}
                </div>
            </form>

            {error && <Error>{error}</Error>}
            {message && <p>{message}</p>}
        </main>
    )
}
