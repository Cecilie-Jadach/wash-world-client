import Image from "next/image"

type ErrorProps = {
    children: React.ReactNode
}

export default function Error({ children }: ErrorProps) {
    return (
        <div className="flex items-center gap-4xs bg-red-100">
            <Image src="/icons/error_icon.svg" alt="error icon" height={16} width={16} />
            <p className="text-error-red text-xs">{children}</p>
        </div>
    )
}