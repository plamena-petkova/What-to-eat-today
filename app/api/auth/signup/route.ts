
import { NextResponse } from "next/server";
import { signup } from "../../../../lib/auth"; // remove extra semicolon

export async function POST(
  req: Request
) {

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
  }

  try {
    const user = await signup(name, email, password); 
    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Signup failed" }, { status: 400 });
  }
}
