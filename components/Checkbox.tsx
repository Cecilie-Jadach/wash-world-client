import Error from "./Error"
import { CheckboxProps } from "@/types/checkbox"
import Image from "next/image"

export default function Checkbox({ label, id, showRequired, error, ...props }: CheckboxProps) {
    return (
        <div className="flex flex-col gap-3xs">
            <div className="flex items-center gap-2xs relative">
                <input
                    type="checkbox"
                    id={id}
                    className={`items-center w-s h-s relative peer shrink-0 appearance-none bg-white border border-black checked:bg-green-white-background checked:border-green-white-background 
                                ${error ? 'border border-error-red' : ''}`}
                    {...props}
                />
                <Image src="/icons/check_white_icon.svg" alt="checked checkbox" height={20} width={20} className="absolute p-[2px] hidden peer-checked:block pointer-events-none" />
                <label htmlFor={id} className="text-sm">
                    {label} {showRequired && <span className="font-medium">*</span>}
                </label>
            </div>
            {error && <Error>{error}</Error>}
        </div>
    )
}