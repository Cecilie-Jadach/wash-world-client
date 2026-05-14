import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";

const fetchUser = async (token: string): Promise<User> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
};

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = localStorage.getItem("token") ?? "";
      return fetchUser(token);
    },
    enabled: typeof window !== "undefined",
  });
}
