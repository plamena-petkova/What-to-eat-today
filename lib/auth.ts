import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { appendRow, getAllUsers } from "./db";

export async function signup(
  name: string,
  email: string,
  password: string
) {
  const users = await getAllUsers();
  if (users.find((u) => u[1] === email)) {
    throw new Error("User exists");
  }

  const id = uuid();
  const hash = await bcrypt.hash(password, 10);
  const createdAt = new Date().toISOString();

  await appendRow([id, email, hash, name, createdAt]);

  return {
    id,
    email,
    name,
    createdAt,
  };
}

export async function signin(email: string, password: string) {
  const users = await getAllUsers();
  const user = users.find(u => u[1] === email);
  if (!user) throw new Error("Not found");

  const valid = await bcrypt.compare(password, user[2]);
  if (!valid) throw new Error("Invalid password");

  return { id: user[0], email: user[1] };
}