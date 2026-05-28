import Button from "./Button";

type DialogModalProps = {
    dialogMessage: string
    buttonText: string
    onConfirm: () => void
    onCancel: () => void
}

export default function DialogModal({ dialogMessage, buttonText, onConfirm, onCancel }: DialogModalProps) {
    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 top-[0] w-full h-full bg-black/30 z-9998 flex items-center justify-center" onClick={onCancel}>
                {/* Dialog modal */}
                <div className="bg-white grid gap-s p-sm border border-black items-center w-full max-w-[40ch] z-9999 m-xs">
                    <p className="">{dialogMessage}</p>
                    <div className="flex gap-xs justify-between w-full">
                        <Button className="grow" variant="secondary" icon={false} onClick={onCancel}>Annuller</Button>
                        <Button className="grow" variant="dark" icon={false} onClick={onConfirm}>{buttonText}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
