import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    // replace instead of push so the user can't navigate back to the previous page
    router.replace("/");
  };

  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token") ?? "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api-delete-user`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error((await res.json()).error);
      return res.json();
    },
    // replace instead of push so the user can't navigate back to the profile page after deletion
    onSuccess: () => router.replace("/account-deleted"),
  });

  return { handleLogout, deleteUserMutation };
}
