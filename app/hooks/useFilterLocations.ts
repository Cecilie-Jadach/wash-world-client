import { useState } from "react";
import { Location } from "../../types/location";

//En custom hook der tager et array af Location-objekter som parameter
export function useFilterLocations(locations: Location[]) {  // modtager locations som parameter
    //search holder styr på hvad brugeren har skrevet i søgefeltet – starter som en tom streng. 
    //filterSelfWash er en boolean der holder styr på om selvvask-filteret er aktivt – starter som false.
    const [search, setSearch] = useState("");
    const [filterSelfWash, setFilterSelfWash] = useState(false);
    
    //Filtrerer locations-arrayet. locations ?? [] betyder at hvis locations er undefined eller null, bruges et tomt array i stedet
    //Det forhindrer en fejl hvis data ikke er hentet endnu.
    const filteredLocations = (locations ?? []).filter((location) => {
        
        //Tjekker om lokationen matcher søgeteksten. Enten skal bynavnet starte med søgeteksten (case-insensitivt), eller postnummeret skal starte med søgeteksten. 
        //String() konverterer postnummeret fra number til string så man kan bruge startsWith
        const matchesSearch = 
            location.location_city.toLowerCase().startsWith(search.toLowerCase()) ||
            String(location.location_postal_code).startsWith(search) //String(loc.location_postal_code).startsWith(search) betyder at "21" matcher 2100, 2150, 2200 osv. — og jo mere man skriver, jo færre resultater.
        
            //Tjekker om selvvask-filteret er aktivt. Hvis filterSelfWash er true, skal lokationen have mindst ét selvvaskested (> 0). 
            //Hvis filteret er slået fra, returneres true for alle lokationer – altså ingen filtrering.
        const matchesSelfWash = filterSelfWash ? location.location_self_washing > 0 : true
        
        //Lokationen inkluderes kun i resultatet hvis begge betingelser er opfyldt – den matcher søgeteksten OG opfylder selvvask-filteret.
        return matchesSearch && matchesSelfWash
})

//Returnerer det filtrerede array samt state og setState-funktionerne, 
//så komponenten der bruger hooken kan vise de filtrerede lokationer og opdatere filtrene via søgefelt og toggle.
    return {
        filteredLocations,
        search, 
        setSearch,
        filterSelfWash,
        setFilterSelfWash
    }
}