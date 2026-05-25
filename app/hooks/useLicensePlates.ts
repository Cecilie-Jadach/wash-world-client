import { useQuery } from "@tanstack/react-query";
import { UserLicensePlates } from "@/types/licenseplates";

//En funktion der henter nummerplader fra serveren. Den modtager en token og lover at returnere et array af UserLicensePlates.
const fetchLicensePlates = async (token: string): Promise<UserLicensePlates[]> => {
    //Sender et GET-kald til serveren med brugerens token, så serveren ved hvem der spørger.
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/license-plates`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    //Hvis serveren svarer med en fejl, kastes den videre. Ellers returneres listen af nummerplader.
    if (!response.ok) throw new Error((await response.json()).error)
    const data = await response.json()
    return data.license_plates
}

//useQuery bruges til at hente data (modsat useMutation der ændrer data). Den holder styr på loading, fejl og selve dataen.
export function useLicensePlates() {
    return useQuery({
        //Et unikt navn på denne forespørgsel i cachen. Det er det samme nøgle som invalidateQueries bruger i useAddLicensePlate — det er sådan de to hænger sammen.
        queryKey: ["license-plates"],
        //Den funktion React Query kalder når den skal hente data. Den henter token fra browseren og kalder fetchLicensePlates.
        queryFn: () => {
            const token = localStorage.getItem("token") ?? ""
            return fetchLicensePlates(token)
        },
        //Sørger for at forespørgslen kun kører i browseren og ikke på serveren.
        //Next.js renderer sider både på server og klient, og localStorage findes ikke på serveren — så uden denne linje ville koden crashe.
        enabled: typeof window !== "undefined",
    })
}
