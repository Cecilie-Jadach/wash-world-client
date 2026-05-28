import { cva } from 'class-variance-authority'

type BusynessStatus = 'Ikke travlt nu' | 'Lidt travlt nu' | 'Meget travlt nu'

type BusynessLabelProps = {
    status: BusynessStatus
}

const label = cva(
    ' px-3xs py-4xs border text-xs',
    {
        variants: {
            status: {
                'Ikke travlt nu':  'bg-light-green border-green-border text-sm',
                'Lidt travlt nu':  'bg-light-splash border-splash text-sm',
                'Meget travlt nu': 'bg-light-error-red border-error-red text-sm',
            }
        }
    }
)

export default function BusynessLabel({ status }: BusynessLabelProps) {
    return (
        <div className="flex gap-3xs items-center">
            <div className={label({ status })}>
            {status}
            </div>
        </div>
    )
}