"use client"
import { useMap } from "@vis.gl/react-google-maps"
import { useEffect } from "react"
import { Location } from "@/types/location"

// Lille komponent kun til zoom-logik
export default function MapZoom({ selectedLocation }: { selectedLocation: Location | null }) {
    const map = useMap();

    useEffect(() => {
        //Kører når map eller selectedLocation ændrer sig. Hvis kortet ikke er klar eller ingen lokation er valgt, stopper den bare.
        if (!map || !selectedLocation) return;
        map.panTo({ lat: selectedLocation.latitude, lng: selectedLocation.longitude });
        map.setZoom(10);
    }, [map, selectedLocation]);

    //Komponenten viser ingenting i UI'et — den eksisterer kun for at indeholde zoom-logikken
    return null;
}