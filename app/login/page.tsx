"use client"

//hooks
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"

//types
import { LoginFormData } from "@/types/login"

//components
import Input from "@/components/Input"
import Error from "@/components/Error"
import Button from "@/components/Button"

//next
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter()

    //useForm håndterer al form logik
    //mode: onTouched betyder at validering kører efter brugeren forlader et felt
    const {
        register, // forbinder inputs til react-hook-form
        handleSubmit, // wrapper der validerer formen før onSubmit kaldes
        watch, // lytter på feltværdier i realtid
        setError, // bruges til at sætte fejlbeskeder manuelt (fx fra API)
        formState: { errors } // indeholder alle aktive fejlbeskeder
    } = useForm<LoginFormData>({ mode: "onTouched" })

    // watch lytter på email og password i realtid
    // bruges til at disable login knappen hvis felterne er tomme
    const [watchEmail, watchPassword] = watch(["email", "password"])

    // onSubmit kaldes kun hvis react-hook-form validering er bestået
    const onSubmit = async (formData: LoginFormData) => {
        // FormData bruges fordi Flask forventer form data og ikke JSON
        const data = new FormData()
        data.append('email', formData.email)
        data.append('password', formData.password)

        // Send login request til Flask backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api-login`, {
            method: 'POST',
            body: data
        })

        const json = await response.json()

        // Hvis Flask returnerer en fejl (fx forkert adgangskode)
        // sættes fejlen på 'root' så den vises under password feltet
        if (!response.ok) {
            if(json.error === "Please verify your email before logging in") {
                setError("root", {type: "server", message: "Bekræft venligst din email, inden du logger ind. Tjek din mail."})
            } else {
                setError("root", {type:"server", message:"Forkert email eller adgangskode"})
            }
            return
        }

        // Gem JWT token i localStorage så det kan bruges i efterfølgende requests
        localStorage.setItem('token', json.access_token)
        // Send brugeren videre til kortsiden efter succesfuldt login
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
                                minLength: { value: 8, message: "Adgangskode skal være mindst 8 tegn" },
                                maxLength: { value: 50, message: "Adgangskode må maksimum være 50 tegn" }
                            })}
                        />
                        <div className="pt-3xs">
                            {errors.root && <Error>{errors.root.message}</Error>}
                        </div>
                        <Link className="font-extrabold text-green-white-background text-sm self-end" href="/forgot-password">Glemt adgangskode?</Link>
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