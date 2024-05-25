## Axios

- なぜ Axios を使うか？
  - 多くの場合、ヘッダーを設定する必要がない
  - リクエストボディを JSON 文字列へ変換する必要がない

## Tailwind CSS

- tailwind.config.jsのentendの役割

  - extend外に記述した設定は、設定したもののみ認められる
  - 以下の場合は、Tailwind内で使用できる色が`blue-25`のみになる

    ```js
    theme: {
      colors: {
        blue: {
          25: '#17275c',
            },
      },
      extend: {
        // 他の設定
      },
    },
    ```

  - 以下の場合は、デフォルトの色に加え、`blue-25`が使えるようになる
    ```js
    theme: {
      extend: {
        colors: {
          blue: {
            25: '#17275c',
          },
        }
      },
    },
    ```

## HTML

- button タグ
  - デフォルトで`type=submit`が設定されている
  - その他: `type="button"` `type="reset"`

## CSS

- flexプロパティ

  - `flex: <flex-grow> <flex-shrink> <flex-basis>`
    - `flex-grow`
      - 子要素の伸び率
      - 初期値: 0
    - `flex-shrink`
      - 子要素の縮み率
      - 初期値: 1
    - `flex-basis`
      - 子要素の幅を指定
      - 初期値: auto
      - autoは子要素自身の幅

- flexボックスの子要素が親要素をはみ出る時の対応策

  - 子要素に`min-width: 0`を追加

- position: absoluteの中央寄せ

  ```css
  /* 上下中央寄せ */

  .class {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  /* 左右中央寄せ */

  .class {
    position: absolute;
    left: 0;
    right: 0;
  }
  ```

- `inset`

  - top, right, bottom, left に対応する一括指定
  - `inset: 0`はモーダルの背景に最適

- bodyに背景色をつけて、バウンススクロール時に対策をしたい

  ```css
  body {
    background: #ddd;
  }

  .main-wrapper {
    min-height: 100vh;
  }
  ```

  - 上下で色を変えたい時はこちらを参考:
    https://qiita.com/bgn_nakazato/items/9399937fdf4059f9f9d7

- フッターを下に固定

  ```css
  .main-wrapper {
    position: relative;
    padding-bottom: 32px;
    /* フッターの上部に余白が欲しい場合はフッターの高さに加えて余白分も数値もプラスする */
  }

  .footer {
    position: absolute;
    bottom: 0;
    height: 32px;
  }
  ```

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

````

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
````
