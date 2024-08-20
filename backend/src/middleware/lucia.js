const { getLucia } = require('../db/lucia')

export function luciaMiddleware(c, next) {
	c.set('lucia', getLucia(c))
	return next()
}
