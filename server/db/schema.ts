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
  id: int().primaryKey().autoincrement().notNull(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  birthDate: datetime("birth_date"),
  email: varchar({ length: 255 }),
  phone: varchar({ length: 255 }),
  address: varchar({ length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const contactNotes = mysqlTable("contact-notes", {
  id: int().primaryKey().autoincrement().notNull(),
  contactId: int("contact_id")
    .references(() => contact.id)
    .notNull(),
  note: text().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Contact = typeof contact.$inferSelect;
export type NewContact = typeof contact.$inferInsert;
