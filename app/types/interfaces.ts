export interface Recipe {
  id: string; 
  name: string;
  region: string;
  ingredients_preview: string[]; 
  full_ingredients: Record<string, string> | null; 
  instructions: string | null;
  image_url: string | null;
  tags: string[] | null;
  created_at: string; 
  is_full: boolean;
}