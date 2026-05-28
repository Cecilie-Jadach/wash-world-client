"use client"

// Next
import Image from "next/image"

// Hooks
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSignUp } from "../hooks/useSignup"
import { useLocations } from "../hooks/useLocations"

// Types
import { SignupFormData } from "@/types/signup"

// Components
import Label from "@/components/Label"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Checkbox from "@/components/Checkbox"
import MembershipCard from "@/components/MembershipCard"
import PaymentCard from "@/components/PaymentCard"
import Error from "@/components/Error"
import MembershipIndicator from "@/components/MembershipIndicatior"

const TOTAL_STEPS = 8;

// Fields to validate on each step before allowing the user to proceed
const stepFields: Partial<Record<number, (keyof SignupFormData)[]>> = {
    2: ["email", "confirm_email"],
    3: ["password", "confirm_password"],
    4: ["phone"],
    5: ["license_plate"],
    6: ["primary_location"],
    7: ["terms_accepted"],
}

// The 4 visual stages shown in the progress indicator
const progressStages = ["Medlemskab", "Oplysninger", "Betaling", "Bekræftelse"]

// Converts the current step (1-8) to a stage index (0-3) for the progress indicator
const getStageIndex = (step: number) => {
    if (step <= 1) return 0
    if (step <= 6) return 1
    if (step <= 8) return 2
    return 3
}

export default function Signup() {
    const { signUp, error, isPending } = useSignUp();
    const [selectedMembership, setSelectedMembership] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("");
    const [step, setStep] = useState(1);
    const { data } = useLocations();

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        setError,
        formState: { errors }
    } = useForm<SignupFormData>({ mode: "onTouched" })

    // Watch field values in real time to enable/disable the next button
    const [watchEmail, watchConfirmEmail, watchPassword, watchConfirmPassword, watchPhone, watchLicensePlate, watchLocation, watchTerms] =
        watch(["email", "confirm_email", "password", "confirm_password", "phone", "license_plate", "primary_location", "terms_accepted"])

    // Set the currentStage
    const currentStage = getStageIndex(step)

    // Returns true if the current step's requirements are met
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

    // Validates the current step's fields before moving to the next step
    const handleNext = async () => {
        const fields = stepFields[step]
        if (fields) {
            const results = await Promise.all(fields.map(f => trigger(f)))
            if (results.some(r => !r)) return
        }
        setStep(s => s + 1)
    }

    // Builds the form data and sends it to the backend on final submission
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
        try {
            await signUp(formData)
            setStep(9)
            // If the error message contains "already exist", it means the backend has rejected the submission due to a duplicate email, phone, or license plate. 
            // We catch this and set the appropriate field error and navigate back to the relevant step.
        } catch (error) {
            const message = (error as Error).message
            if (message === "E-mail already exist") {
                setStep(2)
                setError("email", { type: "server", message: "E-mail er allerede i brug" })
            } else if (message === "Phonenumber already exist") {
                setStep(4)
                setError("phone", { type: "server", message: "Mobilnummer er allerede i brug" })
            } else if (message === "License plate already exist") {
                setStep(5)
                setError("license_plate", { type: "server", message: "Nummerplade er allerede i brug" })
            }
        }
    }

    return (
        <main className="m-2xs pb-xl">
            {/* Progress indicator */}
            <div className="flex items-baseline gap-2xs mb-s">
                {progressStages.map((label, i) => (
                    <span key={label} className="flex items-center gap-2xs">
                        <span className={`text-xs uppercase ${i === currentStage ? "font-extrabold text-black" : "font-medium text-grey-40"}`}>
                            {label}
                        </span>
                        {i < progressStages.length - 1 && (
                            <Image src="/icons/chevron_grey_icon.svg" alt="Grey chevron" height={7} width={7} />
                        )}
                    </span>
                ))}
            </div>

            {/* Signup form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-xs">

                {/* Step 1: Membership */}
                {step === 1 && (
                    <div>
                        <h2 className="font-extrabold text-3xl mb-s">Medlemskaber</h2>
                        <div className="flex flex-col gap-s">
                            <MembershipCard membership="Guld" price={139} description="God og effektiv" selectedCard={selectedMembership === "Guld"} onSelect={setSelectedMembership} />
                            <MembershipCard membership="Premium" price={169} description="Ekstra grundig" selectedCard={selectedMembership === "Premium"} onSelect={setSelectedMembership} showMembershipBadge />
                            <MembershipCard membership="Brilliant" price={199} description="Bedste vask året rundt" selectedCard={selectedMembership === "Brilliant"} onSelect={setSelectedMembership} />
                            <MembershipCard membership="Enkeltvask" price={0} description="Køb enkeltvis vask ved vaskehallen fra 59 kr" selectedCard={selectedMembership === "Enkeltvask"} onSelect={setSelectedMembership} />
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
                                    minLength: { value: 8, message: "Adgangskode skal være mindst 8 tegn" },
                                    maxLength: { value: 50, message: "Adgangskode må maksimum være 50 tegn" }
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
                                    required: "Gentag adgangskode er påkrævet",
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
                                {...register("access_to_all_washes", {
                                    onChange: () => trigger("terms_accepted")
                                })}
                            />
                            <Checkbox
                                id="terms_accepted"
                                showRequired
                                error={errors.terms_accepted?.message}
                                label={<span>Jeg accepterer Wash Worlds <a className="underline" href="https://washworld.dk/vilkaar" target="_blank">vilkår</a></span>}
                                {...register("terms_accepted", {
                                    required: "Accepteret vilkår er påkrævet",
                                    onChange: () => trigger("terms_accepted")
                                })}
                            />
                            <Checkbox
                                id="offers_accepted"
                                label={<span>Jeg accepterer, at Wash World må sende mig tilbud.</span>}
                                {...register("offers_accepted", {
                                    onChange: () => trigger("terms_accepted")
                                })}
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
                                <PaymentCard image="Mobilepay" selectedCard={selectedPayment === 'Mobilepay'} onSelect={setSelectedPayment} />
                                <PaymentCard image="Applepay" selectedCard={selectedPayment === 'Applepay'} onSelect={setSelectedPayment} />
                            </div>
                        </div>
                    </div>

                )}

                {/* Step 9: Confirmation */}
                {step === 9 && (
                    <div>
                        <div>
                            <h2 className="text-xl mb-s">Bekræft din e-mail</h2>
                            <div className="flex flex-col gap-xs">
                                <p>Vi har sendt en bekræftelsesmail til <strong>{watchEmail}</strong>.</p>
                                <p>Klik på linket i mailen for at aktivere din konto.</p>
                                <p>Tjek eventuelt din spam-mappe, hvis du ikke kan finde den.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Button navigation */}
                <div className="flex gap-xs mt-s">
                    {step > 1 && step < 9 && (
                        <Button variant="secondary" icon={false} onClick={() => setStep(s => s - 1)}>Tilbage</Button>
                    )}
                    {step < TOTAL_STEPS ? (
                        <Button onClick={handleNext} disabled={!canProceed()}>Næste</Button>
                    ) : step === TOTAL_STEPS ? (
                        <Button type="submit" disabled={isPending || !canProceed()}>{isPending ? "Behandler..." : "Start nu"}</Button>
                    ) : null}
                </div>
            </form>

            {/* Only show backend errors that are not duplicate errors — those are shown as field errors instead */}
            {error && !error.message.includes("already exist") && <Error>{error.message}</Error>}
        </main>
    )
}
