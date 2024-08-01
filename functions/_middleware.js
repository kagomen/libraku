// 本番環境用のプロキシ設定
export const onRequest = async (context) => {
  const url = new URL(context.request.url)

  if (url.pathname.startsWith('/api/')) {
    // APIリクエストの場合、バックエンドにプロキシ
    const newUrl = new URL(url.pathname, 'https://libraku-api.kagome.workers.dev')
    const newRequest = new Request(newUrl, context.request)
    return fetch(newRequest)
  }

  // APIリクエスト以外は通常通り処理
  return context.next()
}
