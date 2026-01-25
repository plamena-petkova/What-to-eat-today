import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import localRecipes from '../../../data/recipes.json';
import { Recipe } from '@/app/types/interfaces';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  // 1️⃣ Try Supabase
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  // 2️⃣ Supabase success
  if (!error && data) {
    return NextResponse.json(data);
  }

  // 3️⃣ Fallback to local JSON
  const recipe = localRecipes.find(
    (r:Recipe) => String(r.id) === String(id)
  );

  if (!recipe) {
    return NextResponse.json(
      { error: 'Recipe not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(recipe);
}
