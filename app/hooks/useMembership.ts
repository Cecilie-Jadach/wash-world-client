import { useMutation, useQueryClient } from '@tanstack/react-query'

const getToken = () => localStorage.getItem("token") ?? ""

const pauseMembershipFetch = async (pauseMonths: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/membership/pause`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ membership_pause_months: pauseMonths })
    })
    if (!res.ok) throw new Error((await res.json()).error)
    return res.json()
}

const reactivateMembershipFetch = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/membership/reactivate`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    if (!res.ok) throw new Error((await res.json()).error)
    return res.json()
}

export function useMembership() {
    const queryClient = useQueryClient()

    const pauseMutation = useMutation({
        mutationFn: (pauseMonths: number) => pauseMembershipFetch(pauseMonths),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['membership'] })
    })

    const reactivateMutation = useMutation({
        mutationFn: () => reactivateMembershipFetch(),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] })
    })

    return { pauseMutation, reactivateMutation }
}
