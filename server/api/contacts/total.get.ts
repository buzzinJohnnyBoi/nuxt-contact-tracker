import { NewContact, contact } from "~/server/db/schema";
import MySQL from "~/server/db/connection";

export default defineEventHandler(async (event) => {
  const totalNumberContacts = await MySQL.$count(contact);
  return totalNumberContacts;
});
