import { sheets } from "./sheets.server";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!;

export async function appendRow(values: string[]) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "USERS!A:D",
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });
}

export async function getAllUsers(): Promise<string[][]> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "USERS!A:D",
  });
  return res.data.values ?? [];
}
