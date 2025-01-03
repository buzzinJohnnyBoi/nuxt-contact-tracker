import MySQL from "../db/connection";
import { contact } from "../db/schema";
import { Buffer } from "node:buffer";

export default async function getContacts() {
  return await MySQL.select().from(contact);
}
