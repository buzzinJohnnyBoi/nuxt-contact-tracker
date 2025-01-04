import { NewContact, contact } from "~/server/db/schema";
import MySQL from "~/server/db/connection";
import z from "zod";

export default defineEventHandler(async (event) => {
  const body: NewContact = await readBody(event);
  console.log(body);
  body.birthDate = new Date(body.birthDate || "");
  const [contactId] = await MySQL.insert(contact).values(body);

  return {
    message: "Contact created successfully",
    data: body,
  };
});
