"use client"

import ReturnArrow from "@/components/ReturnArrow"
import MembershipCard from "@/components/MembershipCard"
import { useState } from "react";

export default function UpdateMembership() {
const [selectedMembership, setSelectedMembership] = useState("");
return (
    <main className="mt-xl mx-xs pb-3xl">
        <ReturnArrow/>
        <h1 className="font-extrabold text-3xl">Skift medlemsskab</h1>
        <p>Dit medlemskab er .... Du kan opdatere dit medlemsskab nedenfor.</p>
        <div className="flex flex-col gap-s">
        <MembershipCard membership="Guld" price={139} description="God og effektiv" selectedCard={selectedMembership === "Guld"} onSelect={setSelectedMembership}/>
        <MembershipCard membership="Premium" price={169} description="Ekstra grundig" selectedCard={selectedMembership === "Premium"} onSelect={setSelectedMembership}/>
        <MembershipCard membership="Brilliant" price={199} description="Bedste vask året rundt" selectedCard={selectedMembership === "Brilliant"} onSelect={setSelectedMembership}/>
        <MembershipCard membership="Enkeltvask" price={0} description="Køb enkeltvis vask ved vaskehallen fra 59 kr" selectedCard={selectedMembership === "Enkeltvask"} onSelect={setSelectedMembership}/>
        </div>
    </main>
)
}
