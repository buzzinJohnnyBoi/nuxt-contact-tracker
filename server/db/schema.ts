import { desc } from "drizzle-orm";
import {
  mysqlTable,
  text,
  int,
  varchar,
  date,
  timestamp,
} from "drizzle-orm/mysql-core";

export const occupations = mysqlTable("occupations", {
  id: int().primaryKey().autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
});

export const contact = mysqlTable("contacts", {
  id: int().primaryKey().autoincrement().notNull(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  birthDate: varchar("birth_date", { length: 10 }),
  email: varchar({ length: 255 }),
  phone: varchar({ length: 255 }),
  address: varchar({ length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const contactOccupations = mysqlTable("contact-occupations", {
  id: int().primaryKey(),
  contactId: int("contact_id")
    .references(() => contact.id)
    .notNull(),
  occupationId: int("occupation_id")
    .references(() => occupations.id)
    .notNull(),
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
