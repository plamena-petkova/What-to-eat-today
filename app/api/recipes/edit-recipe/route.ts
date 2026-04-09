import { google } from "googleapis";
import { Recipe } from "@/app/types/interfaces";

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;
const RANGE = process.env.GOOGLE_SHEETS_RANGE!;

export async function PUT(req: Request) {
  try {
    const updatedRecipe: Recipe = await req.json();
    if (!updatedRecipe.id) {
      return new Response(JSON.stringify({ message: "Recipe ID is required" }), { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "{}"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // Get all rows
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });
    const values = getRows.data.values || [];

    // Find the row index
    const rowIndex = values.findIndex(row => row[0] === updatedRecipe.id);
    if (rowIndex === -1) return new Response(JSON.stringify({ message: "Recipe not found" }), { status: 404 });

    // Prepare values for update (11 columns same as add-recipe)
    const ingredientsPreview = Array.isArray(updatedRecipe.ingredients_preview)
      ? updatedRecipe.ingredients_preview.join(", ")
      : "";

    const rowValues = [
      updatedRecipe.id || "",
      updatedRecipe.name || "",
      updatedRecipe.region || "",
      ingredientsPreview,
      updatedRecipe.full_ingredients || "",
      updatedRecipe.instructions || "",
      updatedRecipe.image_url || "",
      Array.isArray(updatedRecipe.tags) ? updatedRecipe.tags.join(",") : "",
      updatedRecipe.created_at || new Date().toISOString(),
      updatedRecipe.is_full ? "TRUE" : "FALSE",
      updatedRecipe.user_id || "",
    ];

    // Update the row in Google Sheets
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${RANGE.split("!")[0]}!A${rowIndex + 1}:K${rowIndex + 1}`, // rowIndex is 0-based
      valueInputOption: "RAW",
      requestBody: { values: [rowValues] },
    });

    return new Response(JSON.stringify({ message: "Recipe updated" }), { status: 200 });
  } catch (err: any) {
    console.error("Edit recipe error:", err);
    return new Response(JSON.stringify({ message: err.message || "Internal Server Error" }), { status: 500 });
  }
}