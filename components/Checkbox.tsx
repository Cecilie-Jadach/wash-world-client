import React from "react";

type CheckboxProps = {
    label: React.ReactNode
    id: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Checkbox({ label, id, required, ...props }: CheckboxProps) {
    return (
        <div className="flex items-center gap-2xs">
            <input
                type="checkbox"
                id={id}
                className="items-center w-s h-s relative peer shrink-0 appearance-none bg-white border border-black checked:bg-green-white-background checked:border-green-white-background"
                {...props}
            />
            <svg className="absolute w-s h-s hidden peer-checked:block pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 12" fill="none">
                <path d="M0.716309 4.39921L5.79323 9.60974L12.7163 0.609741" stroke="white" stroke-width="2" />
            </svg>
            <label htmlFor={id} className="text-md">
                {label} {required && <span className="font-medium">*</span>}
            </label>
        </div>
    )
}