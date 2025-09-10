import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  // 🔄 subscribe to Supabase auth state changes
  supabase.auth.onAuthStateChange((_event, session) => {
    set({ user: session?.user ?? null });
  });

  return {
    user: null,
    loading: false,
    error: null,

    fetchUser: async () => {
      set({ loading: true, error: null });
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) throw error;
        set({ user, loading: false });
      } catch (err: unknown) {
        if (err instanceof Error) {
          set({ error: err.message, loading: false, user: null });
        } else {
          set({ error: "Unknown error", loading: false, user: null });
        }
      }
    },

    signUp: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        set({ user: data.user, loading: false });
      } catch (err: unknown) {
        if (err instanceof Error) {
          set({ error: err.message, loading: false });
        } else {
          set({ error: "Unknown error", loading: false });
        }
      }
    },

    signIn: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        set({ user: data.user, loading: false });
      } catch (err: unknown) {
        if (err instanceof Error) {
          set({ error: err.message, loading: false });
        } else {
          set({ error: "Unknown error", loading: false });
        }
      }
    },

    signOut: async () => {
      set({ loading: true, error: null });
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        set({ user: null, loading: false });
      } catch (err: unknown) {
        if (err instanceof Error) {
          set({ error: err.message, loading: false });
        } else {
          set({ error: "Unknown error", loading: false });
        }
      }
    },
  };
});
