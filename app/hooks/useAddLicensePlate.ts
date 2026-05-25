import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddLicensePlate() {
  //Giver adgang til React Querys "cache" — det bruges til at opdatere data efter en handling
  const queryClient = useQueryClient();

  //useMutation bruges til at lave ændringer (POST, PATCH, DELETE). 
  //Vi omdøber mutateAsync til addLicensePlate så det er mere sigende at kalde udefra.
  const { mutateAsync: addLicensePlate, isPending, error } = useMutation({
    //Den funktion der rent faktisk kører når man kalder addLicensePlate(...). Den modtager nummerpladen som argument.
    mutationFn: async (license_plate: string) => {
      //Henter brugerens login-token fra browseren. ?? "" betyder "brug en tom streng hvis der ikke er nogen token".
      const token = localStorage.getItem("token") ?? "";
      //Sender nummerpladen til serveren via et POST-kald. JSON.stringify konverterer JavaScript-objektet til tekst som serveren kan læse.
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api-add-license-plate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ license_plate }),
      });
      //Hvis serveren svarer med en fejl, kastes den videre (så error i komponenten bliver udfyldt). Ellers returneres svaret.
      if (!res.ok) throw new Error((await res.json()).error);
      return res.json();
    },
    //Når det lykkes, fortæller vi React Query at dens gemte liste af nummerplader er forældet — så den automatisk henter en frisk kopi.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["license-plates"] });
    },
  });

  //Eksporterer det man har brug for udefra: selve funktionen, om den er i gang, og en eventuel fejl.
  return { addLicensePlate, isPending, error };
}


//React Query cacher data for at undgå unødvendige kald til serveren. 
// Det betyder at når du tilføjer en ny nummerplade, sidder den gamle liste stadig i cachen — React Query ved ikke at noget har ændret sig.
//Uden invalidateQueries ville brugeren altså stadig se den gamle liste, selvom nummerpladen er gemt på serveren. 
// Først ved næste page refresh ville den nye liste dukke op.
//Med invalidateQueries siger du: "den her cache er forældet" — og React Query henter automatisk en ny liste, så UI'et opdaterer sig med det samme.
