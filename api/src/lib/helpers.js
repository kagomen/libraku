import { TimeSpan, createDate } from 'oslo'
import { generateRandomString, alphabet } from 'oslo/crypto'
import { emailVerificationCodes } from '../db/schema'
import { eq } from 'drizzle-orm'
import { isWithinExpirationDate } from 'oslo'
import { Resend } from 'resend'
import { ulid } from 'ulidx'

// 検証コードを生成
export async function generateEmailVerificationCode(userId, email, db) {
	// 既存のコードを削除
	await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.userId, userId))

	// 新しいコードを生成
	const code = generateRandomString(8, alphabet('0-9'))

	await db.insert(emailVerificationCodes).values({
		id: ulid(),
		userId,
		email,
		code,
		expiresAt: createDate(new TimeSpan(30, 'm')), // 30 minutes
	})

	return code
}

// 検証コードを送信
export async function sendVerificationCode(email, verificationCode, c) {
	const resend = new Resend(c.env.RESEND_API_KEY)

	const res = await resend.emails.send({
		from: `リブラク <${c.env.MY_EMAIL_ADDRESS}>`,
		to: email,
		subject: `検証コード`,
		html: `
        <p><strong>検証コード:</strong> ${verificationCode}</p>
        <p>ブラウザに戻り、上記の検証用コードを入力して、お手続きを完了させてください。</p>
      `,
	})

	return c.json(res)
}

// 検証コードを検証
export async function verifyVerificationCode(user, code, db) {
	// DBから検証コードを取得

	console.log('start!')
	const dbCode = await db.select().from(emailVerificationCodes).where(eq(emailVerificationCodes.userId, user.id)).get()

	console.log('dbCode', dbCode)
	console.log('finish')

	// コードの検証
	if (!dbCode || dbCode.code !== code) return false
	if (!isWithinExpirationDate(dbCode.expiresAt)) return false
	// if (dbCode.email !== email) return false

	const newEmail = dbCode.email ?? null

	// 使用済みコードを削除
	await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.userId, user.id))

	return { validCode: true, newEmail }
}
