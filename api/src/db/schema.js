import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	cardNumber: text('card_number'),
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
	isbn: text('isbn')
		.notNull()
		.references(() => books.isbn),
})

export const books = sqliteTable('books', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	author: text('author'),
	publisher: text('publisher'),
	salesDate: text('sales_date'),
	price: text('price'),
	imageUrl: text('image_url'),
	isbn: text('isbn').notNull().unique(),
})
