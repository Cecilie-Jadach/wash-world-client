import { useToggleOffers } from "@/app/hooks/useToggleOffers";

// React
import toast from 'react-hot-toast'


export default function ToggleNotification() {
    const { toggleMutation, isToggled } = useToggleOffers();

const handleToggle = async () => {
    try {
        await toggleMutation.mutateAsync(undefined);
    } catch {
        toast.error("Noget gik galt. Prøv igen.");
    }
}

    return (
        <label htmlFor="notification-toggle" className={`flex cursor-pointer relative w-lg h-sm rounded-full ${isToggled ? `bg-green-white-background` : `bg-grey-60`} ` }>
            <input
                id="notification-toggle"
                name="notification-toggle"
                type="checkbox"
                checked={isToggled}
                onChange={handleToggle}
                className="sr-only"
            />
            <span className={`w-s h-s absolute bg-white rounded-full top-[3px] transition-all duration-500 
                ${isToggled ? "right-[3px]" : "right-[25px]"}`}
            />
        </label>
    )
}