import { useQuery } from "@tanstack/react-query";
import { UserLicensePlates } from "@/types/licenseplates";

const fetchLicensePlates = async (token: string): Promise<UserLicensePlates[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/license-plates`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) throw new Error((await response.json()).error)
    const data = await response.json()
    return data.license_plates
}

export function useLicensePlates() {
    return useQuery({
        queryKey: ["license-plates"],
        queryFn: () => {
            const token = localStorage.getItem("token") ?? ""
            return fetchLicensePlates(token)
        },
        enabled: typeof window !== "undefined",
    })
}
