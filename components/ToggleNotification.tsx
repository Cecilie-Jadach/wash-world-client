import { useToggleOffers } from "@/app/hooks/useToggleOffers";


export default function ToggleNotification() {
    const { toggleMutation, offersData } = useToggleOffers();

    const isToggled = offersData?.offers_accepted === 1;

    const handleToggle = () => {
        toggleMutation.mutate(undefined, {
            onError: () => {
                // React Query genindlæser automatisk via invalidateQueries
            }
        });
    }

    console.log("offersData:", offersData)

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