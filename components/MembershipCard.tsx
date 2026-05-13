"use client"

import React from 'react';
import { useState } from 'react';
import { MembershipCardProps } from '@/types/membershipCard';
import Image from 'next/image';

const MembershipBadge = () => (
    <div className='bg-splash px-3xs py-4xs text-white font-extrabold text-sm w-fit absolute right-xs top-xs'>
        <p>POPULÆR</p>
    </div>
)

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
    <Image src="/icons/check_green_icon.svg" alt="Green check icon" height={17} width={17} />
)

const NotIncludedIcon = () => (
    <Image src="/icons/minus_icon.svg" alt="Minus icon" height={17} width={17} />
)

export default function MembershipCard({ membership, price, description, selectedCard, onSelect, showMembershipBadge }: MembershipCardProps) {
    const [activeReadMore, setActiveReadMore] = useState(false);

    return (
        <div onClick={() => onSelect(membership)}
            className={`relative flex flex-col gap-sm p-s bg-grey-5 drop-shadow-xs drop-shadow-grey-10 cursor-pointer ${selectedCard ? 'border border-green-white-background' : 'border border-transparent'}`}
        >
            <div className='flex flex-col gap-3xs'>
                {showMembershipBadge && <MembershipBadge />}
                <div>
                    <p className='text-lg font-extrabold'>{membership}</p>
                    <div className='flex gap-4xs items-baseline'>
                        <p className='text-2xl font-extrabold'>{price}</p>
                        <p className='text-md font-extrabold'>kr./md.</p>
                    </div>
                </div>
                <p className='text-md'>{description}</p>
            </div>

            {/* READ MORE */}
            <div onClick={() => setActiveReadMore(!activeReadMore)} className='flex gap-3xs text-green-white-background text-sm items-center w-fit'>
                <p>Læs mere</p>
                <Image src="/icons/chevron_green_icon.svg" alt="Green chevron" height={11} width={11} className={activeReadMore ? 'rotate-180' : ''} />
            </div>

            <div className={`${activeReadMore ? "block" : "hidden"} grid gap-xs`}>
                {membership === 'Enkeltvask' ? (
                    <>
                        <p className='font-extrabold'>Enkeltvask priser</p>
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
                        <p className='font-extrabold'>Inkluderet i {membership}</p>
                        <div className='grid grid-flow-col gap-2xs grid-rows-6'>
                            {washFeatures.map((washFeature) => (
                                <div key={washFeature.name} className='flex gap-2xs items-center'>
                                    {washFeature.memberships.includes(membership) ? <IncludedIcon /> : <NotIncludedIcon />}
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