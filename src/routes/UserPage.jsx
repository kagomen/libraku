import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import SearchBar from '@/components/SearchBar'
import { Player } from '@lottiefiles/react-lottie-player'
import Animation from '@/assets/book-animation.json'
import { Card } from '@/components/ui/card'
import Heading from '@/components/Heading'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

function UserPage() {
  return (
    <div className="bg-background py-12">
      <ResponsiveWrapper className="">
        <SearchBar />
        <Player autoplay loop src={Animation} speed={0.8} className="h-[280px] w-[280px]" />
        <div className="text-center">
          <h2 className="text-2xl font-medium text-primary">図書館をもっと便利に。</h2>
          <p>図書館ユーザーのための書籍検索アプリ</p>
        </div>
        <Card className="mt-12">
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
      </ResponsiveWrapper>
    </div>
  )
}

export default UserPage
