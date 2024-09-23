import { getLucia } from '../db/lucia'

export async function cronJob(env) {
	console.log('Cron job started!')
	try {
		const lucia = getLucia(env)
		await lucia.deleteExpiredSessions()
		console.log('Cron job done!')
	} catch (error) {
		console.error('Error in cron job:', error)
	}
}
