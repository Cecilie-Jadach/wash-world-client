import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteLicensePlate() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteLicensePlate,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (plate: string) => {
      const token = localStorage.getItem("token") ?? "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api-delete-license-plate/${plate}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error((await res.json()).error);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["license-plates"] });
    },
  });

  return { deleteLicensePlate, isPending, error };
}
