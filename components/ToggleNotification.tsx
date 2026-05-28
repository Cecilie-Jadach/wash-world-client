import { useToggleOffers } from "@/app/hooks/useToggleOffers";
import { useState, useEffect } from "react";

export default function ToggleNotification() {
    //Henter to ting fra useToggleOffers hook
    //offersData er brugerens nuværende data fra backend, 
    //og toggleMutation er funktionen der kalder PATCH endpointet.
    const { toggleMutation, offersData } = useToggleOffers();
    //Opretter en lokal state der styrer om togglen er tændt eller slukket. 
    // Den starter som false fordi vi endnu ikke ved hvad værdien er fra backend.
    const [isToggled, setIsToggled] = useState(false);

    //Denne funktion kører hver gang offersData ændrer sig. 
    //Det sker fx når siden loader og React Query henter data fra backend. 
    //Uden denne ville togglen altid starte som false uanset hvad der er gemt i databasen.
    useEffect(() => {
        if (offersData) {
        //Sætter isToggled til true hvis backend returnerer 1, og false hvis den returnerer 0. 
        //Det er her databaseværdien oversættes til en boolean.
            setIsToggled(offersData.offers_accepted === 1);
        }
    }, [offersData]);

    //Kaldes når brugeren klikker. 
    //Den gør to ting på én gang — setIsToggled(prev => !prev) flipper den visuelle toggle med det samme så det føles responsivt, 
    //og toggleMutation.mutate() sender PATCH kaldet til backend i baggrunden.
    const handleToggle = () => {
    setIsToggled(prev => !prev); // Optimistisk opdatering
    //undefined fordi vi ikke sender nogen data til mutationFn, men det er nødvendigt at have det spm argument for at komme ned til onError
    toggleMutation.mutate(undefined, {
        onError: () => {
            setIsToggled(prev => !prev); // Rul tilbage ved fejl
        }
    });
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