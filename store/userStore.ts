import { User } from "@/app/types/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  fetchUser: () => void;
}

// Fix: remove generic from create, let persist infer the type
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      fetchUser: () => {
        const stored = localStorage.getItem("user");
        if (stored) set({ user: JSON.parse(stored) });
      },

      signUp: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Unknown error");
          }

          const user = await res.json();
          set({ user, loading: false });
          localStorage.setItem("user", JSON.stringify(user));
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      signIn: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Unknown error");
          }

          const user = await res.json();
          set({ user, loading: false });
          localStorage.setItem("user", JSON.stringify(user));
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      signOut: () => {
        set({ user: null });
        localStorage.removeItem("user");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);