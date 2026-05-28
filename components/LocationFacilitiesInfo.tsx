import Image from "next/image"

type LocationFacilitiesInfoProps = {
    icon: string
    facility: string
    data:number | string
}

export default function LocationFacilitiesInfo({icon, facility, data}:LocationFacilitiesInfoProps ) {
return (
    <div className="flex justify-between py-4xs border-t border-t-grey-10">
        <div className="flex gap-3xs items-center-safe">
        <Image src={icon} alt="" width={18} height={18}/>
        <p className="text-sm text-grey-60">{facility}</p>
        </div>
        <p className="font-extrabold text-sm">{data}</p>
    </div>
)
}
