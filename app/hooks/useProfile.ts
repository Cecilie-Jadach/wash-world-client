import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/types/profile";

const fetchProfile = async (token: string): Promise<Profile> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
};

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      const token = localStorage.getItem("token") ?? "";
      return fetchProfile(token);
    },
    enabled: typeof window !== "undefined",
  });
}
