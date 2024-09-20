## 📚 概要

リブラクは、図書館での**リクエストカード作成をスムーズに行うためのアプリ**です。  
リクエストカードは、**市内の図書館で取り扱っていない書籍の購入・市外からの取り寄せを希望する**場合、図書館に提出する書類です。  
リクエストしたい書籍をお気に入り登録しておくことで、リクエストカードの記入に必要な情報を一目で確認することができます。

&nbsp;

## 🌐 URL

https://libraku.pages.dev

&nbsp;

## 📱 モックアップ

<img width="1200" alt="mockup1" src="https://github.com/user-attachments/assets/1ab1c72e-c6c6-4a42-a737-f158c6c76ea7">  
<img width="1200" alt="mockup2" src="https://github.com/user-attachments/assets/31bd3982-dbd8-4fb0-b815-918c4c6bebca">  
<img width="1200" alt="mockup3" src="https://github.com/user-attachments/assets/5665203c-cbba-4a15-bd58-fa5cf18e920a">

&nbsp;

## ✨ 機能一覧

- 書籍の検索
- お気に入り追加・削除
- ユーザー登録
- ユーザー設定
  - メールアドレスの変更
  - パスワードの変更
  - 利用者番号の登録・変更
- お問い合わせフォーム
- PWA

&nbsp;

## 💻 使用技術

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

&nbsp;

## ⏱️ 開発期間

2024年5月〜9月のうち、約3ヶ月強

&nbsp;

## 🚀 v2.1.0で予定している実装内容

- Googleログイン
- パスワードを忘れたユーザー用の案内・メール通知
- sessionsテーブルの不要なデータを削除するcron-job
- お気に入りの取得件数の分割
- PC用デザイン

&nbsp;

## 💭 開発背景

技術書は高価でなかなか手が届かないため、図書館のリクエスト制度を普段から利用していました。  
そんな中でリクエストカードの記入時に煩わしさを感じることが多々あったため、当アプリを作成することにしました。

&nbsp;

## 🎯 狙い

- Reactでの基本的なアプリの作り方を学ぶ
- フロントエンドのメイン技術（ルーティングやデータフェッチ）について学ぶ
- バックエンドの技術（APIやデータベース、認証）に触れてみる
- フロントエンドとバックエンドの連携について学ぶ

&nbsp;

## 🐈‍⬛ 感想

- 初めて使用する技術は当リポジトリで実装する前に、練習用リポジトリでごくシンプルな機能の実装をして試しました。この方法はとても自分に合っており、今後の開発でも取り入れようと思いました。
  <details>
    <summary>練習用リポジトリ一覧</summary>
    - https://github.com/kagomen/oauth-jwt-practice  
    - https://github.com/kagomen/jwt-practice  
    - https://github.com/kagomen/react-turnstile-practice  
    - https://github.com/kagomen/react-vite-pages-functions-practice  
    - https://github.com/kagomen/cloudflare-workers-practice  
    - https://github.com/kagomen/react-router-v6-practice  
    - https://github.com/kagomen/react-form-practice  
    - https://github.com/kagomen/react-query-practice  
    - https://github.com/kagomen/proxy-server-practice  
  </details>
- ディレクトリ構成に非常に悩まされました。
- CorsやCookieの設定に非常に手間取りました。
- 上記2点はNext.jsなどのフルスタックフレームワークを使用することで手間が解消されると知りました。次に個人開発をする際は必ずフレームワークを使おうと思いました。
- また、動くものは作れましたが、一気に新しい技術を学びすぎてしまい、各ライブラリの理解が浅いものとなってしまいました。次回の個人開発の際は復習として、できるだけ同じ技術スタックで作成しようと思います。
