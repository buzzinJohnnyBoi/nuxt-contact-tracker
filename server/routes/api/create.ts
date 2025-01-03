import { NewContact, contact } from "~/server/db/schema";
import MySQL from "~/server/db/connection";

export default defineEventHandler(async (event) => {
  const body: NewContact = await readBody(event);
  console.log(body);
  const [contactId] = await MySQL.insert(contact).values(body);

  return {
    message: "Contact created successfully",
    data: body,
  };
});
