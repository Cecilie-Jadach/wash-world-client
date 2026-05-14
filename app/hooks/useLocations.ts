import { useQuery } from "@tanstack/react-query";
import { Location } from "@/types/location";

const fetchLocations = async (): Promise<Location[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/locations`,
    { method: "GET" },
  );
  const data = await response.json();
  return data.locations;
};

//useQuery hook that returns {data}
export function useLocations() {
  return useQuery<Location[]>({
    //queryKey that needs to be uniqe
    queryKey: ["locations"],
    //pass in the fetchLocationsQuery function to the queryFn (query function)
    queryFn: fetchLocations,
  });
}

// Keep for backward compatibility with GoogleMapSection
export const fetchLocationsQuery = fetchLocations;
