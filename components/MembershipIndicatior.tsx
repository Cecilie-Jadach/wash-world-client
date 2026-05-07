type Props = { value: string }

export default function MembershipIndicator({ value }: Props) {
    return (
        <div className="mb-s">
            <p className="text-grey-60 text-md">Medlemskab</p>
            <p className="text-lg">{value}</p>
        </div>
    )
}