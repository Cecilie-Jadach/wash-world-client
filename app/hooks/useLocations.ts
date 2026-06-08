import { useQuery } from "@tanstack/react-query";
import { Location } from "@/types/location";

const fetchLocations = async (): Promise<Location[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/locations`);
  const data = await response.json();
  if (!response.ok) throw new Error((await response.json()).error);
  return data.locations;
};

//useQuery hook that returns {data}
export function useLocations() {
  //er en TypeScript generisk type der fortæller TanStack Query at den forventede data er et array af Location-objekter, så du får TypeScript-autofuldførelse og typetjek når du bruger data i dine komponenter
  return useQuery<Location[]>({
    //queryKey that needs to be uniqe
    queryKey: ["locations"],
    //pass in the fetchLocationsQuery function to the queryFn (query function)
    queryFn: fetchLocations,
  });
}

// TanStack Query giver dig automatisk:

// Caching – hvis du har hentet locations før, bruger den den gemte data i stedet for at hente igen
// Loading og error state – isLoading, isError er klar til brug
// Refetching – henter automatisk frisk data når du f.eks. skifter fane og kommer tilbage
// Retry – prøver automatisk igen hvis et request fejler
// Deling på tværs af komponenter – to komponenter der bruger samme queryKey deler automatisk data uden at lave to requests
