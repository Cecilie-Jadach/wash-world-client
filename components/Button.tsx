import Link from 'next/link'
import Image from 'next/image'
import { cva, VariantProps } from 'class-variance-authority'

type ButtonProps = VariantProps<typeof buttonStyles> & {
    children: React.ReactNode
    href?: string
    icon?: boolean
    className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

//https://cva.style/docs/getting-started/typescript
const buttonStyles = cva(
    'inline-flex items-center justify-center gap-3xs h-fit font-extrabold text-md border-b disabled:opacity-70 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                primary: 'bg-green-white-background text-white border-green-border',
                secondary: 'bg-grey-5 text-black border-grey-10',
                dark: 'bg-grey-80 text-white border-grey-80',

            },
            size: {
                md: 'px-xs py-2xs',
                lg: 'px-s py-xs',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
)

const Button = ({ children, variant, size, href, icon = true, className, ...props }: ButtonProps) => {
    const content = (
        <>
            {children}
            {icon && <Image src="/icons/arrow_icon.svg" width={14} height={14} alt=""/>}
        </>
    )

    if (href) {
        return (
            <Link href={href} className={buttonStyles({ variant, size, className })}>
                {content}
            </Link>
        )
    }

    return (
        <button type="button" className={buttonStyles({ variant, size, className })} {...props}>
            {content}
        </button>
    )
}

export default Button