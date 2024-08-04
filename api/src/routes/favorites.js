import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { luciaMiddleware } from '../middleware/lucia'
import { favorites } from '../db/schema'
import { sessionMiddleware } from '../middleware/auth'
import { ulid } from 'ulidx'
import { and, desc, eq } from 'drizzle-orm'
import axios from 'axios'

const router = new Hono()

router.use('*', luciaMiddleware)

router.use('*', sessionMiddleware)

// お気に入り一覧取得
router.get('/', async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	try {
		// ユーザーのお気に入りISBNリストを取得
		const userFavorites = await db
			.select({ isbn: favorites.isbn })
			.from(favorites)
			.where(eq(favorites.userId, user.id))
			.orderBy(desc(favorites.id))

		// 各ISBNに対して書籍データを取得
		const bookPromises = userFavorites.map(async (favorite) => {
			try {
				const response = await axios.get(
					`${c.env.API_URL}?format=json&isbnjan=${favorite.isbn}&applicationId=${c.env.APP_ID}`,
				)
				return response
			} catch (e) {
				return null
			}
		})

		// すべての書籍データを並行して取得し、nullでないものだけを保持
		const books = (await Promise.all(bookPromises)).filter((book) => book !== null)

		return c.json(books, 200)
	} catch (e) {
		return c.json({ error: `Error: ${e.message}` }, 500)
	}
})

// お気に入り追加
router.post('/:isbn', async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	const isbn = c.req.param('isbn')

	// ISBNの有効性を確認
	try {
		await axios.get(`${c.env.API_URL}?format=json&isbnjan=${isbn}&applicationId=${c.env.APP_ID}`)
	} catch (error) {
		return c.json({ error: '無効なISBNです' }, 500)
	}

	// 登録済みか確認
	const existingFavorite = await db
		.select()
		.from(favorites)
		.where(and(eq(favorites.userId, user.id), eq(favorites.isbn, isbn)))
		.get()

	if (existingFavorite) {
		return c.json({ error: 'すでにお気に入りに登録されています' }, 400)
	}

	// お気に入り追加
	await db.insert(favorites).values({
		id: ulid(),
		userId: user.id,
		isbn: isbn,
	})

	return c.json({ message: 'お気に入りに追加しました' }, 201)
})

router.delete('/all', async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	try {
		// ユーザーのすべてのお気に入りを削除
		const result = await db.delete(favorites).where(eq(favorites.userId, user.id))

		if (result.meta.changes == 0) {
			return c.json({ message: '削除するお気に入りが見つかりませんでした' }, 404)
		}

		return c.json({ message: `${result.meta.changes}件のお気に入りをすべて削除しました` }, 200)
	} catch (e) {
		console.error(e)
		return c.json({ error: 'お気に入りの削除中にエラーが発生しました' }, 500)
	}
})

// お気に入り削除
router.delete('/:isbn', async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	const isbn = c.req.param('isbn')

	try {
		// お気に入りを削除
		const result = await db.delete(favorites).where(and(eq(favorites.userId, user.id), eq(favorites.isbn, isbn)))

		if (result.meta.changes == 0) {
			return c.json({ message: '削除するお気に入りが見つかりませんでした' }, 404)
		}
		return c.json({ message: 'お気に入りを削除しました' }, 200)
	} catch (e) {
		console.error(e)
		return c.json({ error: 'お気に入りの削除中にエラーが発生しました' }, 500)
	}
})

export default router
