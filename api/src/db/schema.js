import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	cardNumber: text('card_number'),
	emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
})

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull(),
})

export const favorites = sqliteTable('favorites', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	isbn: text('isbn')
		.notNull()
		.references(() => books.isbn),
})

export const books = sqliteTable('books', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	author: text('author'),
	imageUrl: text('image_url'),
	isbn: text('isbn').notNull().unique(),
})

export const emailVerificationCodes = sqliteTable('email_verification_codes', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	email: text('email').notNull(),
	code: text('code').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})
