import Image from 'next/image'
import { User } from "../types/user"

const washFeatures: { name: string; memberships: string[] }[] = [
    { name: 'Skumforvask', memberships: ['Guld', 'Premium', 'Brilliant'] },
    { name: 'Aktiv Shampoo', memberships: ['Guld', 'Premium', 'Brilliant'] },
    { name: 'Hjulvask', memberships: ['Guld', 'Premium', 'Brilliant'] },
    { name: 'Højtryksvask', memberships: ['Guld', 'Premium', 'Brilliant'] },
    { name: 'Børstevask', memberships: ['Guld', 'Premium', 'Brilliant'] },
    { name: 'Voks', memberships: ['Guld', 'Premium', 'Brilliant'] },
    { name: 'Tørring', memberships: ['Guld', 'Premium', 'Brilliant'] },
    { name: 'Højglans', memberships: ['Premium', 'Brilliant'] },
    { name: 'Undervognsvask', memberships: ['Premium', 'Brilliant'] },
    { name: 'Skumvask', memberships: ['Brilliant'] },
    { name: 'Affedtning', memberships: ['Brilliant'] },
    { name: 'Sæsonrens', memberships: ['Brilliant'] },
]

const IncludedIcon = () => (
    <Image src="/icons/check_green_icon.svg" alt="check green icon" width={17} height={17}/>
)

const NotIncludedIcon = () => (
    <Image src="/icons/minus_icon.svg" alt="minus icon" width={17} height={17}/>
)

type MembershipFeatureProps = {
    user: User
}

export default function MembershipFeatures({user}:MembershipFeatureProps ) {

return (
    <div>
        <p className='font-extrabold'>Inkluderet i {user.user_membership}</p>
        <div className="bg-grey-5 p-s">
            <div className='grid grid-flow-col gap-2xs grid-rows-6'>
                {washFeatures.map((washFeature) => (
                <div key={washFeature.name} className='flex gap-2xs items-center'>
                {washFeature.memberships.includes(user.user_membership) ? <IncludedIcon /> : <NotIncludedIcon />}
                <p>{washFeature.name}</p>
                </div>
                ))}
            </div>
    </div>
    </div>
)
}
