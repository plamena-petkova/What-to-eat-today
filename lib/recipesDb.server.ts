import { sheets } from "./sheets.server";
import { Recipe } from "@/app/types/interfaces";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!;
const RANGE = process.env.GOOGLE_SHEETS_RANGE!;

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = res.data.values || [];
    const dataRows = rows.slice(1);

    return dataRows.map((row) => ({
      id: row[0] || "",
      name: row[1] || "",
      region: row[2] || "",
      ingredients_preview: row[3] || "",
      full_ingredients: row[4] || "",
      instructions: row[5] || "",
      image_url: row[6] || "",
      tags: row[7]?.split(",") || [], // if tags stored as comma-separated
      created_at: row[8] || "",
      is_full: row[9] || "",
      user_id: row[10] || "", // assuming user_id is in the 11th column
    }));
  } catch (err) {
    console.error("Error fetching recipes from Sheets:", err);
    return [];
  }
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = res.data.values || [];

    const row = rows.find((r) => r[0] === id);

    if (!row) return null;

    return {
      id: row[0] || "",
      name: row[1] || "",
      region: row[2] || "",
      ingredients_preview: row[3] || "",
      full_ingredients: row[4] || "",
      instructions: row[5] || "",
      image_url: row[6] || "",
      tags: row[7]?.split(",") || [],
      created_at: row[8] || "",
      is_full: row[9] || "",
      user_id: row[10] || "", // user_id is actually at index 9
    };
  } catch (err) {
    console.error("Error fetching recipe by ID from Sheets:", err);
    return null;
  }
}
