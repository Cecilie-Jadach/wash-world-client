"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Error from "@/components/Error";
import LicensePlates from "@/components/LicensePlates";
import { useAddLicensePlate } from "../hooks/useAddLicensePlate";
import { useDeleteLicensePlate } from "../hooks/useDeleteLicensePlate";
import { useLicensePlates } from "../hooks/useLicensePlates";

interface AddPlateForm {
    license_plate: string;
}

export default function EditCars() {
    const router = useRouter();
    const { addLicensePlate, isPending: isAdding, error: addError } = useAddLicensePlate();
    const { deleteLicensePlate } = useDeleteLicensePlate();
    const { data: licensePlates } = useLicensePlates();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty }
    } = useForm<AddPlateForm>({ mode: "onTouched", defaultValues: { license_plate: "" } });

    const onAdd = async (data: AddPlateForm) => {
        try {
            await addLicensePlate(data.license_plate);
            toast.success("Nummerplade tilføjet");
            reset();
        } catch {
            // error shown below the form via addError
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
        <div className="mx-2xs mt-xl pb-4xl flex flex-col gap-ml">
            <button onClick={() => router.back()} className="w-fit">
                <Image src="/icons/arrow_left_icon.svg" alt="Arrow left icon" height={20} width={20} />
            </button>

            {/* Dine biler */}
            <div className="flex flex-col gap-s">
                <h2 className="text-xl font-extrabold">Dine biler</h2>
                <div className="flex flex-col gap-xs">
                    <LicensePlates showTrashIcon onDelete={handleDelete} />
                    {(licensePlates ?? []).length <= 1 && (
                        <div className="flex gap-2xs">
                            <Image src="/icons/information_icon.svg" alt="Grey information icon" height={16} width={16} />
                            <p className="text-sm">Tilføj en nummerplade, før du kan slette denne.</p>
                        </div>
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
                {addError && <Error>{addError.message}</Error>}
                <Button type="submit" icon={false} variant="dark" disabled={!isDirty || isAdding}>
                    {isAdding ? "Tilføjer..." : "Tilføj bil"}
                </Button>
            </form>
        </div>
    );
}
