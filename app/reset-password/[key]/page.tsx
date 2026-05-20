"use client"

// Hooks
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

// Components
import Input from "@/components/Input"
import Button from "@/components/Button"

// Next
import Image from "next/image"
import Link from "next/link"

type ResetPasswordFormData = {
    password: string
    confirm_password: string
}

export default function ResetPassword() {
    const { key } = useParams()
    const [valid, setValid] = useState(false)
    const [resetError, setResetError] = useState('')
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
    } = useForm<ResetPasswordFormData>({ mode: "onTouched" })

    const [watchPassword, watchConfirmPassword] = watch(["password", "confirm_password"])

    useEffect(() => {
        const validateKey = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${key}`)
            const data = await response.json()
            if (!response.ok) {
                setResetError('Link til nulstilling af adgangskode er udløbet')
                return
            }
            setValid(true)
        }
        validateKey()
    }, [key])

    const onSubmit = async (formData: ResetPasswordFormData) => {
        const data = new FormData()
        data.append('password', formData.password)
        data.append('confirm-password', formData.confirm_password)
        data.append('key', key as string)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api-reset-password`, {
            method: 'POST',
            body: data
        })

        const json = await response.json()

        if (!response.ok) {
            setError('root', { message: json.error })
            return
        }
        setSuccess(true)
    }

    if (resetError) return <main><p>{resetError}</p></main>
    if (!valid) return <main><p>Validerer link...</p></main>
    if (success) return (
        <main className="mx-xs py-lg flex flex-col gap-s h-screen justify-between">
            <div></div>
            <div className="flex flex-col gap-xs">
                <Image className="self-center" src="/icons/check_large.svg" alt="large check icon" width={150} height={150} />
                <p className="text-center">Din adgangskode er ændret.</p>
                <p className="text-center">Du kan nu logge ind.</p>
            </div>
            <Button href="/login">Klik her for at logge ind</Button>
        </main>
    )

    return (
        <main className="mx-xs my-lg flex flex-col gap-s">
            <h1 className="font-extrabold text-3xl">Opret ny adgangskode</h1>
            <form className="flex flex-col h-[70vh] justify-between" onSubmit={handleSubmit(onSubmit)}>
                <legend className="flex flex-col gap-s">
                    <Input
                        id="password"
                        label="Ny adgangskode"
                        placeholder="Ny adgangskode"
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
                        label="Gentag ny adgangskode"
                        placeholder="Gentag ny adgangskode"
                        type="password"
                        showRequired
                        error={errors.confirm_password?.message}
                        {...register("confirm_password", {
                            required: "Gentag ny adgangskode er påkrævet",
                            validate: (value) => value === watchPassword || "Adgangskoderne matcher ikke"
                        })}
                    />
                </legend>
                {errors.root && <p>{errors.root.message}</p>}
                <Button type="submit" disabled={!watchPassword || !watchConfirmPassword}>Gem ny adgangskode</Button>
            </form>
        </main>
    )
}