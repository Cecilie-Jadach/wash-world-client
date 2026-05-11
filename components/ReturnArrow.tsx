"use client"
//https://nextjs.org/docs/pages/api-reference/functions/use-router
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ReturnArrow() {
    const router = useRouter()

return (
    <button onClick={() => router.back()}>
        <Image src="/icons/arrow_left_icon.svg" alt="left arrow icon" height={16} width={16}/>
    </button>
)
}
