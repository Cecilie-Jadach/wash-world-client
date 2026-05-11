import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  // useMutation is used for actions that change data (like POST requests).
  // It automatically tracks loading and error state, so we don't have to use useState for those.
  // mutateAsync is the function we call to trigger the request — we rename it to signUp.
  // isPending is true while the request is in progress — we rename it to isLoading.
  // error holds any error that was thrown during the request.
  const { mutateAsync: signUp, isPending: isLoading, error } = useMutation({
    // mutationFn is the function that runs when we call signUp()
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/sign-up",
        { method: "POST", body: formData },
      );
      // If the server returns an error, we throw so useMutation catches it and updates the error field
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
    },
  });

  return { signUp, isLoading, error };
};