import { create } from "zustand";

interface AuthState {
  user: { id: string; email: string } | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  fetchUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: () => {
    const stored = localStorage.getItem("user");
    if (stored) set({ user: JSON.parse(stored) });
  },

  signUp: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Unknown error");
      }

      const user = await res.json(); // { id, email }
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

      const user = await res.json(); // { id, email }
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
}));