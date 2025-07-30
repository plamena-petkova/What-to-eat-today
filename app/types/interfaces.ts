export interface Recipe {
  id: string; // UUID
  name: string;
  region: string | null;
  ingredients_preview: string[]; // short display list
  full_ingredients: Record<string, string> | null; // { ingredient: quantity }
  instructions: string | null;
  image_url: string | null;
  tags: string[] | null;
  created_at: string; // ISO timestamp
  is_full: boolean;
}