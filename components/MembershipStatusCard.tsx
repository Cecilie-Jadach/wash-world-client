"use client"
import { User } from '../types/user'
import { MembershipStatus } from '../types/membership'

type MembershipCardProps = {
    user: User
    membershipStatus: MembershipStatus
}

export default function MembershipCard({ user, membershipStatus }: MembershipCardProps) {
    return (
        <div className="bg-grey-5 p-s">
            <div className="flex justify-between">
            <p className="text-xl">{user.user_membership}</p>
            <span className={membershipStatus === 'active'
                ? 'bg-light-green border border-green-border px-3xs py-4xs '
                : 'bg-grey-10 text-black px-xs py-4xs rounded-full'}>
                {membershipStatus === 'active' ? 'Aktivt' : 'På pause'}
            </span>
            </div>
            {user.user_membership === 'Guld' && <p>139 kr/md.</p> || user.user_membership === 'Premium' && <p>169 kr/md.</p> || user.user_membership === 'Brilliant' && <p>199 kr/md.</p> || user.user_membership === 'Enkeltvask' && <p>0 kr/md.</p>}
        </div>
    )
}