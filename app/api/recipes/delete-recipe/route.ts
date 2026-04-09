import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;
const RANGE = process.env.GOOGLE_SHEETS_RANGE!;

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return new Response(JSON.stringify({ message: "Recipe ID is required" }), { status: 400 });

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

    // Find row index
    const rowIndex = values.findIndex(row => row[0] === id);
    if (rowIndex === -1) return new Response(JSON.stringify({ message: "Recipe not found" }), { status: 404 });

    // Delete row
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: { sheetId: 0, dimension: "ROWS", startIndex: rowIndex, endIndex: rowIndex + 1 },
            },
          },
        ],
      },
    });

    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
  } catch (err: any) {
    console.error("Delete recipe error:", err);
    return new Response(JSON.stringify({ message: err.message || "Internal Server Error" }), { status: 500 });
  }
}