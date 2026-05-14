"use client"

import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { LoginFormData } from "@/types/login"
import Input from "@/components/Input"
import Error from "@/components/Error"
import Button from "@/components/Button"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
    } = useForm<LoginFormData>({ mode: "onTouched" })

    const [watchEmail, watchPassword] = watch(["email", "password"])

    const onSubmit = async (formData: LoginFormData) => {
        const data = new FormData()
        data.append('email', formData.email)
        data.append('password', formData.password)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
            method: 'POST',
            body: data
        })

        const json = await response.json()

        if (!response.ok) {
            // Sæt fejl direkte på feltet i stedet for en separat state
            setError('root', { message: json.error })
            return
        }

        localStorage.setItem('token', json.access_token)
        router.push('/map')
    }

    return (
        <main className="mx-xs my-lg flex flex-col gap-s">
            <h1 className="font-extrabold text-3xl">Login</h1>
            <form className="flex flex-col h-[80vh] justify-between" onSubmit={handleSubmit(onSubmit)}>
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
                    <div className="flex flex-col">
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
                        <div className="pt-3xs">
                        {errors.root && <Error>{errors.root.message}</Error>}
                        </div>
                <Link className="font-extrabold text-green-white-background text-sm self-end" href="">Glemt adgangskode?</Link>
                </div>
                </div>
                <div className="flex gap-s">
                <Button href="/" variant="secondary" icon={false}>Tilbage</Button>
                <Button className="grow" type="submit" disabled={!watchEmail || !watchPassword}>
                    Log ind
                </Button>
                </div>
            </form>
        </main>
    )
}