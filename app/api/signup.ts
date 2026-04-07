import type { NextApiRequest, NextApiResponse } from "next";
import { signup } from "../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  try {
    await signup(email, password);
    res.status(200).json({ message: "User created" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}