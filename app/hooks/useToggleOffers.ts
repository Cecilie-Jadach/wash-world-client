"use client"
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"

const getToken = () => localStorage.getItem("token") ?? "";

const toggleNotificationFetch = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api-toggle-offers`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
    if (!response.ok) throw new Error((await response.json()).error);
    return response.json();
}

const getNotificationFetch = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api-get-offers`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
    if (!response.ok) throw new Error((await response.json()).error);
    return response.json();
}

export function useToggleOffers() {
    //Giver adgang til TanStack Querys cache, så du kan læse og opdatere cached data manuelt.
    const queryClient = useQueryClient();

    //Henter brugerens offers-data fra serveren og cacher den under nøglen "offers". 
    //data omdøbes til offersData for at gøre det mere læsbart.
    const { data: offersData } = useQuery({
        queryKey: ["offers"],
        queryFn: () => getNotificationFetch()
    });

    //En midlertidig lokal state der holder den optimistiske værdi. Den kan være true, false eller null. 
    //null betyder at der ikke er nogen optimistisk værdi i gang – så bruges serverdata i stedet.
    const [optimisticToggle, setOptimisticToggle] = useState<boolean | null>(null);

    //Definerer en mutation der kalder din API når den køres. mutationFn er det faktiske API-kald.
    const toggleMutation = useMutation({
        mutationFn: () => toggleNotificationFetch(),

        //Kører med det samme når brugeren klikker – før API-kaldet er færdigt. 
        //Sætter optimisticToggle til den modsatte værdi af den nuværende. 
        //Hvis offers_accepted er 1 sættes den til false, og omvendt.
        onMutate: () => {
            // Sæt den optimistiske værdi med det samme
            setOptimisticToggle(offersData?.offers_accepted !== 1);
        },

        //Hvis API-kaldet fejler, nulstilles optimisticToggle til null – så UI'et ruller tilbage til serverdata.
        onError: () => {
            // Rul tilbage ved fejl
            setOptimisticToggle(null);
        },

        //Kører altid til sidst uanset om det lykkedes eller fejlede. 
        //Nulstiller optimisticToggle og beder TanStack Query om at hente frisk data fra serveren så cachen er synkroniseret.
        onSettled: () => {
            setOptimisticToggle(null);
            queryClient.invalidateQueries({ queryKey: ["offers"] });
        }
    });

    // Brug optimisticToggle hvis den findes, ellers brug serverdata
    //?? betyder "brug venstre side hvis den ikke er null eller undefined, ellers brug højre side". 
    //Så mens API-kaldet kører bruges optimisticToggle, og når det er færdigt og optimisticToggle er nulstillet til null, bruges serverdata igen.
    const isToggled = optimisticToggle ?? offersData?.offers_accepted === 1;

    return { toggleMutation, offersData, isToggled };
}
//toggleNotificationFetch sender et asynkront PATCH-request til /api-toggle-offers med brugerens JWT i Authorization-headeren. 
//Serveren bruger tokenet til at verificere og identificere brugeren. 
//Hvis serveren returnerer en fejlstatus, kastes en fejl med serverens fejlbesked 
//— ellers parses og returneres response-body'en som et JavaScript-objekt.