import React from "react";
import Button from "./Button";

type DeleteModalProps = {
    deleteMessage: string
    buttonText: string
    onConfirm: () => void
    onCancel: () => void
}

export default function DeleteModal({ deleteMessage, buttonText, onConfirm, onCancel }: DeleteModalProps) {
    return (
        <div className="fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-white flex flex-col gap-s p-sm border border-black items-center w-full max-w-[40ch]">
            <p className="">{deleteMessage}</p>
            <div className="flex gap-xs justify-between w-full">
                <Button variant="secondary" icon={false} onClick={onCancel}>Annuller</Button>
                <Button className="grow" variant="dark" icon={false} onClick={onConfirm}>{buttonText}</Button>
            </div>
        </div>
    )
}