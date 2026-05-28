import Image from 'next/image'

type PaymentCardProps = {
    image: 'Mobilepay' | 'Applepay'
    selectedCard: boolean
    onSelect: (image: string) => void
}

export default function PaymentCard({ image, selectedCard, onSelect }: PaymentCardProps) {
    return (
        <label
            htmlFor={image}
            className={`border p-3xs w-fit h-xl cursor-pointer ${selectedCard ? 'border-green-white-background' : 'border-black'}`}
        >
            <input
                type="radio"
                id={image}
                name="payment"
                value={image}
                checked={selectedCard}
                onChange={() => onSelect(image)}
                className="sr-only"
            />
            <Image
                className={`w-xl ${image === 'Applepay' ? 'translate-y-[50%]' : ''}`}
                src={`/images/${image.toLowerCase()}.png`}
                alt={image}
                width={100}
                height={100}
            />
        </label>
    )
}
