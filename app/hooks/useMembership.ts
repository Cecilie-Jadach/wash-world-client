import { useMutation, useQueryClient } from '@tanstack/react-query'

const pauseMembershipFetch = async (token: string, pauseMonths: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/membership/pause`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ membership_pause_months: pauseMonths })
    })
    if (!res.ok) throw new Error((await res.json()).error)
    return res.json()
}

const reactivateMembershipFetch = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/membership/reactivate`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (!res.ok) throw new Error((await res.json()).error)
    return res.json()
}

export function useMembership(token: string) {
    const queryClient = useQueryClient()

    const pauseMutation = useMutation({
        mutationFn: (pauseMonths: number) => pauseMembershipFetch(token, pauseMonths),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['membership'] })
    })

    const reactivateMutation = useMutation({
        mutationFn: () => reactivateMembershipFetch(token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] })
    })

    return { pauseMutation, reactivateMutation }
}