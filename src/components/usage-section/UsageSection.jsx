import Heading from '../Heading'
import ResponsiveWrapper from '../ResponsiveWrapper'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import Emoji from './Emoji'
import UpMotion from '@/components/motion/UpMotion'
import Step from './Step'
import ColumnTitle from '@/components/ColumnTitle'
import SideMotion from '../motion/SideMotion'
import ButtonIconWrapper from '../ButtonIconWrapper'
import { ChevronRight } from 'lucide-react'

function UsageSection() {
  return (
    <div className="z-80 relative bg-background pb-14 pt-10">
      <ResponsiveWrapper className="space-y-8">
        <SideMotion>
          <ColumnTitle>
            リブラクを便利に使う<span className="pl-1 font-sans">5 STEP</span>
          </ColumnTitle>
        </SideMotion>
        <UpMotion>
          <Card className="space-y-5 border-none">
            <Step step="1" />
            <Emoji step="1" />
            <Heading>本を検索する</Heading>
            <CardContent className="text-center">
              <p>市内の図書館で取り扱いのない本を検索します。</p>
            </CardContent>
          </Card>
        </UpMotion>
        <UpMotion>
          <Card className="space-y-5 border-none">
            <Step step="2" />
            <Emoji step="2" />
            <Heading>お気に入り登録する</Heading>
            <CardContent className="text-center">
              <p>リクエストしたい本を忘れないよう、お気に入り登録をします。</p>
            </CardContent>
          </Card>
        </UpMotion>
        <UpMotion>
          <Card className="space-y-5 border-none">
            <Step step="3" />
            <Emoji step="3" />
            <Heading>利用者番号を登録する</Heading>
            <CardContent className="text-center">
              <p>利用者番号を登録しておくと、当日のリクエストカードの記入がよりスムーズに。</p>
            </CardContent>
          </Card>
        </UpMotion>
        <UpMotion>
          <Card className="space-y-5 border-none">
            <Step step="4" />
            <Emoji step="4" />
            <Heading>図書館に行く</Heading>
            <CardContent className="text-center">
              <p>
                準備万端！リブラクのお気に入り一覧ページを見ながら、ストレスフリーにリクエストカードを記入しましょう！
              </p>
            </CardContent>
          </Card>
        </UpMotion>
        <UpMotion>
          <Card className="space-y-5 border-none">
            <Step step="5" />
            <Emoji step="5" />
            <Heading>ホーム画面にリブラクを追加する</Heading>
            <CardContent className="text-center">
              <p>リブラクを気に入ったら、スマホのホーム画面にアプリを追加してください。</p>
              <p>あなたの図書館ライフを引き続き少しだけ便利にします！</p>
              <Button variant="link">※ 詳細はこちら</Button>
            </CardContent>
          </Card>
        </UpMotion>
        <div className="space-y-4 pt-4">
          <Button variant="outline" className="relative w-full">
            <ButtonIconWrapper side="right">
              <ChevronRight />
            </ButtonIconWrapper>
            まずは使ってみる
          </Button>
          <Button className="relative w-full">
            <ButtonIconWrapper side="right">
              <ChevronRight />
            </ButtonIconWrapper>
            ユーザー登録する
          </Button>
        </div>
      </ResponsiveWrapper>
    </div>
  )
}

export default UsageSection
