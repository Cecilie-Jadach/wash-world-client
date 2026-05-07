//////////////////// FETCH LOCATIONS ////////////////////
//async function that is used for the useQuery hook in the GoogleMapSection
export const fetchLocationsQuery = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locations`, {method: 'GET'})
    const data = await response.json()
    return data.locations
}