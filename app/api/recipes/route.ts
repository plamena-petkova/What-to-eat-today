import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import localRecipes from '../../data/recipes.json';

export async function GET() {
  const { data, error } = await supabase
    .from('recipes')
    .select('id, name, region, ingredients_preview')
    .order('created_at', { ascending: false });

  // ✅ Supabase success
  if (!error && data && data.length > 0) {
    return NextResponse.json(data);
  }

  // 🔁 Fallback to local JSON
  return NextResponse.json(localRecipes);
}

