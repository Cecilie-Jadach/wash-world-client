type LabelProps = {
    htmlFor: string
    required?: boolean
    children: React.ReactNode
}

export default function Label({ htmlFor, required, children }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className="font-extrabold text-md">
            {children} {required && <span className="font-medium">(påkrævet)</span>}
        </label>
    )
}