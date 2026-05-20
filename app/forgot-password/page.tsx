"use client"

//hooks
import { useForm } from "react-hook-form"
import { useState } from 'react'

//components
import Input from "@/components/Input"
import Button from "@/components/Button"
import Error from "@/components/Error"

//definerer typen af værdi i email inputfelt
type ForgotPasswordFormData = {
    email: string
}

export default function ForgotPassword() {
    // success state bruges til at skifte siden til en bekræftelsesbesked
    // når emailen er sendt succesfuldt
    const [success, setSuccess] = useState(false)

    // useForm håndterer al form logik — validering, fejlbeskeder og værdier
    // mode: "onTouched" betyder at validering kører når brugeren forlader et felt
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
    } = useForm<ForgotPasswordFormData>({ mode: "onTouched" })

    // watch lytter på email i realtid
    // bruges til at disable send knappen hvis feltet er tomt
    const [watchEmail] = watch(["email"])

    // onSubmit kaldes kun hvis react-hook-form validering er bestået
    const onSubmit = async (formData: ForgotPasswordFormData) => {
        // FormData bruges fordi Flask forventer form data og ikke JSON
        const data = new FormData()
        data.append('email', formData.email)

        // Send request til Flask backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api-forgot-password`, {
            method: 'POST',
            body: data
        })

        const json = await response.json()

        // Hvis Flask returnerer en fejl (fx email ikke fundet)
        // sættes fejlen på 'root' så den vises under inputfeltet
        if (!response.ok) {
            setError('root', { message: json.error })
            return
        }
        // Sæt success til true så siden skifter til bekræftelsesbesked
        setSuccess(true)
    } 

    // Hvis emailen er sendt succesfuldt vises en bekræftelsesbesked
    // i stedet for formen — dette er bedre UX end at redirecte
    if (success) return (
        <main className="mx-xs my-lg">
            <p>Tjek din e-mail — vi har sendt dig et link til at nulstille din adgangskode.</p>
        </main>
        )

    return (
        <main className="mx-xs my-lg flex flex-col gap-s">
            <div className="flex flex-col gap-2xs">
                <h1 className="font-extrabold text-3xl">Glemt adgangskode</h1>
                <p>Indtast din e-mail, så sender vi dig en e-mail til at nulstille din adgangskode.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className="py-3xs">
                {errors.root && <Error>{errors.root.message}</Error>}
                </div>
                <Button type="submit" disabled={!watchEmail}>Send</Button>
            </form>
        </main>
    )
}