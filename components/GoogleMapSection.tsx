"use client";

import { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Location } from "../types/location";
import Button from "../components/Button"
import BusynessLabel from "../components/BusynessLabel"
import Image from 'next/image'

function GoogleMapSection() {
const [locations, setLocations] = useState<Location[]>([]);
const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
);

useEffect(() => {
    const fetchLocations = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locations`);
    const data = await res.json();
    setLocations(data.locations);
    };
    fetchLocations();
}, []);

return (
    <>
    {/* https://visgl.github.io/react-google-maps/docs/api-reference/components/api-provider */}
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        {/* https://visgl.github.io/react-google-maps/docs/api-reference/components/map */}
        <Map
        style={{ width: "100%", height: "100vh" }}
        defaultCenter={{ lat: 56.2639, lng: 9.5018 }}
        defaultZoom={7}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || ""}
        >
        {locations.map((location, index) => (
            <AdvancedMarker
            key={index}
            position={{ lat: location.latitude, lng: location.longitude }}
            onClick={() => setSelectedLocation(location)}
            >
            <img
                src="/icons/washworld-marker.svg"
                alt="WashWorld"
                className="scale-70"
            />
            </AdvancedMarker>
        ))}
        </Map>
    </APIProvider>

    {selectedLocation && (
        <div
        onClick={() => setSelectedLocation(null)}
        className="fixed bottom-[12%] left-0 w-full h-full z-999 flex items-end justify-center"
        >
        <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[97%] p-sm grid gap-s border border-black"
        >
            <div className="grid gap-xs">
                <div className="grid gap-3xs">
                    <button className="justify-self-end" onClick={() => setSelectedLocation(null)}><Image src="/icons/cross_icon.svg" alt="cross icon" width={18} height={18} /></button>
                    <h2 className="font-extrabold text-lg">{selectedLocation.location_name}</h2>
                    <p>{selectedLocation.location_address} {selectedLocation.location_address_number}, {selectedLocation.location_postal_code} {selectedLocation.location_city}</p>
                </div>
                <div>
                    <Button icon={false}>Rutevejledning</Button>
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
                        {selectedLocation.location_self_washing > 0 && <div className="flex gap-3xs"><p>Vask selv:</p><p className="font-extrabold">{selectedLocation.location_self_washing}</p></div>}
                    </div>
                </div>
            </div>

            <div className="grid gap-4xs pt-s border-t border-grey-10">
                {selectedLocation.location_operation_status > 0 ? <div className="grid gap-4xs"><div className="flex gap-4xs items-center"><p>Driftstatus:</p> <Image src="/icons/alert_icon.svg" alt="alert icon" width={20} height={20}/></div><p className="font-extrabold">{selectedLocation.location_operation_status_message}</p></div> : <div className="grid gap-4xs"><div className="flex gap-4xs items-center"><p>Driftstatus:</p> <Image src="/icons/check_green_icon.svg" alt="green check icon" width={20} height={20}/></div><p className="font-extrabold">Alt er som det skal være.</p></div>}
            </div>
            <BusynessLabel status={selectedLocation.busyness_status}></BusynessLabel>

        </div>
        </div>
    )}
    </>
);
}

export default GoogleMapSection;
