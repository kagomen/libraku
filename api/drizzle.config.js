import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	dialect: 'sqlite', // すべてのコマンドで使用するDB言語を明示的に指定
	schema: './src/db/schema.js', // スキーマファイルのパス
	out: './drizzle', // マイグレーションファイルの出力先
	driver: 'd1-http',
	dbCredentials: {
		wranglerConfigPath: 'wrangler.toml',
		dbName: 'libraku-db',
	},
})
