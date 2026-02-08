import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import localRecipes from '../../../data/recipes.json';
import { Recipe } from '@/app/types/interfaces';

/**
 * GET /api/recipes/[id]
 * Local-first, fallback to Supabase
 */
export async function GET(_request: Request, context: unknown) {
  // Cast context safely to access params
  const id = (context as { params: { id: string } }).params.id;

  // 1️⃣ Try local JSON first
  let recipe: Recipe | null = localRecipes.find(
    (r: Recipe) => String(r.id) === String(id)
  ) || null;

  // 2️⃣ If not found locally, try Supabase
  if (!recipe && supabase) {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      recipe = data;
    }
  }

  // 3️⃣ If still not found, return 404
  if (!recipe) {
    return NextResponse.json(
      { error: 'Recipe not found' },
      { status: 404 }
    );
  }

  // 4️⃣ Return the found recipe
  return NextResponse.json(recipe);
}
