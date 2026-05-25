import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateUserInfo = {
  email: string;
  phone: string;
  primary_location: string;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  // useMutation handles the PATCH request and tracks loading/error state for us
  const {
    mutateAsync: updateUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (UpdateUserInfo: UpdateUserInfo) => {
      const token = localStorage.getItem("token") ?? "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api-update-user`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(UpdateUserInfo),
        },
      );
      // Throw so useMutation catches it and exposes it via the error field
      if (!res.ok) throw new Error((await res.json()).error);
      return res.json();
    },
    // Refetch the user so the profile page shows the updated values immediately
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { updateUser, isPending, error };
}
