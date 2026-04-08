import { NextResponse } from "next/server";
import { signin } from "../../../../lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await signin(email, password);

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Signin failed" },
      { status: 400 }
    );
  }
}