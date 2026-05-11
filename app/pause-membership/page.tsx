"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMembership } from '../hooks/useMembership'
import ReturnArrow from '../../components/ReturnArrow'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

export default function PauseMembershipPage() {
    const router = useRouter()
    const [token, setToken] = useState<string>('')
    const [pauseMonths, setPauseMonths] = useState<number>(1)
    const { pauseMutation } = useMembership(token)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) setToken(storedToken)
    }, [])

    const handlePause = async () => {
        await pauseMutation.mutateAsync(pauseMonths)
        toast.success('Medlemskab er sat på pause')
        router.push('/membership')
    }

    return (
        <main className="m-2xs pb-xl">
            <ReturnArrow />
            <h1 className="font-extrabold text-xl">Sæt på pause</h1>

            <select onChange={(e) => setPauseMonths(Number(e.target.value))}>
                <option value={1}>1 måned</option>
                <option value={2}>2 måneder</option>
                <option value={3}>3 måneder</option>
            </select>

            <Button onClick={handlePause} disabled={pauseMutation.isPending}>
                {pauseMutation.isPending ? 'Venter...' : 'Pausér medlemskab'}
            </Button>

            {pauseMutation.isError && <p>{pauseMutation.error.message}</p>}
        </main>
    )
}