"use client"

import { useSignUp } from "../hooks/useSignup";
import Label from "@/components/Label";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Card from "@/components/Card";
import PaymentCard from "@/components/PaymentCard";
import { useState } from "react";

export default function Signup() {
    const { signUp, isLoading, error, message } = useSignUp()
    const [selectedMembership, setSelectedMembership] = useState("")
    const [selectedPayment, setSelectedPayment] = useState("")

    // Handles form submission by preventing the default page reload,
    // collecting all form input values into a FormData object,
    // and sending them to the backend via the signUp hook.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        await signUp(formData)
    }

    return (
        <main className="m-2xs">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-xs">
                    <Card membership="Guld" price={139} description="God og effektiv" selectedCard={selectedMembership === "Guld"} onSelect={setSelectedMembership} />
                    <Card membership="Premium" price={169} description="Ekstra grundig" selectedCard={selectedMembership === "Premium"} onSelect={setSelectedMembership} showBadge />
                    <Card membership="Brilliant" price={199} description="Bedste vask året rundt" selectedCard={selectedMembership === "Brilliant"} onSelect={setSelectedMembership} />
                    <Card membership="Enkeltvask" price={0} description="Køb enkeltvis vask ved vaskehallen fra 59 kr" selectedCard={selectedMembership === "Enkeltvask"} onSelect={setSelectedMembership} />
                    {/* Hidden input so FormData picks up the chosen membership */}
                    <input type="hidden" name="membership" value={selectedMembership} />
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
                <Label htmlFor="payment" required>Vælg betalingsmetode</Label>
                <div className="flex gap-xs">
                    <PaymentCard image="mobilepay" selectedCard={selectedPayment === 'mobilepay'} onSelect={setSelectedPayment} />
                    <PaymentCard image="applepay" selectedCard={selectedPayment === 'applepay'} onSelect={setSelectedPayment} />
                    {/* Hidden input so FormData picks up the chosen payment */}
                    <input type="hidden" name="payment" value={selectedPayment} />
                </div>
                <Button type="submit">Sign up</Button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {message && <p>{message}</p>}
        </main>
    )
}