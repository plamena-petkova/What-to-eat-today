import { Recipe } from "@/app/types/interfaces";
import { create } from "zustand";


interface RecipesState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
  fetchRecipes: () => Promise<void>;
  fetchRecipeById: (id: string) => Promise<void>;
}

export const useRecipesStore = create<RecipesState>((set) => ({
  recipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,

  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/recipes');
      if (!res.ok) throw new Error('Failed to fetch recipes');
      const data: Recipe[] = await res.json();
      set({ recipes: data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'Unknown error', loading: false });
      }
    }
  },

  fetchRecipeById: async (id: string) => {
    set({ loading: true, error: null, selectedRecipe: null });
    try {
      const res = await fetch(`/api/recipes/${id}`);
      if (!res.ok) throw new Error('Failed to fetch recipe');
      const data: Recipe = await res.json();
      set({ selectedRecipe: data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false, selectedRecipe: null });
      } else {
        set({ error: 'Unknown error', loading: false, selectedRecipe: null });
      }
    }
  },
}));
