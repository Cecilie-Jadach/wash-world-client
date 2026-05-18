import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddLicensePlate() {
  const queryClient = useQueryClient();

  const { mutateAsync: addLicensePlate, isPending, error } = useMutation({
    mutationFn: async (license_plate: string) => {
      const token = localStorage.getItem("token") ?? "";
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api-add-license-plate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ license_plate }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["license-plates"] });
    },
  });

  return { addLicensePlate, isPending, error };
}
