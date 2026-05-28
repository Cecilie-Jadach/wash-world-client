"use client"

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps"

//Next
import Image from 'next/image'

//Components
import Button from "@/components/Button"
import BusynessLabel from "@/components/BusynessLabel"
import MapZoom from "./MapZoom"
import IfNotUser from "./IfNotUser"
import LoadingSpinner from "./LoadingSpinner"
import LocationFacilitiesInfo from "./LocationFacilitiesInfo"

//Types
import { Location } from "@/types/location"

//Hooks
import { useLocations } from "@/app/hooks/useLocations"
import { useFilterLocations } from "@/app/hooks/useFilterLocations"
import { useState } from "react"
import { useUser } from "@/app/hooks/useUser"

function GoogleMapSection() {
    const { data: user, isPending } = useUser();
    const { data } = useLocations();
    //react state variabel. selectedLocation = the chosen location, setSelectedLocation = the function we call when the value in selectedLocation change
    //<Location | null> = typescript type that says that it is either a location object or null
    //(null) = the startvalue (no location chosen on the offical load)
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    //custom hook that returns a object with three things: search, setSearch, filteredLocations
    //search = what is being written in the searchfield 
    //setSearch = the function for updating the search text
    //filteredLocations = the list of locations that match the search text
    //data ?? [] = if the data exist use data otherwise use an empty array
    const { search, setSearch, filteredLocations, filterSelfWash, setFilterSelfWash } = useFilterLocations(data ?? [])


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

    if (isPending) return (
        <LoadingSpinner />
    )

    if (!user) return <IfNotUser />

    return (
        <div className="relative">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                <Map
                    style={{ width: "100%", height: "100vh" }}
                    defaultCenter={position}
                    defaultZoom={7}
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || ""}
                    disableDefaultUI={true}
                >
                    {/* Component to handle the zoom function, when clicking on location*/}
                    <MapZoom selectedLocation={selectedLocation} />

                    {(filteredLocations).map((location, index) => (
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
                    zIndex: 9999
                }}>
                <div
                    className="relative w-full mx-xs"
                    style={{ pointerEvents: "auto" }}  // genaktiver kun på selve søgefeltet
                >
                    <div className="flex justify-between w-full border-b border-grey-10 bg-white px-2xs py-xs placeholder:text-grey-60 focus:outline-1 focus:outline-green-border">
                        <div className="flex gap-2xs grow">
                            <Image src="/icons/search_icon.svg" alt="search icon" height={20} width={20} />
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
                        <Image src="/icons/location_pen_icon.svg" alt="location pin icon" height={20} width={20} />
                    </div>

                    {/* Dropdown */}
                    {showDropdown && filteredLocations.length > 0 && (
                        <ul className="absolute top-7 left-0 w-full bg-white mt-4xs max-h-60 overflow-y-auto px-3xs">
                            {filteredLocations.map((location, index) => (
                                <li
                                    key={index}
                                    className="p-2xs cursor-pointer border-b border-grey-10"
                                    onMouseDown={() => handleSelectLocation(location)}  // onMouseDown før onBlur
                                >
                                    <p>{location.location_name}, {location.location_postal_code}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Filter toggle knap */}
            <button data-cy="filter-button"
                className="pointer-events-auto absolute top-2xl right-xs z-999 bg-white shadow-md p-3xs w-[36px] h-[36px] flex items-center justify-center"
                onClick={() => setShowFilter(!showFilter)}>
                {showFilter ?
                    <Image src="/icons/cross_icon.svg" alt="close filter" width={12} height={12} /> :
                    <Image src="/icons/filter_icon.svg" alt="filter" width={20} height={20} />}
            </button>

            {/* Show filter */}
            {showFilter && (
                <div className="pointer-events-auto absolute top-5xl right-xs z-999 bg-white shadow-md flex overflow-hidden">
                    <button
                        onClick={() => setFilterSelfWash(false)}
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', marginRight: '-8px' }}
                        className={`px-xs py-4xs text-sm transition-colors ${!filterSelfWash
                            ? 'bg-green-white-background text-white font-extrabold'
                            : 'bg-white'}`}>
                        Vaskehaller
                    </button>
                    <button
                        onClick={() => setFilterSelfWash(true)}
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' }}
                        className={`px-xs py-4xs text-sm transition-colors ${filterSelfWash
                            ? 'bg-green-white-background text-white font-extrabold'
                            : 'bg-white'}`}>
                        Vask selv
                    </button>
                </div>)}


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
                        className="bg-white w-[97%] p-xs grid gap-2xs border border-grey-10 shadow-md"
                    >
                        <div className="grid gap-3xs">
                            <div className="grid gap-4xs">
                                <button className="justify-self-end" onClick={() => setSelectedLocation(null)}>
                                    <Image src="/icons/cross_icon.svg" alt="cross icon" width={12} height={12} />
                                </button>
                                <h2 className="font-extrabold">{selectedLocation.location_name}</h2>
                                <p className="font-light text-sm">{selectedLocation.location_address} {selectedLocation.location_address_number}, {selectedLocation.location_postal_code} {selectedLocation.location_city}</p>
                            </div>
                            <BusynessLabel status={selectedLocation.busyness_status} />
                        </div>

                        <div className="grid">
                            <LocationFacilitiesInfo data="7-22" icon="/icons/clock_icon.svg" facility="Åbningstid" />
                            <LocationFacilitiesInfo data={selectedLocation.location_washrooms} icon="/icons/carwash.svg" facility="Vaskehaller" />
                            {selectedLocation.location_self_washing > 0 && (
                                <LocationFacilitiesInfo data={selectedLocation.location_self_washing} icon="/icons/water.svg" facility="Vask selv" />
                            )}
                        </div>


                        {selectedLocation.location_operation_status > 0
                            ? <div className="flex gap-3xs"><div className="flex gap-4xs items-center"> <Image src="/icons/alert_icon.svg" alt="alert icon" width={20} height={20} className="min-w-s" /></div><p className="font-extrabold text-sm">{selectedLocation.location_operation_status_message}</p></div>
                            : <div className="flex gap-3xs"><div className="flex gap-4xs items-center"> <Image src="/icons/check_green_icon.svg" alt="green check icon" width={20} height={20} className="min-w-s" /></div><p className="font-extrabold text-sm">Alt er som det skal være.</p></div>
                        }
                        <div className="grid">
                            <a className="justify-self-end" href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.location_address}+${selectedLocation.location_address_number},+${selectedLocation.location_postal_code}+${selectedLocation.location_city}`}
                            // target="_blank"
                            >
                                <Button icon={false}>Rute</Button>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GoogleMapSection;
