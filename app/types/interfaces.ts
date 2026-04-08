export interface Recipe {
  id: string; 
  name: string;
  region: string;
  ingredients_preview: string[]; 
  full_ingredients: string | null; 
  instructions: string | null;
  image_url: string | null;
  tags: string[] | null;
  created_at: string; 
  is_full: boolean;
}

interface AuthState {
  user: { id: string; email: string } | null; // no Supabase User
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void; // just clear local user
  fetchUser: () => void; // optional, for session restore if you persist in localStorage
}

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
  recipes: Recipe[] | null; 
}