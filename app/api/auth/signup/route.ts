import type { NextApiRequest, NextApiResponse } from "next";
import { signin, signup } from "../../../../lib/auth"; ;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  try {
    const user = await signin(email, password);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
