import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";

//Promise<User> lover at når funktionen er færdig, vil den returnere et objekt der har formen af din User-type.
const fetchUser = async (token: string): Promise<User> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
};

export function useUser() {
  return useQuery({
    //queryKey: ["user"] bruges som unik nøgle til caching
    queryKey: ["user"],
    queryFn: () => {
      const token = localStorage.getItem("token") ?? "";
      return fetchUser(token);
    },
    //enabled: typeof window !== "undefined" sikrer at koden kun kører i browseren og ikke under server-side rendering, hvor localStorage ikke eksisterer
    enabled: typeof window !== "undefined",
    retry: false, // Vis straks "session udløbet" i stedet for at prøve igen og loade i lang tid ved udløbet session
  });
}
