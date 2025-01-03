import {
  mysqlTable,
  text,
  int,
  varchar,
  mysqlEnum,
  datetime,
  timestamp,
  decimal,
} from "drizzle-orm/mysql-core";

export const contact = mysqlTable("contacts", {
  id: int("id").primaryKey().autoincrement().notNull(),
  first_name: varchar("first_name", { length: 255 }),
  last_name: varchar("last_name", { length: 255 }),
  birth_date: datetime("birth_date"),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  address: varchar("address", { length: 255 }),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const contactNotes = mysqlTable("contact-notes", {
  id: int("id").primaryKey().autoincrement().notNull(),
  contact_id: int("contact_id")
    .references(() => contact.id)
    .notNull(),
  note: text("note").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export type Contact = typeof contact.$inferSelect;
export type NewContact = typeof contact.$inferInsert;
