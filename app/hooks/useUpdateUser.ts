"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateUserPayload = {
    email: string;
    phone: string;
    primary_location: string;
};

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: UpdateUserPayload) => {
            const token = localStorage.getItem("token") ?? "";
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error((await res.json()).error);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
}
