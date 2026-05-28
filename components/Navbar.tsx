"use client"
//Hook
import { useAuth } from "@/app/hooks/useAuth"

//Next
import Link from "next/link"
import { usePathname } from 'next/navigation'

//React
import { useState } from "react"

//Components
import Button from "@/components/Button"

export default function Navbar() {
    const { handleLogout } = useAuth();
    const pathname = usePathname();
    const [activeMenu, setActiveMenu] = useState(false);
    const [activeSupport, setActiveSupport] = useState(false);
    const [prevPathname, setPrevPathname] = useState(pathname);

    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setActiveMenu(false);
    }
    const isActive = (path: string) => pathname === path ? 'text-black' : 'text-grey-60'

    if (["/signup", "/login", "/", "/forgot-password", "/session-expired"].includes(pathname) || pathname.startsWith("/verify") || pathname.startsWith("/reset-password")) return null

    return (
        <>
            {/* BACKDROP */}
            <div className={`fixed inset-0 z-9999 bg-black top-[0] w-full h-full transition-opacity duration-500 ${activeMenu ? 'opacity-30 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setActiveMenu(false)} />

            {/* MENU */}
            <div className={`${activeMenu ? "left-[0px]" : "left-[-400px]"
                } fixed top-[0px] px-m pb-m pt-2xl w-max h-[calc(100%-73px)] z-99999 duration-500 bg-black flex flex-col justify-between font-extrabold text-white`}>
                <div className="grid gap-xs text-xl">
                    <Link href="/membership">Medlemskab</Link>
                    <div className="grid gap-s">
                        <p className="cursor-pointer" onClick={() => setActiveSupport(!activeSupport)}>Kontakt support</p>
                        <div className={`grid gap-3xs overflow-hidden transition-all duration-300 ease-in-out ${activeSupport ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                            <Button icon={false} className="w-fit">Ring til: +45 30 96 81 73</Button>
                            <p className="text-md font-medium flex gap-4xs">
                                E-mail: <a href="mailto:kundeservice@washworld.dk">kundeservice@washworld.dk</a>
                            </p>
                        </div>
                    </div>
                </div>
                <Button onClick={handleLogout} variant="dark" icon={false}>Log ud</Button>
            </div>

            {/* NAVBAR */}
            <nav className="flex justify-between items-center bg-white border-t border-black py-2xs px-ml text-sm fixed w-full -bottom-px z-999991">
                <Link href="/map" className={`grid gap-3xs ${isActive('/map')}`}>
                    <div className="h-sm flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 18 23" fill="none">
                            <path d="M7.92218 22.0515C7.92218 22.0515 0 15.353 0 8.7619C0 6.4381 0.919478 4.20948 2.55616 2.5663C4.19284 0.923127 6.41266 0 8.72727 0C11.0419 0 13.2617 0.923127 14.8984 2.5663C16.5351 4.20948 17.4545 6.4381 17.4545 8.7619C17.4545 15.353 9.53236 22.0515 9.53236 22.0515C9.09164 22.459 8.36618 22.4546 7.92218 22.0515ZM8.72727 12.5952C9.22868 12.5952 9.72518 12.4961 10.1884 12.3034C10.6517 12.1108 11.0726 11.8284 11.4271 11.4725C11.7817 11.1165 12.0629 10.6939 12.2548 10.2289C12.4467 9.76378 12.5455 9.26531 12.5455 8.7619C12.5455 8.2585 12.4467 7.76003 12.2548 7.29495C12.0629 6.82987 11.7817 6.40729 11.4271 6.05133C11.0726 5.69537 10.6517 5.41301 10.1884 5.22037C9.72518 5.02772 9.22868 4.92857 8.72727 4.92857C7.71463 4.92857 6.74346 5.33244 6.02741 6.05133C5.31136 6.77022 4.90909 7.74524 4.90909 8.7619C4.90909 9.77857 5.31136 10.7536 6.02741 11.4725C6.74346 12.1914 7.71463 12.5952 8.72727 12.5952Z" fill="currentColor" />
                        </svg>
                    </div>
                    Kort
                </Link>

                <Link href="/profile" className={`grid gap-3xs ${isActive('/profile')}`}>
                    <div className="h-sm flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 18 20" fill="none">
                            <path d="M3.5 5.5C3.5 4.04131 4.07946 2.64236 5.11091 1.61091C6.14236 0.579463 7.54131 0 9 0C10.4587 0 11.8576 0.579463 12.8891 1.61091C13.9205 2.64236 14.5 4.04131 14.5 5.5C14.5 6.95869 13.9205 8.35764 12.8891 9.38909C11.8576 10.4205 10.4587 11 9 11C7.54131 11 6.14236 10.4205 5.11091 9.38909C4.07946 8.35764 3.5 6.95869 3.5 5.5ZM0 17C0 15.6739 0.526784 14.4021 1.46447 13.4645C2.40215 12.5268 3.67392 12 5 12H13C14.3261 12 15.5979 12.5268 16.5355 13.4645C17.4732 14.4021 18 15.6739 18 17V20H0V17Z" fill="currentColor" />
                        </svg>
                    </div>
                    Profil
                </Link>

                <Link href="/membership" className={`grid gap-3xs ${isActive('/membership')}`}>
                    <div className="h-sm flex justify-center items-center">
                        <svg width="24" height="27" viewBox="0 0 21 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_3030_710)">
                                <path d="M2.625 14.625L4.3125 9.56252H16.6875L18.375 14.625M16.6875 20.25C16.2399 20.25 15.8107 20.0722 15.4943 19.7558C15.1778 19.4393 15 19.0101 15 18.5625C15 18.115 15.1778 17.6857 15.4943 17.3693C15.8107 17.0528 16.2399 16.875 16.6875 16.875C17.1351 16.875 17.5643 17.0528 17.8807 17.3693C18.1972 17.6857 18.375 18.115 18.375 18.5625C18.375 19.0101 18.1972 19.4393 17.8807 19.7558C17.5643 20.0722 17.1351 20.25 16.6875 20.25ZM4.3125 20.25C3.86495 20.25 3.43572 20.0722 3.11926 19.7558C2.80279 19.4393 2.625 19.0101 2.625 18.5625C2.625 18.115 2.80279 17.6857 3.11926 17.3693C3.43572 17.0528 3.86495 16.875 4.3125 16.875C4.76005 16.875 5.18928 17.0528 5.50574 17.3693C5.82221 17.6857 6 18.115 6 18.5625C6 19.0101 5.82221 19.4393 5.50574 19.7558C5.18928 20.0722 4.76005 20.25 4.3125 20.25ZM18.285 9.00002C18.06 8.34752 17.43 7.87502 16.6875 7.87502H4.3125C3.57 7.87502 2.94 8.34752 2.715 9.00002L0.375 15.75V24.75C0.375 25.0484 0.493526 25.3345 0.704505 25.5455C0.915483 25.7565 1.20163 25.875 1.5 25.875H2.625C2.92337 25.875 3.20952 25.7565 3.4205 25.5455C3.63147 25.3345 3.75 25.0484 3.75 24.75V23.625H17.25V24.75C17.25 25.0484 17.3685 25.3345 17.5795 25.5455C17.7905 25.7565 18.0766 25.875 18.375 25.875H19.5C19.7984 25.875 20.0845 25.7565 20.2955 25.5455C20.5065 25.3345 20.625 25.0484 20.625 24.75V15.75M4.875 5.62502C5.32255 5.62502 5.75178 5.44724 6.06824 5.13077C6.38471 4.8143 6.5625 4.38508 6.5625 3.93752C6.5625 2.81252 4.875 0.900024 4.875 0.900024C4.875 0.900024 3.1875 2.81252 3.1875 3.93752C3.1875 4.38508 3.36529 4.8143 3.68176 5.13077C3.99823 5.44724 4.42745 5.62502 4.875 5.62502ZM10.5 5.62502C10.9476 5.62502 11.3768 5.44724 11.6932 5.13077C12.0097 4.8143 12.1875 4.38508 12.1875 3.93752C12.1875 2.81252 10.5 0.900024 10.5 0.900024C10.5 0.900024 8.8125 2.81252 8.8125 3.93752C8.8125 4.38508 8.99029 4.8143 9.30676 5.13077C9.62323 5.44724 10.0524 5.62502 10.5 5.62502ZM16.125 5.62502C16.5726 5.62502 17.0018 5.44724 17.3182 5.13077C17.6347 4.8143 17.8125 4.38508 17.8125 3.93752C17.8125 2.81252 16.125 0.900024 16.125 0.900024C16.125 0.900024 14.4375 2.81252 14.4375 3.93752C14.4375 4.38508 14.6153 4.8143 14.9318 5.13077C15.2482 5.44724 15.6774 5.62502 16.125 5.62502Z" fill="currentColor" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3030_710">
                                    <rect width="21" height="27" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    Medlemskab
                </Link>

                <div className={`grid gap-3xs cursor-pointer ${activeMenu ? 'text-black' : 'text-grey-60'}`}
                    onClick={() => setActiveMenu(!activeMenu)}>
                    <div className="flex flex-col gap-[6px] h-sm justify-center items-center relative w-full">
                        <span
                            className={`absolute w-sm h-[2px] transition-all duration-300 ${activeMenu ? 'rotate-45 translate-y-0 bg-black' : '-translate-y-3xs bg-grey-60'}`}>
                        </span>
                        <span
                            className={`absolute w-sm h-[2px] transition-all duration-300 ${activeMenu ? 'opacity-0' : 'opacity-100 bg-grey-60'}`}>
                        </span>
                        <span
                            className={`absolute w-sm h-[2px] transition-all duration-300 ${activeMenu ? '-rotate-45 translate-y-0 bg-black' : 'translate-y-3xs bg-grey-60'}`}>
                        </span>
                    </div>
                    Menu
                </div>
            </nav>
        </>
    );
};