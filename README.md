## 概要

リブラクは、図書館での**リクエストカード作成をスムーズに行うためのアプリ**です。  
リクエストカードは、**市内の図書館で取り扱っていない書籍の購入や取り寄せを希望する**場合、図書館に提出する書類です。  
技術書は高価で手が届かないため、自分はこの図書館のリクエスト制度を普段から利用しています。  
そんな中でリクエストカード記入時に煩わしさを感じることがあったため、このようなアプリを作成しました。  

## URL

https://libraku.pages.dev

<img width="1200" alt="mockup1" src="https://github.com/user-attachments/assets/1ab1c72e-c6c6-4a42-a737-f158c6c76ea7">
<img width="1200" alt="mockup2" src="https://github.com/user-attachments/assets/31bd3982-dbd8-4fb0-b815-918c4c6bebca">
<img width="1200" alt="mockup3" src="https://github.com/user-attachments/assets/5665203c-cbba-4a15-bd58-fa5cf18e920a">

## 機能一覧

- ユーザー登録
- ユーザー設定
  - メールアドレスの変更
  - パスワードの変更
- 利用者番号の登録・変更
- 書籍の検索
- お気に入り追加・削除
- PWA
- お問い合わせフォーム

## 使用技術

<img width="1200" alt="tech" src="https://github.com/user-attachments/assets/4e0f60d7-8628-4130-8d3b-eed70c01bd7b">

| -                  | 詳細               | 使用技術                    |
| ------------------ | ------------------ | --------------------------- |
| **フロントエンド** | **ライブラリ**     | React                       |
|                    | **デプロイ先**     | Cloudflare Pages            |
|                    | **UI関連**         | TailwindCSS, shadcn/ui      |
|                    | **アニメーション** | Framer Motion               |
|                    | **データフェッチ** | TanStack Query              |
|                    | **ルーティング**   | React Router                |
|                    | **フォーム**       | React Hook Form             |
|                    | **ビルドツール**   | Vite                        |
|                    | **リンター**       | ESLint                      |
|                    | **フォーマッター** | Prettier                    |
| **バックエンド**   | **ライブラリ**     | Hono                        |
|                    | **デプロイ先**     | Cloudflare Workers          |
|                    | **認証**           | Lucia, Cloudflare Turnstile |
|                    | **メール**         | Resend                      |
|                    | **データベース**   | Cloudflare D1               |
|                    | **ORM**            | Drizzle ORM                 |
| **共通**           | **バリデーション** | Zod                         |
