"use client"

import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { useState } from "react";
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path ? 'text-black' : 'text-grey-60'
    const [activeMenu, setActiveMenu] = useState(false);
    const [activeSupport, setActiveSupport] = useState(false);

    return (
        <>
            {/* MENU */}
            <div className={`${activeMenu ? "left-[0px]" : "-left-[400px]"
                } fixed top-[0px] px-m pt-2xl flex flex-col gap-xs text-xl font-extrabold text-white bg-black w-max h-screen z-0 duration-500`}>
                <Link href="/medlemskab">Medlemskab</Link>
                <div className="flex flex-col gap-s">
                    <p onClick={() => setActiveSupport(!activeSupport)}>Kontakt support</p>
                    <div className={`flex flex-col gap-3xs overflow-hidden transition-all duration-300 ease-in-out ${activeSupport ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                        <Button icon={false} className="w-fit">Ring til: +45 30 96 81 73</Button>
                        <p className="text-md font-medium flex gap-4xs">
                            E-mail: <a href="mailto:kundeservice@washworld.dk">kundeservice@washworld.dk</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* NAVBAR */}
            <nav className="flex justify-evenly items-center bg-white border-t border-black py-2xs px-s text-sm fixed w-full -bottom-px z-10">
                <Link href="/" className={`flex flex-col gap-3xs ${isActive('/')}`}>
                    <div className="h-sm flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 23" fill="none">
                            <path d="M7.92218 22.0515C7.92218 22.0515 0 15.353 0 8.7619C0 6.4381 0.919478 4.20948 2.55616 2.5663C4.19284 0.923127 6.41266 0 8.72727 0C11.0419 0 13.2617 0.923127 14.8984 2.5663C16.5351 4.20948 17.4545 6.4381 17.4545 8.7619C17.4545 15.353 9.53236 22.0515 9.53236 22.0515C9.09164 22.459 8.36618 22.4546 7.92218 22.0515ZM8.72727 12.5952C9.22868 12.5952 9.72518 12.4961 10.1884 12.3034C10.6517 12.1108 11.0726 11.8284 11.4271 11.4725C11.7817 11.1165 12.0629 10.6939 12.2548 10.2289C12.4467 9.76378 12.5455 9.26531 12.5455 8.7619C12.5455 8.2585 12.4467 7.76003 12.2548 7.29495C12.0629 6.82987 11.7817 6.40729 11.4271 6.05133C11.0726 5.69537 10.6517 5.41301 10.1884 5.22037C9.72518 5.02772 9.22868 4.92857 8.72727 4.92857C7.71463 4.92857 6.74346 5.33244 6.02741 6.05133C5.31136 6.77022 4.90909 7.74524 4.90909 8.7619C4.90909 9.77857 5.31136 10.7536 6.02741 11.4725C6.74346 12.1914 7.71463 12.5952 8.72727 12.5952Z" fill="currentColor" />
                        </svg>
                    </div>
                    Kort
                </Link>

                <Link href="/profil" className={`flex flex-col gap-3xs ${isActive('/profil')}`}>
                    <div className="h-sm flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 18 20" fill="none">
                            <path d="M3.5 5.5C3.5 4.04131 4.07946 2.64236 5.11091 1.61091C6.14236 0.579463 7.54131 0 9 0C10.4587 0 11.8576 0.579463 12.8891 1.61091C13.9205 2.64236 14.5 4.04131 14.5 5.5C14.5 6.95869 13.9205 8.35764 12.8891 9.38909C11.8576 10.4205 10.4587 11 9 11C7.54131 11 6.14236 10.4205 5.11091 9.38909C4.07946 8.35764 3.5 6.95869 3.5 5.5ZM0 17C0 15.6739 0.526784 14.4021 1.46447 13.4645C2.40215 12.5268 3.67392 12 5 12H13C14.3261 12 15.5979 12.5268 16.5355 13.4645C17.4732 14.4021 18 15.6739 18 17V20H0V17Z" fill="currentColor" />
                        </svg>
                    </div>
                    Profil
                </Link>

                <Link href="/medlemskab" className={`flex flex-col gap-3xs ${isActive('/medlemskab')}`}>
                    <div className="h-sm flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 20 19" fill="none">
                            <path d="M17.2 1.61633V0H2.8V1.61633H0V18.9919H1.6V3.23267H2.8V4.849H17.2V3.23267H18.4V18.9919H20V1.61633H17.2ZM16.82 10.9103L14.212 6.41684C14.108 6.22288 13.848 6.06529 13.632 6.06529H6.368C6.152 6.06529 5.892 6.22288 5.792 6.42088L3.184 10.9183C2.756 10.9183 2.404 11.282 2.404 11.7265V15.7673C2.404 16.2118 2.756 16.5755 3.184 16.5755H4.004V17.7878C4.004 18.4545 4.488 19 5.132 19H5.524C6.168 19 6.808 18.4545 6.808 17.7878V16.5755H13.208V17.7878C13.208 18.4545 13.848 19 14.492 19H14.884C15.528 19 16.012 18.4545 16.012 17.7878V16.5755H16.832C17.26 16.5755 17.612 16.2118 17.612 15.7673V11.7265C17.612 11.282 17.26 10.9183 16.832 10.9183L16.82 10.9103ZM4.544 14.1429C4.008 14.1429 3.568 13.6903 3.568 13.1327C3.568 12.5751 4.004 12.1225 4.544 12.1225C5.084 12.1225 5.52 12.5751 5.52 13.1327C5.52 13.6903 5.084 14.1429 4.544 14.1429ZM5.128 10.9103L6.904 7.63313C7 7.43513 7.256 7.2735 7.468 7.2735H12.536C12.752 7.2735 13.004 7.43513 13.1 7.63313L14.876 10.9103H5.132H5.128ZM15.456 14.1429C14.92 14.1429 14.48 13.6903 14.48 13.1327C14.48 12.5751 14.916 12.1225 15.456 12.1225C15.996 12.1225 16.432 12.5751 16.432 13.1327C16.432 13.6903 15.996 14.1429 15.456 14.1429Z" fill="currentColor" />
                        </svg>
                    </div>
                    Medlemskab
                </Link>

                <div className={`flex flex-col gap-3xs ${activeMenu ? 'text-black' : 'text-grey-60'}`}
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