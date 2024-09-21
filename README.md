## 📚 概要

リブラクは、図書館での**リクエストカード作成をスムーズに行うためのアプリ**です。  
リクエストカードは、**市内の図書館で取り扱っていない書籍の購入・市外からの取り寄せを希望する**場合、図書館に提出する書類です。  
リクエストしたい書籍をお気に入り登録しておくことで、リクエストカードの記入に必要な情報を一目で確認することができます。

リブラクは、図書館でのリクエストカード作成を簡単にするアプリです。  
市内の図書館に欲しい本がないとき、購入や他の図書館からの取り寄せを頼むのに使うのがリクエストカードです。  
このアプリを使えば、欲しい本をお気に入りに登録しておくだけで、カードを書くときに必要な情報が一目でわかり、スムーズに手続きができるようになります。

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

## 🐈‍⬛ 振り返り

- 良かった点
  - 練習用リポジトリを作成し、実装前に新しく触れる技術を試した
    <details>
      <summary>練習用リポジトリ一覧</summary>
        <ul style="list-style-position: inside;">
          <li>https://github.com/kagomen/oauth-jwt-practice</li>
          <li>https://github.com/kagomen/jwt-practice</li>
          <li>https://github.com/kagomen/react-turnstile-practice</li>
          <li>https://github.com/kagomen/react-vite-pages-functions-practice</li>
          <li>https://github.com/kagomen/cloudflare-workers-practice</li>
          <li>https://github.com/kagomen/react-router-v6-practice</li>
          <li>https://github.com/kagomen/react-form-practice</li>
          <li>https://github.com/kagomen/react-query-practice</li>
          <li>https://github.com/kagomen/proxy-server-practice</li>
        </ul>
    </details>
- 反省点
  - ディレクトリ構成を何度も変更した
  - CorsやCookieの設定に手間取った
  - 各ライブラリに対する理解が浅い
- 改善策
  - Next.jsなどのフルスタックフレームワークを使用する
  - 復習として、できるだけ同じ技術スタックで次回の個人開発を行う
