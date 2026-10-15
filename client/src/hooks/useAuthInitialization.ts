import { useEffect, useState } from "react";
import axios from "axios";

import { api } from "../services/api";
import { useAuthStore, type User } from "../store/authStore";

export function useAuthInitialization() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function initializeAuth() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsInitialized(true);
        return;
      }

      try {
        const response = await api.get<{ user: User }>("/auth/me");

        if (!cancelled) {
          setAuth(response.data.user, token);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          if (
            axios.isAxiosError(error) &&
            error.response?.status === 401
          ) {
            logout();
          } else {
            // Keep the token so a temporary network/server error
            // does not unnecessarily log the user out.
            console.error("Failed to restore authentication", error);
          }
        }
      } finally {
        if (!cancelled) {
          setIsInitialized(true);
        }
      }
    }

    void initializeAuth();

    return () => {
      cancelled = true;
    };
  }, [setAuth, logout]);

  return { isInitialized };
}