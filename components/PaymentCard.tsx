import Image from 'next/image'

type PaymentCardProps = {
    image: 'mobilepay' | 'applepay'
    selectedCard: boolean
    onSelect: (image: string) => void
}

export default function PaymentCard({ image, selectedCard, onSelect }: PaymentCardProps) {
    return (
        <div
            onClick={() => onSelect(image)} // When clicked, calls onSelect with the image name ('Mobilepay' or 'Applepay') so the parent knows which one was selected
            className={`border p-3xs w-fit h-xl cursor-pointer ${selectedCard ? 'border-green-white-background' : 'border-black'}`}
        >
            <Image
                className={`w-xl ${image === 'applepay' ? 'translate-y-[50%]' : ''}`}
                src={`/images/${image}.png`}
                alt={image}
                width={100}
                height={100}
            />
        </div>
    )
}