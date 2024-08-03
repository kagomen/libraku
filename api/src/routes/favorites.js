import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { luciaMiddleware } from '../middleware/lucia'
import { favorites } from '../db/schema'
import { sessionMiddleware } from '../middleware/auth'
import { v4 as uuidv4 } from 'uuid'
import { and, eq } from 'drizzle-orm'

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

	const userFavorites = await db
		.select({
			isbn: favorites.isbn,
			createdAt: favorites.createdAt,
		})
		.from(favorites)
		.where(eq(favorites.userId, user.id))

	return c.json(userFavorites, 200)
})

// お気に入り追加
router.post('/:isbn', async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	const isbn = c.req.param('isbn')

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
		id: uuidv4(),
		userId: user.id,
		isbn: isbn,
		createdAt: Date.now(),
	})

	return c.json({ message: 'お気に入りに追加しました' }, 201)
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
		const result = await db
			.delete(favorites)
			.where(and(eq(favorites.userId, user.id), eq(favorites.isbn, isbn)))
			.run()
		if (result.changes == 0) {
			return c.json({ message: '削除するお気に入りが見つかりませんでした' }, 404)
		}
		return c.json({ message: 'お気に入りを削除しました' }, 200)
	} catch (e) {
		console.error(e)
		return c.json({ error: 'お気に入りの削除中にエラーが発生しました' }, 500)
	}
})

export default router
