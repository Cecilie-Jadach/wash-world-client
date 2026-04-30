import React from 'react'
import { cva } from 'class-variance-authority'

const buttonStyles = cva(
    'h-fit font-extrabold text-md border-b disabled:opacity-70 disabled:cursor-not-allowed',
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

const ArrowIcon = ({ variant }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
        <path d="M9.90361 4.44565L9.90648 4.44231C9.90954 4.43889 9.91259 4.43537 9.91574 4.43176L9.91806 4.4288C9.92111 4.425 9.92417 4.4212 9.92731 4.41731L9.9287 4.41537C9.93185 4.41102 9.93491 4.40667 9.93796 4.40222C9.97165 4.35151 9.99233 4.29328 9.99815 4.23268V4.23102C9.99815 4.22555 9.99907 4.22 9.99935 4.21444C9.99963 4.20889 9.99935 4.20352 9.99935 4.19805V4.19583V4.1938V4.17722C9.99935 4.17176 9.99861 4.16657 9.99815 4.16129V4.15898C9.99221 4.09849 9.97148 4.0404 9.93778 3.98981C9.93482 3.98537 9.93173 3.98102 9.92852 3.97676L9.92713 3.97472C9.92426 3.97083 9.9212 3.96704 9.91787 3.96333C9.91704 3.96231 9.9163 3.9612 9.91546 3.96028C9.9125 3.95667 9.90944 3.95324 9.9062 3.94981L9.90333 3.94639C9.89926 3.94194 9.895 3.93713 9.89074 3.93324L6.06741 0.10898C5.99763 0.0392014 5.90299 0 5.80431 0C5.70562 0 5.61098 0.0392014 5.5412 0.10898C5.47143 0.178759 5.43222 0.2734 5.43222 0.372082C5.43222 0.470765 5.47143 0.565405 5.5412 0.635184L8.72963 3.82361H0.372037C0.273367 3.82361 0.178738 3.86281 0.108967 3.93258C0.0391967 4.00235 0 4.09698 0 4.19565C0 4.29432 0.0391967 4.38895 0.108967 4.45872C0.178738 4.52849 0.273367 4.56768 0.372037 4.56768H8.72963L5.5412 7.75611C5.50665 7.79066 5.47925 7.83168 5.46055 7.87682C5.44185 7.92197 5.43222 7.97035 5.43222 8.01921C5.43222 8.06807 5.44185 8.11646 5.46055 8.1616C5.47925 8.20674 5.50665 8.24776 5.5412 8.28231C5.57576 8.31686 5.61677 8.34427 5.66192 8.36297C5.70706 8.38167 5.75544 8.39129 5.80431 8.39129C5.85317 8.39129 5.90155 8.38167 5.9467 8.36297C5.99184 8.34427 6.03286 8.31686 6.06741 8.28231L9.89148 4.4588C9.89528 4.45491 9.89954 4.45009 9.90361 4.44565Z"
            fill={variant === 'secondary' ? '#000000' : '#ffffff'}
        />
    </svg>
)

const Button = ({ children, variant, size, href, icon = true, className, ...props }) => {
    const content = (
        <div className="flex items-center gap-3xs">
            {children}
            {icon && <ArrowIcon variant={variant} />}
        </div>
    )

    if (href) {
        return (
            <a href={href} className={buttonStyles({ variant, size, className })} {...props}>
                {content}
            </a>
        )
    }

    return (
        <button type="button" className={buttonStyles({ variant, size, className })} {...props}>
            {content}
        </button>
    )
}

export default Button