import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getAllRecipes } from "@/lib/recipesDb.server";

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;
const RANGE = process.env.GOOGLE_SHEETS_RANGE!;

export async function POST(req: NextRequest) {
  try {
    // Parse JSON safely
    let newRecipe;
    try {
      newRecipe = await req.json();
    } catch {
      return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
    }

    if (!newRecipe || !newRecipe.name) {
      return NextResponse.json({ message: "Recipe name is required" }, { status: 400 });
    }

    const ingredientsPreview = Array.isArray(newRecipe.ingredients_preview)
      ? newRecipe.ingredients_preview.join(", ")
      : "";

    // Check duplicates
    const existingRecipes = await getAllRecipes();
    const duplicate = existingRecipes.find(
      r => r.name.toLowerCase() === newRecipe.name.toLowerCase()
    );
    if (duplicate) {
      return NextResponse.json({ message: "Recipe with this name already exists" }, { status: 409 });
    }

    // Google Sheets auth
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "{}"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // Append row: fill all 11 columns, even empty ones
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: RANGE,
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          newRecipe.id || "",
          newRecipe.name || "",
          newRecipe.region || "",
          ingredientsPreview || "",
          newRecipe.full_ingredients || "",
          newRecipe.instructions || "",
          newRecipe.image_url || "",
          Array.isArray(newRecipe.tags) ? newRecipe.tags.join(",") : "",
          newRecipe.created_at || new Date().toISOString(),
          newRecipe.is_full ? "TRUE" : "FALSE",
          newRecipe.user_id || "" // always include user_id
        ]]
      }
    });

    return NextResponse.json({ message: "Recipe added successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("Error adding recipe:", err);
    return NextResponse.json({ message: err?.message || "Internal Server Error" }, { status: 500 });
  }
}

// Optional GET endpoint for testing
export async function GET() {
  try {
    const recipes = await getAllRecipes();
    return NextResponse.json({ recipes });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || "Failed to fetch recipes" }, { status: 500 });
  }
}