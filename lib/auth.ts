import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { appendRow, getAllUsers } from "./db";

export async function signup(email: string, password: string) {
  const users = await getAllUsers();
  if (users.find(u => u[1] === email)) throw new Error("User exists");

  const hash = await bcrypt.hash(password, 10);
  await appendRow([uuid(), email, hash, new Date().toISOString()]);
}

export async function signin(email: string, password: string) {
  const users = await getAllUsers();
  const user = users.find(u => u[1] === email);
  if (!user) throw new Error("Not found");

  const valid = await bcrypt.compare(password, user[2]);
  if (!valid) throw new Error("Invalid password");

  return { id: user[0], email: user[1] };
}