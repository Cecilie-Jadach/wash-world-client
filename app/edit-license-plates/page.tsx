"use client"

//Hooks
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAddLicensePlate } from "@/app/hooks/useAddLicensePlate"
import { useDeleteLicensePlate } from "@/app/hooks/useDeleteLicensePlate"
import { useLicensePlates } from "@/app/hooks/useLicensePlates"

//Next
import Image from "next/image"

//Components
import Button from "@/components/Button"
import Input from "@/components/Input"
import Error from "@/components/Error"
import LicensePlates from "@/components/LicensePlates"
import ReturnArrow from "@/components/ReturnArrow"
import InfoLabel from "@/components/InfoLabel"
import DialogModal from "@/components/DialogModal"

//React
import toast from "react-hot-toast"

type AddPlateForm = {
    license_plate: string;
}

export default function EditCars() {
    const { addLicensePlate, isPending, error } = useAddLicensePlate();
    const { deleteLicensePlate } = useDeleteLicensePlate();
    const { data: licensePlates } = useLicensePlates();
    const [activeDialogBox, setActiveDialogBox] = useState(false)

    //React Hook form 
    const {
        register, //En der sættes på inputs, så React Hook Form kan holde styr på deres værdier og validering.
        handleSubmit, //Funktion der håndterer form-submit. Den sørger for at validering kører først, og kalder kun din onSubmit-funktion hvis alt er gyldigt.
        reset, //Nulstiller formularen tilbage til defaultValues. Bruges typisk efter et succesfuldt submit.
        formState: { errors, isDirty }
        //Initialiserer formularen. AddPlateForm fortæller TypeScript hvilke felter formularen har. 
        //mode: "onTouched" betyder at validering først kører når brugeren har rørt ved et felt. 
        //defaultValues sætter startværdien for felterne.
    } = useForm<AddPlateForm>({ mode: "onTouched", defaultValues: { license_plate: "" } });

    const onAdd = async (data: AddPlateForm) => {
        try {
            await addLicensePlate(data.license_plate);
            toast.success("Nummerplade tilføjet");
            reset();
        } catch {
            toast.error("Kunne ikke tilføje nummerpladen");
        }
    };

    const handleDelete = async (plate: string) => {
        try {
            await deleteLicensePlate(plate);
            toast.success("Nummerplade slettet");
        } catch {
            toast.error("Kunne ikke slette nummerpladen");
        }
    };

    return (
        <>
            <div className="mx-2xs mt-xl pb-4xl flex flex-col gap-ml">
                <ReturnArrow />

                {/* Dine biler */}
                <div className="flex flex-col gap-s">
                    <h2 className="text-xl font-extrabold">Dine biler</h2>
                    <div className="flex flex-col gap-xs">
                        <LicensePlates showTrashIcon onDelete={setActiveDialogBox} />
                        {(licensePlates ?? []).length <= 1 && (
                            <InfoLabel message="Tilføj en nummerplade, før du kan slette denne." />
                        )}
                    </div>
                </div>

                {/* Tilføj bil */}
                <form onSubmit={handleSubmit(onAdd)} className="flex flex-col gap-s">
                    <h2 className="text-xl font-extrabold">Tilføj bil</h2>
                    <div className="flex flex-col gap-s bg-grey-5 border-b border-b-grey-10 p-s">
                        <Input
                            id="license_plate"
                            label="Nummerplade"
                            placeholder="AB12345"
                            type="text"
                            showLicensePlate
                            bgWhite
                            error={errors.license_plate?.message}
                            {...register("license_plate", {
                                pattern: { value: /^[A-Za-z]{2}[0-9]{5}$/, message: "Nummerplade skal være 2 bogstaver og 5 tal (fx AB12345)" },
                                onChange: (e) => { e.target.value = e.target.value.toUpperCase() }
                            })}
                        />
                    </div>
                    {error && <Error>{error.message}</Error>}
                    <Button type="submit" icon={false} variant="dark" disabled={!isDirty}>
                        Tilføj bil
                    </Button>
                </form>
            </div>

            {activeDialogBox && (
                <DialogModal
                    dialogMessage={`Er du sikker på, at du vil slette nummerpladen ${activeDialogBox}?`}
                    buttonText="Slet nummerplade"
                    onConfirm={() => {
                        handleDelete(activeDialogBox);
                        setActiveDialogBox(null);
                    }}
                    onCancel={() => setActiveDialogBox(null)}
                />
            )}
        </>
    );
}
