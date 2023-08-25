import { InferModel } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-valibot';

// User
export const User = sqliteTable('User', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
});

export type User = InferModel<typeof User>;
export const UserSchema = createInsertSchema(User);
