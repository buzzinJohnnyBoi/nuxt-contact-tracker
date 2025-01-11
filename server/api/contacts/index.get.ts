import { ilike, SQL, sql, or } from "drizzle-orm";
import { NewContact, contact } from "~/server/db/schema";
import MySQL from "~/server/db/connection";
import { searchParamsSchema } from "~/server/schemas/searchParams.schema";

export default defineEventHandler(async (event) => {
  const limit = 10;
  const query = getQuery(event);
  const parsedQuery = searchParamsSchema.safeParse(query);
  const data = MySQL.select().from(contact).$dynamic();
  const search = parsedQuery.data?.search;
  if (search) {
    const whereStatements: SQL[] = [];
    whereStatements.push(
      sql`CONCAT(${contact.firstName}, ' ', ${contact.lastName}) LIKE ${
        "%" + search + "%"
      }`
    );
    whereStatements.push(sql`${contact.email} LIKE ${"%" + search + "%"}`);
    if (whereStatements.length > 0) {
      data.where(or(...whereStatements));
    }
  }
  if (parsedQuery.data?.page) {
    data.offset(parsedQuery.data.page);
  }
  return await data.limit(limit);
});
