import Label from "@/components/Label"
import Error from "@/components/Error"
import { InputProps } from "@/types/input"

const LicensePlate = () => (
    <div className="flex flex-col items-center justify-center gap-[2px] bg-[#335ab3] px-4xs border-b border-[#21418B]">
        <svg width="18" height="18" viewBox="0 0 19 19" fill="none"><path d="M9.598.7l.29.9h.945l-.76.557.286.901-.761-.557-.761.557.29-.9-.76-.557h.94L9.597.7zM5.714 1.743l.291.9h.945l-.761.557.286.9-.76-.556-.761.557.29-.9-.76-.558h.94l.29-.9zM2.867 4.61l.29.9h.945l-.76.557.286.901-.761-.556-.761.556.29-.9-.76-.557h.94l.29-.9zM1.83 8.52l.29.901h.945l-.76.557.286.901-.76-.557-.762.557.29-.9-.76-.557h.94l.291-.901zm1.036 3.911l.29.9h.945l-.76.557.286.901-.761-.556-.761.556.29-.9-.76-.557h.94l.29-.9zM5.714 15.3l.291.9h.945l-.761.557.286.901-.76-.556-.761.556.29-.9-.76-.557h.94l.29-.9zm7.767-13.556l.29.9h.946l-.761.557.286.9-.76-.556-.762.557.291-.9-.76-.558h.94l.29-.9zM16.33 4.61l.29.9h.945l-.76.557.286.901-.76-.556-.762.556.29-.9-.76-.557h.94l.291-.9zm1.036 3.91l.29.901h.945l-.76.557.286.901-.761-.557-.761.557.29-.9-.76-.557h.94l.29-.901zm-1.036 3.911l.29.9h.945l-.76.557.286.901-.76-.556-.762.556.29-.9-.76-.557h.94l.291-.9zm-6.731 3.91l.29.901h.945l-.76.557.286.9-.761-.556-.761.557.29-.9-.76-.557h.94l.29-.901zM13.48 15.3l.29.9h.946l-.761.557.286.901-.76-.556-.762.556.291-.9-.76-.557h.94l.29-.9z" fill="#FC0"></path></svg>
        <p className="font-extrabold text-[8px] text-white">DK</p>
    </div>
)

export default function Input({ label, id, showLicensePlate, phoneLabel, error, showRequired, bgWhite, className, readOnly, ...props }: InputProps) {
    const isReadOnly = readOnly
    const bg = bgWhite ? 'bg-white' : 'bg-grey-5'

    return (
        <div className="flex flex-col gap-3xs text-md">
            <Label htmlFor={id} required={showRequired}>{label}</Label>
            <div className={`flex items-stretch ${error ? 'border border-error-red' : ''}`}>
                {showLicensePlate && <LicensePlate />}
                {phoneLabel && <span className={`${isReadOnly ? "border-none bg-transparent pl-[0] py-[0]" : `border-b border-grey-10 ${bg} pl-2xs py-xs`}`}>{phoneLabel}</span>}
                <input id={id}
                    className={`w-full outline-none
                        ${isReadOnly ? 'bg-transparent text-grey-60 placeholder:text-black border-none cursor-default' : `${bg} placeholder:text-grey-60 border-b border-grey-10`}
                        ${isReadOnly && !showLicensePlate ? "px-[0] py-[0]" : "px-2xs py-xs"}`}
                    {...props}
                />
            </div>
            {error && <Error>{error}</Error>}
        </div>
    )

}