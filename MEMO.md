## Axios

- なぜ Axios を使うか？
  - 多くの場合、ヘッダーを設定する必要がない
  - リクエストボディを JSON 文字列へ変換する必要がない

## HTML

- button タグ
  - デフォルトで`type=submit`が設定されている
  - その他: `type="button"` `type="reset"`

## CSS

- flex-1
  - 親要素にflexを指定した上で子要素に`flex-1`使用する
  - 子要素の幅が、"残りの幅いっぱい"になる

## npm

- `-E` `--save-exact`オプション
  - ライブラリのバージョンを更新しない

## ESLint

- エラーメッセージ: `~ is missing in props validation`
  - 以下のように設定し、props の型定義チェックを OFF にする
  ```json
  rules: {
    "react/prop-types": "off"
  }
  ```

## Prettier

- 導入方法

  ```
  npm install -D -E prettier
  ```

- `.prettierrc` デフォルト設定（一部）

  - インデント: 2 スペース
  - セミコロン: 自動挿入
  - シングルクォート: 非使用
  - ダブルクォート: 使用
  - カンマ: 行末
  - 括弧の位置: 同じ行
  - 行の長さ: 80 文字

- .prettierignore
  - コードフォーマットをしないファイルを指定する
  - デフォルトでは以下のファイルが設定されている
    - \*\*/.git
    - \*\*/.svn
    - \*\*/.hg
    - \*\*/node_modules
