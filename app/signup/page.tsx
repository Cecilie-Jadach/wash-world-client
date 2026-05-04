"use client"

import { useSignUp } from "../hooks/useSignup";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";

export default function Signup() {
    const { signUp, isLoading, error, message } = useSignUp()

    // Handles form submission by preventing the default page reload,
    // collecting all form input values into a FormData object,
    // and sending them to the backend via the signUp hook.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        await signUp(formData)
    }

    return (
        <main className="m-4">
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="radio" id="membership" name="membership" value="gold" />
                    <label htmlFor="membership">Gold</label><br />
                </div>
                <Input
                    id="email"
                    name="email"
                    label="E-mail"
                    placeholder="Din e-mail"
                    type="email"
                    required
                />
                <Input
                    id="password"
                    name="password"
                    label="Adgangskode"
                    placeholder="Din adgangskode"
                    type="text"
                    required
                />
                <Input
                    id="phone"
                    name="phone"
                    label="Mobilnummer"
                    phoneLabel="+45"
                    type="tel"
                    inputMode="numeric"
                    onChange={(e) => e.target.value = e.target.value.replace(/\D/g, "")}
                    required
                />
                <Input
                    id="license_plate"
                    name="license_plate"
                    label="Nummerplade"
                    placeholder="AB12345"
                    type="text"
                    showLicensePlate
                    required
                />
                <Checkbox
                    id="terms_accepted"
                    name="terms_accepted"
                    label={<span>Jeg accepterer Wash Worlds <a className="underline" href="https://washworld.dk/vilkaar" target="_blank">vilkår</a></span>}
                    required
                />
                <div>
                    <input type="radio" id="payment" name="payment" value="mobilepay" />
                    <label htmlFor="payment">Mobilepay</label><br />
                </div>
                <Button type="submit">Sign up</Button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {message && <p>{message}</p>}
        </main>
    )
}