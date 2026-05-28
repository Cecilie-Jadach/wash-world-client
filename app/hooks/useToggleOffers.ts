import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"

const getToken = () => localStorage.getItem("token") ?? "";

const toggleNotificationFetch = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api-toggle-offers`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
    if (!response.ok) throw new Error((await response.json()).error);
    return response.json();
}

const getNotificationFetch = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api-get-offers`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
    if (!response.ok) throw new Error((await response.json()).error);
    return response.json();
}


export function useToggleOffers() {
    const queryClient = useQueryClient();

    const toggleMutation = useMutation({
        mutationFn: () => toggleNotificationFetch(), 
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["offers"] })
    })

    const { data: offersData } = useQuery({
        queryKey: ["offers"],
        queryFn: () => getNotificationFetch()
    });

    return {toggleMutation, offersData };
}

