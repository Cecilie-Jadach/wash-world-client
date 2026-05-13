"use client"

import { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/Button";
import Image from "next/image";

export default function VerifyPage({ params }: { params: Promise<{ key: string }> }) {
    const { key } = use(params)
    const router = useRouter()

    const { isError, error, isSuccess } = useQuery({
        queryKey: ["verify", key],
        retry: false,
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/verify/${key}`)
            if (!res.ok) throw new Error("invalid")
            const data = await res.json()
            if (data.message === "User already verified") throw new Error("already_verified")
            setTimeout(() => router.push("/login"), 3000)
            return data
        }
    })

    // Already verified result
    if (isError) {
        const message = (error as Error).message
        if (message === "already_verified") return (
            <div className="flex flex-col gap-s items-center top-[50%] translate-y-[50%]">
                <p className="text-xl text-center">Din konto er allerede verificeret.</p>
                <Button href="/login">Gå til login</Button>
            </div>
        )
        return <p className="text-xl text-center">Verificering fejlede. Linket er ugyldigt eller udløbet.</p>
    }

    if (!isSuccess) return null


    return (
        // Verified succesfully result
        <div className="flex flex-col gap-3xl items-center top-[50%] translate-y-[50%]">
            <Image src="/icons/check_green_outline_icon.svg" alt="Green outlined check" height={151} width={151} />
            <p className="text-xl text-center">Du er nu medlem! <br />Kør direkte til vaskehallen og kom i gang.</p>
        </div>
    )
}