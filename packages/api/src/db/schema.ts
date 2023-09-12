import { sql, InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-valibot';

// User
export const UserTable = sqliteTable('User', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
});

export type User = InferSelectModel<typeof UserTable>;
export type InsertUser = InferInsertModel<typeof UserTable>;
export const UserSchema = createInsertSchema(UserTable);

// ChatSession
export const ChatSessionTable = sqliteTable('ChatSession', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .references(() => UserTable.id)
    .notNull(), // Foreign key to User
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`), // Timestamp of session creation
  updateAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

export type ChatSession = InferSelectModel<typeof ChatSessionTable>;
export type InsertChatSession = InferInsertModel<typeof ChatSessionTable>;
export const ChatSessionSchema = createInsertSchema(ChatSessionTable);

// Message
export const MessageTable = sqliteTable('Message', {
  id: text('id').primaryKey(),
  sessionId: text('sessionId')
    .references(() => ChatSessionTable.id)
    .notNull(), // Foreign key to ChatSession
  role: text('role').notNull(), // 'user' or 'bot'
  content: text('content').notNull(), // Content of the message
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`), // Timestamp of session creation
});

export type Message = InferSelectModel<typeof MessageTable>;
export type InsertMessage = InferInsertModel<typeof MessageTable>;
export const MessageSchema = createInsertSchema(MessageTable);
