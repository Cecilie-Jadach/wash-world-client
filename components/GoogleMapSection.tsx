"use client"

import { useEffect, useState } from 'react'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'

type Location = {
    location_name: string
    latitude: number
    longitude: number
}

function GoogleMapSection() {
    const [locations, setLocations] = useState<Location[]>([])

    useEffect(() => {
        const fetchLocations = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locations`)
            const data = await res.json()
            setLocations(data.locations)
        }
        fetchLocations()
    }, [])

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <Map
                style={{ width: '100%', height: '595px' }}
                defaultCenter={{ lat: 56.2639, lng: 9.5018 }}
                defaultZoom={7}
                mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || ''}
            >
                {locations.map((loc, index) => (
                    <AdvancedMarker
                        key={index}
                        position={{ lat: loc.latitude, lng: loc.longitude }}
                        title={loc.location_name}>
                        <img src="/icons/washworld-marker.svg" alt="WashWorld" className="w-10 h-10" />
                    </AdvancedMarker>
                ))}
            </Map>
        </APIProvider>
    )
}

export default GoogleMapSection