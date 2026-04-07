import { NextResponse } from "next/server";
import { getAllRecipes } from "@/lib/recipesDb.server";
import { Recipe } from "@/app/types/interfaces";

interface Props {
  params: { id: string };
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {

    const { id } = await context.params;
    const recipes: Recipe[] = await getAllRecipes();

    const recipe = recipes.find(r => r.id === id);


    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (err: any) {
    console.error("Error fetching recipe by ID:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}