"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMembership } from '../hooks/useMembership'
import ReturnArrow from '../../components/ReturnArrow'
import Button from '../../components/Button'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function PauseMembershipPage() {
    const router = useRouter()
    const [pauseMonths, setPauseMonths] = useState<number>(1)
    const { pauseMutation } = useMembership()

    const handlePause = async () => {
        await pauseMutation.mutateAsync(pauseMonths)
        toast.success('Medlemskab er sat på pause')
        router.push('/membership')
    }

    return (
        <main className="m-2xs pb-xl grid gap-s">
            <ReturnArrow />
            <h1 className="font-extrabold text-xl">Sæt på pause</h1>
            <p>Vælg varighed. Du trækkes ikke i perioden og kan genoptage når som helst.</p>

        <div className="grid gap-3xs">
                <h2 className="font-extrabold">Varighed</h2>
                <div className="relative w-full">
                <select
                    className="w-full appearance-none border-b border-grey-10 bg-grey-5 px-2xs py-xs outline-none pr-6 cursor-pointer"
                    onChange={(e) => setPauseMonths(Number(e.target.value))}
                    aria-label="Vælg antal måneder"
                    >
                    <option value={1}>1 måned</option>
                    <option value={2}>2 måneder</option>
                    <option value={3}>3 måneder</option>
                </select>
                <div className="pointer-events-none absolute right-2xs top-1/2 -translate-y-1/2">
                    <Image src="/icons/chevron_down_icon.svg" alt="" width={16} height={16} />
                </div>
            </div>
        </div>

            <Button className="justify-center" onClick={handlePause} disabled={pauseMutation.isPending}>
                {pauseMutation.isPending ? 'Venter...' : 'Bekræft pause'}
            </Button>

            {pauseMutation.isError && <p>{pauseMutation.error.message}</p>}
        </main>
    )
}