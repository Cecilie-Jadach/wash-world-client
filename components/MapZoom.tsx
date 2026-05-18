"use client"
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { Location } from "../types/location"

// Lille komponent kun til zoom-logik
export default function MapZoom({ selectedLocation }: { selectedLocation: Location | null }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !selectedLocation) return;
        map.panTo({ lat: selectedLocation.latitude, lng: selectedLocation.longitude });
        map.setZoom(10);
    }, [map, selectedLocation]);

    return null;
}