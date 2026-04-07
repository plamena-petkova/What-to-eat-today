import { NextResponse } from "next/server";
import { getAllRecipes } from "@/lib/recipesDb.server"; // Sheets helper
import { Recipe } from "@/app/types/interfaces";

/**
 * GET /api/recipes
 * Returns recipe previews from Google Sheets
 */
export async function GET() {
  try {
    const recipes: Recipe[] = await getAllRecipes();

    if (!recipes || recipes.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Only return preview fields (like your previous Supabase query)
    const previewData = recipes.map(r => ({
      id: r.id,
      name: r.name,
      region: r.region,
      ingredients_preview: r.ingredients_preview,
    }));

    return NextResponse.json(previewData);
  } catch (err: any) {
    console.error("Error fetching recipes from Sheets:", err);
    // Optional: fallback to local JSON if needed
    // import localRecipes from "@/data/recipes.json";
    // return NextResponse.json(localRecipes);

    return NextResponse.json([], { status: 500 });
  }
}