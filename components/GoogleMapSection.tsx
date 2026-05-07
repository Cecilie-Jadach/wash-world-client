"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import Image from 'next/image'

//components
import Button from "../components/Button"
import BusynessLabel from "../components/BusynessLabel"
import MapZoom from "./MapZoom"

//type
import { Location } from "../types/location";

//hooks
import { fetchLocationsQuery } from "../app/hooks/useLocations"
import { useFilterLocations } from "../app/hooks/useFilterLocations"
import { useQuery } from '@tanstack/react-query'
import { useState } from "react";

function GoogleMapSection() {
    //react state variabel. selectedLocation = the chosen location, setSelectedLocation = the function we call when the value in selectedLocation change
    //<Location | null> = typescript type that says that it is either a location object or null
    //(null) = the startvalue (no location chosen on the offical load)
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    //useQuery hook that returns {data}
    const { data } = useQuery<Location[]>({
        //queryKey that needs to be uniqe
        queryKey: ['locations'],
        //pass in the fetchLocationsQuery function to the queryFn (query function)
        queryFn: fetchLocationsQuery
    });

    //custom hook that returns a object with three things: search, setSearch, filteredLocations
    //search = what is being written in the searchfield 
    //setSearch = the function for updating the search text
    //filteredLocations = the list of locations that match the search text
    //data ?? [] = if the data exist use data otherwise use an empty array
    const { search, setSearch, filteredLocations } = useFilterLocations(data ?? [])


    //function that runs when you choose a location
    //setSelectedLocation(location) = save the clicked location and open modal
    //setSearch("") = clear the search field 
    //setShowDropdown(false) = close dropdown
    const handleSelectLocation = (location: Location) => {
        setSelectedLocation(location);
        setSearch("");
        setShowDropdown(false);
    };

    //start position for the map
    const position = { lat: 56.2639, lng: 9.5018 }

    return (
        <div className="relative">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                <Map
                    style={{ width: "100%", height: "596px" }}
                    defaultCenter={position}
                    defaultZoom={7}
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || ""}
                    disableDefaultUI={true}
                >
                    {/* Component to handle the zoom function, when clicking on location*/}
                    <MapZoom selectedLocation={selectedLocation} /> 

                    {(data ?? []).map((location, index) => (
                        <AdvancedMarker
                            key={index}
                            position={{ lat: location.latitude, lng: location.longitude }}
                            onClick={() => setSelectedLocation(location)}
                        >
                            <img src="/icons/washworld-marker.svg" alt="WashWorld" className="scale-70" />
                        </AdvancedMarker>
                    ))}
                </Map>
            </APIProvider>

            {/* Søgefelt — pointer-events: none på wrapper så klik går igennem til kortet */}
            <div
                style={{ 
                pointerEvents: "none", 
                position: "absolute", 
                top: "0.5rem", 
                left: "0", 
                width: "100%", 
                display: "flex", 
                justifyContent: "center", 
                zIndex: 9999}}>
                <div
                    className="relative w-[95%]"
                    style={{ pointerEvents: "auto" }}  // genaktiver kun på selve søgefeltet
                >
                    <div className="flex justify-between w-full border-b border-grey-10 bg-white px-2xs py-xs placeholder:text-grey-60 focus:outline-1 focus:outline-green-border">
                        <div className="flex gap-2xs grow">
                        <Image src="/icons/search_icon.svg" alt="search icon" height={20} width={20}/>
                        <input
                        className="grow focus:outline-0"
                        placeholder="Søg på by eller postnummer..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowDropdown(e.target.value.length > 0);
                        }}
                    />
                        </div>
                    <Image src="/icons/location_pen_icon.svg" alt="location pin icon" height={20} width={20}/>
                    </div>

                    {/* Dropdown */}
                    {showDropdown && filteredLocations.length > 0 && (
                        <ul className="absolute top-7 left-0 w-full bg-white rounded-[5px] max-h-60 overflow-y-auto">
                            {filteredLocations.map((location, index) => (
                                <li
                                    key={index}
                                    className="p-2xs cursor-pointer"
                                    onMouseDown={() => handleSelectLocation(location)}  // onMouseDown før onBlur
                                >
                                    <p>{location.location_name}, {location.location_postal_code}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Modal */}
            {selectedLocation && (
                <div
                    //lays over the map but under the "modal"
                    //onclick the modal for the selectedLocation close
                    onClick={() => setSelectedLocation(null)}
                    className="fixed bottom-[12%] left-0 w-full h-full z-999 flex items-end justify-center"
                >
                    <div
                        //onClick={(e) => e.stopPropagation()} = to stop event bubbling
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-[97%] p-sm grid gap-s border border-black"
                    >
                        <div className="grid gap-xs">
                            <div className="grid gap-3xs">
                                <button className="justify-self-end" onClick={() => setSelectedLocation(null)}>
                                    <Image src="/icons/cross_icon.svg" alt="cross icon" width={18} height={18} />
                                </button>
                                <h2 className="font-extrabold text-lg">{selectedLocation.location_name}</h2>
                                <p>{selectedLocation.location_address} {selectedLocation.location_address_number}, {selectedLocation.location_postal_code} {selectedLocation.location_city}</p>
                            </div>
                            <div>
                                <a  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.location_address}+${selectedLocation.location_address_number},+${selectedLocation.location_postal_code}+${selectedLocation.location_city}`}
                                    // target="_blank"
                                    >
                                <Button icon={false}>Rutevejledning</Button>
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-xs">
                            <div className="flex gap-3xs items-center">
                                <Image src="/icons/clock_icon.svg" alt="clock icon" width={24} height={24} />
                                <p className="text-lg font-extrabold">7-22</p>
                            </div>
                            <div className="grid gap-4xs">
                                <div className="flex gap-3xs">
                                    <p>Vaskehaller:</p>
                                    <p className="font-extrabold">{selectedLocation.location_washrooms}</p>
                                </div>
                                <div>
                                    {selectedLocation.location_self_washing > 0 && (
                                        <div className="flex gap-3xs">
                                            <p>Vask selv:</p>
                                            <p className="font-extrabold">{selectedLocation.location_self_washing}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4xs pt-s border-t border-grey-10">
                            {selectedLocation.location_operation_status > 0
                                ? <div className="grid gap-4xs"><div className="flex gap-4xs items-center"><p>Driftstatus:</p> <Image src="/icons/alert_icon.svg" alt="alert icon" width={20} height={20} /></div><p className="font-extrabold">{selectedLocation.location_operation_status_message}</p></div>
                                : <div className="grid gap-4xs"><div className="flex gap-4xs items-center"><p>Driftstatus:</p> <Image src="/icons/check_green_icon.svg" alt="green check icon" width={20} height={20} /></div><p className="font-extrabold">Alt er som det skal være.</p></div>
                            }
                        </div>
                        <BusynessLabel status={selectedLocation.busyness_status} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default GoogleMapSection;
