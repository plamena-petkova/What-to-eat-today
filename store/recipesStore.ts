import { Recipe } from "@/app/types/interfaces";
import { create } from "zustand";

interface RecipesState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
  fetchRecipes: () => Promise<void>;
  fetchRecipeById: (id: string) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  editRecipe: (updatedRecipe: Recipe) => Promise<void>;
}

export const useRecipesStore = create<RecipesState>((set, get) => ({
  recipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,

  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/recipes");
      if (!res.ok) throw new Error("Failed to fetch recipes");
      const data: Recipe[] = await res.json();
      set({ recipes: data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: "Unknown error", loading: false });
      }
    }
  },

  fetchRecipeById: async (id: string) => {
    set({ loading: true, error: null, selectedRecipe: null });
    try {
      const res = await fetch(`/api/recipes/${id}`);
      if (!res.ok) throw new Error("Failed to fetch recipe");
      const data: Recipe = await res.json();
      set({ selectedRecipe: data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false, selectedRecipe: null });
      } else {
        set({ error: "Unknown error", loading: false, selectedRecipe: null });
      }
    }
  },

  deleteRecipe: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/recipes/delete-recipe", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error("Failed to delete recipe");

      // Remove recipe from store
      set({
        recipes: get().recipes.filter((r) => r.id !== id),
        loading: false,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: "Unknown error", loading: false });
      }
      throw error; // re-throw so toast.promise can catch it
    }
  },

  editRecipe: async (updatedRecipe: Recipe) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/recipes/edit-recipe", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecipe),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Failed to update recipe");

      // ✅ Update the store with the edited recipe
      const currentRecipes = get().recipes;
      set({
        recipes: currentRecipes.map((r) =>
          r.id === updatedRecipe.id ? updatedRecipe : r,
        ),
        loading: false,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: "Unknown error", loading: false });
      }
      throw error; // re-throw for toast.promise
    }
  },
}));
