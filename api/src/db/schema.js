import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
})

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull(),
})

export const cardNumbers = sqliteTable('cardNumbers', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	cardNumber: text('cardNumber').notNull(),
})

export const favorites = sqliteTable('favorites', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	isbn: text('isbn').notNull(),
	createdAt: integer('created_at').notNull(),
})
