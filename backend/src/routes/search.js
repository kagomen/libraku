import { Hono } from 'hono'

const router = new Hono()

router.get('/:keyword/:page', async (c) => {
	try {
		const keyword = c.req.param('keyword')
		const page = c.req.param('page')
		const url = `${c.env.API_URL}?format=json&keyword=${keyword}&booksGenreId=000&outOfStockFlag=1&page=${page}&applicationId=${c.env.APP_ID}`
		const response = await fetch(url)
		const data = await response.json()

		const set = new Set()
		const filteredBooks = data.Items.filter((item) => {
			// trueの場合のみ、filteredBooksにitemが挿入される
			const isbn = item.Item.isbn
			if (isbn && !set.has(isbn)) {
				// isbnが存在かつisbnが重複しない場合にtrueを返す
				set.add(isbn)
				return true
			}
			return false
		})

		const filteredData = {
			...data,
			Items: filteredBooks,
		}

		return c.json(filteredData)
	} catch (e) {
		return c.json({ error: `Error: ${e.message}` }, 500)
	}
})

router.get('/:isbn', async (c) => {
	try {
		const isbn = c.req.param('isbn')
		const url = `${c.env.API_URL}?format=json&isbnjan=${isbn}&outOfStockFlag=1&applicationId=${c.env.APP_ID}`
		const response = await fetch(url)
		const data = await response.json()

		return c.json(data.Items[0].Item)
	} catch (e) {
		return c.json({ error: `Error: ${e.message}` }, 500)
	}
})

export default router
