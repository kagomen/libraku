import { Player } from '@lottiefiles/react-lottie-player'
import Animation from '@/assets/book-animation.json'
import { Card } from '@/components/shadcn-ui/card'
import Heading from '@/components/elements/Heading'
import { ExternalLink } from 'lucide-react'

function UserPage() {
  return (
    <div className="container bg-background py-12">
      <Player autoplay loop src={Animation} speed={0.8} className="h-[300px] w-[300px]" />
      <div className="-translate-y-4 text-center">
        <h2 className="text-2xl font-medium text-primary">図書館をもっと便利に。</h2>
        <p>図書館ユーザーのための書籍検索アプリ</p>
      </div>
      <Card className="mt-8">
        <Heading>お知らせ</Heading>
        <section className="mt-7 space-y-5">
          <article>
            <time className="text-sm text-foreground/70">2024年07月31日</time>
            <h3>
              <a target="_blank" href="/" className="underline">
                アプリをホーム画面に追加できるようになりました！
                <ExternalLink size="20" className="inline -translate-y-1" />
              </a>
            </h3>
          </article>
          <article>
            <time className="text-sm text-foreground/70">2024年07月31日</time>
            <h3>
              <a target="_blank" href="/" className="underline">
                リブラクv2をリリースしました！
                <ExternalLink size="20" className="inline -translate-y-1" />
              </a>
            </h3>
          </article>
        </section>
      </Card>
    </div>
  )
}

export default UserPage
