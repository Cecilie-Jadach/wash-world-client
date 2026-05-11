export type MembershipStatus = 'active' | 'paused'

export type MembershipStatusCardProps = {
    membership: string
    price: number
    washes: number
    status: MembershipStatus
    token: string
}