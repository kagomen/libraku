import { drizzle } from 'drizzle-orm/d1'
import { Hono } from 'hono'
import { luciaMiddleware } from '../middleware/lucia'
import { books, favorites } from '../db/tableSchema'
import { sessionMiddleware } from '../middleware/auth'
import { ulid } from 'ulidx'
import { and, desc, eq, inArray, count } from 'drizzle-orm'

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
		const favoriteBooks = await db
			.select()
			.from(books)
			.where(
				inArray(
					books.isbn,
					userFavorites.map((fav) => fav.isbn),
				),
			)

		// お気に入り情報と書籍情報を結合
		const result = userFavorites.map((favorite) => {
			const bookInfo = favoriteBooks.find((book) => book.isbn === favorite.isbn)
			return {
				...bookInfo,
				isbn: favorite.isbn,
			}
		})

		return c.json(result, 200)
	} catch (e) {
		return c.json({ error: `Error: ${e.message}` }, 500)
	}
})

// お気に入りisbn一覧取得（検索結果用）
router.get('/isbn-list', async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ message: '認証が必要です' }, 200)
	}

	try {
		// ユーザーのお気に入りISBNリストを取得
		let favoriteIsbnList = await db
			.select({ isbn: favorites.isbn })
			.from(favorites)
			.where(eq(favorites.userId, user.id))
			.orderBy(desc(favorites.id))

		favoriteIsbnList = favoriteIsbnList.map((item) => item.isbn)
		return c.json(favoriteIsbnList, 200)
	} catch (e) {
		return c.json({ error: `Error: ${e.message}` }, 500)
	}
})

// お気に入り一覧取得（お気に入りリスト用）
router.get('/:page', async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	const page = c.req.param('page')
	const pageSize = 15
	const offset = (page - 1) * pageSize

	try {
		// 総件数を取得
		const [{ totalCount }] = await db
			.select({ totalCount: count() })
			.from(favorites)
			.where(eq(favorites.userId, user.id))

		const res = await db.select({ count: count() }).from(favorites).where(eq(favorites.userId, user.id))
		console.log(res)

		// ユーザーのお気に入りISBNリストを15件取得
		const userFavorites = await db
			.select({ isbn: favorites.isbn })
			.from(favorites)
			.where(eq(favorites.userId, user.id))
			.orderBy(desc(favorites.id))
			.limit(pageSize)
			.offset(offset)

		// 各ISBNに対して書籍データを取得
		const favoriteBooks = await db
			.select()
			.from(books)
			.where(
				inArray(
					books.isbn,
					userFavorites.map((fav) => fav.isbn),
				),
			)

		// お気に入り情報と書籍情報を結合
		const result = userFavorites.map((favorite) => {
			const bookInfo = favoriteBooks.find((book) => book.isbn === favorite.isbn)
			return {
				...bookInfo,
				isbn: favorite.isbn,
			}
		})

		return c.json({ result, totalCount }, 200)
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
		const response = await fetch(
			`${c.env.API_URL}?format=json&isbnjan=${isbn}&outOfStockFlag=1&applicationId=${c.env.APP_ID}`,
		)
		if (!response.ok) {
			return c.json({ error: '無効なISBNです' }, 400)
		}
	} catch (e) {
		console.error(e.message)
		return c.json({ error: 'ISBN検証中にエラーが発生しました' }, 500)
	}

	// 登録済みか確認
	try {
		const existingFavorite = await db
			.select()
			.from(favorites)
			.where(and(eq(favorites.userId, user.id), eq(favorites.isbn, isbn)))
			.get()
		if (existingFavorite) {
			return c.json({ error: 'すでにお気に入りに登録されています' }, 400)
		}
	} catch (e) {
		console.error(e.message)
		return c.json({ error: 'お気に入り情報を取得中にエラーが発生しました' }, 500)
	}

	// DBに書籍データが登録済みか確認
	const existingBook = await db.select().from(books).where(eq(books.isbn, isbn)).get()

	let book
	if (!existingBook) {
		// ISBNから書籍情報を取得
		try {
			const url = `${c.env.API_URL}?format=json&isbnjan=${isbn}&applicationId=${c.env.APP_ID}`
			const response = await fetch(url)
			const data = await response.json()
			book = data.Items[0].Item
		} catch (e) {
			console.error(e.message)
			return c.json({ error: '書籍データ取得中にエラーが発生しました' }, 500)
		}

		// booksテーブルに書籍情報を追加
		try {
			await db.insert(books).values({
				id: ulid(),
				title: book.title,
				author: book.author,
				publisher: book.publisherName,
				salesDate: book.salesDate,
				price: book.itemPrice,
				imageUrl: book.largeImageUrl,
				isbn,
			})
		} catch (e) {
			console.error(e.message)
			return c.json({ error: '書籍データを保存中にエラーが発生しました' }, 500)
		}
	}

	// favoritesテーブルにお気に入りを追加
	try {
		await db.insert(favorites).values({
			id: ulid(),
			userId: user.id,
			isbn: isbn,
		})
	} catch (e) {
		return c.json({ error: 'お気に入り追加中にエラーが発生しました' }, 500)
	}

	return c.json({ message: 'お気に入りに追加しました' }, 201)
})

// お気に入り全件削除
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
