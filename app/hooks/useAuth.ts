import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    router.push("/");
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
    onSuccess: handleLogout,
  });

  return { handleLogout, deleteUserMutation };
}
