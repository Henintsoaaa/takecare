// src/app/actions.js
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  const login = async (email: string, password: string, userType: string) => {
    try {
      const response = await fetch(
        "http://localhost/hacker-back/users/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies (including PHPSESSID)
          body: JSON.stringify({ email, password, userType }),
        }
      );

      if (response.ok) {
        const sessionResponse = await fetch(
          "http://localhost/hacker-back/users",
          {
            method: "GET",
            credentials: "include", // Include cookies in this request as well
          }
        );

        const sessionData = await sessionResponse.json();

        if (sessionData.loggedIn) {
          router.push("/");
        } else {
          throw new Error("Session non valide");
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la connexion");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signup = async (
    username: string,
    email: string,
    password: string,
    userType: string
  ) => {
    try {
      const response = await fetch(
        "http://localhost/hacker-back/users/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, userType }),
        }
      );

      if (response.ok) {
        router.push("/login");
        console.log("User  added successfully, You need to log in now");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { login, signup };
}
