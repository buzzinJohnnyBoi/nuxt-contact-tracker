import { NewContact, contact } from "~/server/db/schema";
import MySQL from "~/server/db/connection";

export default defineEventHandler(async (event) => {
  const data = await MySQL.select().from(contact);
  return data;
});
