import { User } from '../types/user'
import { MembershipStatus } from '../types/membership'

type MembershipCardProps = {
    user: User
    membershipStatus: MembershipStatus
}

export default function MembershipStatusCard({ user, membershipStatus }: MembershipCardProps) {
    return (
        <div className="bg-grey-5 p-s grid gap-s">
            <div>
                <div className="flex justify-between">
                    <p className="text-xl">{user.user_membership}</p>
                    <span className={membershipStatus === 'active'
                        ? 'bg-light-green border border-green-border px-3xs py-4xs '
                        : 'bg-light-splash border border-splash px-3xs py-4xs'}>
                        {membershipStatus === 'active' ? 'Aktivt' : 'På pause'}
                    </span>
                </div>
                {user.user_membership === 'Guld' && <p>139 kr/md.</p> ||
                    user.user_membership === 'Premium' && <p>169 kr/md.</p> ||
                    user.user_membership === 'Brilliant' && <p>199 kr/md.</p> ||
                    user.user_membership === 'Enkeltvask' && <p>0 kr/md.</p>}
            </div>
            <div className="flex justify-between">
                <p>Vaske denne måned</p>
                <p>3 gange</p>
            </div>
        </div>
    )
}