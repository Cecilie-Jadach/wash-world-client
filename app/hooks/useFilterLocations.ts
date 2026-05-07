import { useState } from "react";
import { Location } from "../../types/location";

export function useFilterLocations(locations: Location[]) {  // modtager locations som parameter
    const [search, setSearch] = useState("");
    
    const filteredLocations = (locations ?? []).filter((loc) => 
    loc.location_city.toLowerCase().startsWith(search.toLowerCase()) ||
    String(loc.location_postal_code).startsWith(search) //String(loc.location_postal_code).startsWith(search) betyder at "21" matcher 2100, 2150, 2200 osv. — og jo mere man skriver, jo færre resultater.
)

    return {
        filteredLocations,
        search, 
        setSearch
    }
}