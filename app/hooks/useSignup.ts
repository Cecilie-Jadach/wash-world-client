import { useState } from "react";

export const useSignUp = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const signUp = async (formData: FormData) => {
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/sign-up",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        return data.error;
      }

      setMessage("Bruger oprettet! Tjek din email.");
    } catch {
      setError("Error connecting to backend");
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, message, isLoading, error };
};
