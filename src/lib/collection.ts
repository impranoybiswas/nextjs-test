import { getCollection } from "./mongodb";
import { Document } from "mongodb";

// Type safe collection এর জন্য generic ব্যবহার করো
export interface User extends Document {
  name: string;
  email: string;
  createdAt: Date;
}

export async function getUsersCollection() {
  return getCollection<User>("users");
}
