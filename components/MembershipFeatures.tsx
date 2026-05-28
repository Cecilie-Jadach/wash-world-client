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
    <Image src="/icons/check_green_icon.svg" alt="check green icon" width={17} height={17} />
)

const NotIncludedIcon = () => (
    <Image src="/icons/minus_icon.svg" alt="minus icon" width={17} height={17} />
)

type MembershipFeatureProps = {
    user: User
    membership: string
}

export default function MembershipFeatures({ user, membership }: MembershipFeatureProps) {

    return (
        <div className='flex flex-col gap-2xs'>
            <p className='font-extrabold'>{membership === 'Enkeltvask' ? 'Enkeltvask priser' : `Inkluderet i ${user.user_membership}`}</p>
            <div className="bg-grey-5 p-s">
                {membership === 'Enkeltvask' ? (
                    <>
                        <div className='grid grid-flow-col gap-2xs grid-cols-3'>
                            <div className='flex flex-col items-baseline'>
                                <p className='font-extrabold'>Guld</p>
                                <div className='flex gap-4xs items-baseline'>
                                    <p className='text-lg font-extrabold'>59</p>
                                    <p className='text-xs font-extrabold'>kr.</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-baseline'>
                                <p className='font-extrabold'>Premium</p>
                                <div className='flex gap-4xs items-baseline'>
                                    <p className='text-lg font-extrabold'>89</p>
                                    <p className='text-xs font-extrabold'>kr.</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-baseline'>
                                <p className='font-extrabold'>Brilliant</p>
                                <div className='flex gap-4xs items-baseline'>
                                    <p className='text-lg font-extrabold'>119</p>
                                    <p className='text-xs font-extrabold'>kr.</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='grid grid-flow-col gap-2xs grid-rows-6'>
                            {washFeatures.map((washFeature) => (
                                <div key={washFeature.name} className='flex gap-2xs items-center'>
                                    {washFeature.memberships.includes(user.user_membership) ? <IncludedIcon /> : <NotIncludedIcon />}
                                    <p>{washFeature.name}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
