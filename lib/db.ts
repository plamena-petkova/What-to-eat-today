import { sheets } from "./sheets.server";

export async function appendRow(values: string[]) {
  await sheets.spreadsheets.values.append({
    range: "Users!A:D",
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });
}

export async function getAllUsers(): Promise<string[][]> {
  const res = await sheets.spreadsheets.values.get({
    range: "Users!A:D",
  });
  return res.data.values ?? [];
}