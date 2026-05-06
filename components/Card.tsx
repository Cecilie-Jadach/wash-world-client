"use client"

import React from 'react';
import { useState } from 'react';

type CardProps = {
    membership: string
    price: number
    description: string
    selectedCard: boolean
    onSelect: (membership: string) => void
    showBadge?: boolean
}

const Badge = () => (
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
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M8.365 16.73C12.9849 16.73 16.73 12.9849 16.73 8.365C16.73 3.74514 12.9849 0 8.365 0C3.74514 0 0 3.74514 0 8.365C0 12.9849 3.74514 16.73 8.365 16.73Z" fill="#06C167" />
        <path d="M3.90381 7.45874L7.37947 11.1714L15.2049 3.34595" stroke="#F7F7F7" strokeWidth="2.09125" />
    </svg>
)

const NotIncludedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M8.365 0C3.74752 0 0 3.74752 0 8.365C0 12.9825 3.74752 16.73 8.365 16.73C12.9825 16.73 16.73 12.9825 16.73 8.365C16.73 3.74752 12.9825 0 8.365 0ZM12.5475 9.2015H4.1825V7.5285H12.5475V9.2015Z" fill="#666666" />
    </svg>
)

export default function Card({ membership, price, description, selectedCard, onSelect, showBadge }: CardProps) {
    const [activeReadMore, setActiveReadMore] = useState(false);

    return (
        <div onClick={() => onSelect(membership)}
            className={`relative flex flex-col gap-sm p-s bg-grey-5 drop-shadow-xs drop-shadow-grey-10 ${selectedCard ? 'border border-green-white-background' : 'border border-transparent'}`}
        >
            <div className='flex flex-col gap-3xs'>
                {showBadge && <Badge />}
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
            <div onClick={() => setActiveReadMore(!activeReadMore)} className='flex gap-3xs text-green-white-background text-sm items-center'>
                <p>Læs mere</p>
                <svg className={activeReadMore ? 'rotate-180' : ''} xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                    <path d="M4.89729 6.27398L0.17096 1.54763C-0.0569867 1.31969 -0.0569867 0.950127 0.17096 0.722205L0.72221 0.170955C0.949768 -0.0566031 1.31857 -0.0570411 1.54667 0.169982L5.31001 3.9157L9.07333 0.169982C9.30143 -0.0570411 9.67023 -0.0566031 9.89779 0.170955L10.449 0.722205C10.677 0.950151 10.677 1.31971 10.449 1.54763L5.72274 6.27398C5.49479 6.50191 5.12523 6.50191 4.89729 6.27398Z" fill="#06C167" />
                </svg>
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