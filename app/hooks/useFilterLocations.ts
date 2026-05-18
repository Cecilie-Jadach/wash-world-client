import { useState } from "react";
import { Location } from "../../types/location";

export function useFilterLocations(locations: Location[]) {  // modtager locations som parameter
    const [search, setSearch] = useState("");
    const [filterSelfWash, setFilterSelfWash] = useState(false);
    
    const filteredLocations = (locations ?? []).filter((location) => {
        
        const matchesSearch = 
            location.location_city.toLowerCase().startsWith(search.toLowerCase()) ||
            String(location.location_postal_code).startsWith(search) //String(loc.location_postal_code).startsWith(search) betyder at "21" matcher 2100, 2150, 2200 osv. — og jo mere man skriver, jo færre resultater.
        
        const matchesSelfWash = filterSelfWash ? location.location_self_washing > 0 : true
        
        return matchesSearch && matchesSelfWash
})

    return {
        filteredLocations,
        search, 
        setSearch,
        filterSelfWash,
        setFilterSelfWash
    }
}