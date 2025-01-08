import { NewContact, contact } from "~/server/db/schema";
import MySQL from "~/server/db/connection";
import { contactSchema } from "~/server/schemas/contact.schema";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const newContact = contactSchema.parse(body);
    const [contactId] = await MySQL.insert(contact).values(newContact);

    return {
      message: "Contact created successfully",
      success: true,
      data: body,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        success: false,
      };
    }
  }

  return {
    message: "Unknown error",
    success: false,
  };
});
