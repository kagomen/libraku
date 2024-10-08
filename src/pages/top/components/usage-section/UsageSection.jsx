import Heading from '@/components/elements/Heading'
import { Button } from '@/components/shadcn-ui/button'
import { Card, CardContent } from '@/components/shadcn-ui/card'
import Emoji from './Emoji'
import UpMotion from '@/components/motions/UpMotion'
import Step from './Step'
import ColumnTitle from '@/components/elements/ColumnTitle'
import ButtonIconWrapper from '@/components/elements/ButtonIconWrapper'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUserContext } from '@/contexts/UserContext'

function UsageSection() {
  const { userId } = useUserContext()
  return (
    <div className="z-80 relative bg-background ">
      <div className="container space-y-8 pb-10 pt-10 md:space-y-10 md:pb-14 md:pt-20">
        <UpMotion>
          <ColumnTitle>
            リブラクを便利に使う<span className="pl-1 font-sans">5 STEP</span>
          </ColumnTitle>
        </UpMotion>
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
              <p>準備万端！リブラクを使い、ストレスフリーにリクエストカードを記入しましょう！</p>
            </CardContent>
          </Card>
        </UpMotion>
        <UpMotion>
          <Card className="space-y-5 border-none">
            <Step step="5" />
            <Emoji step="5" />
            <Heading>ホーム画面にリブラクを追加する</Heading>
            <CardContent className="text-center">
              <p>スマートフォンのホーム画面に追加すると、すぐにリブラクにアクセスでき、より便利に！</p>
              <Button variant="link" asChild>
                <Link to="about-pwa">※ 追加方法はこちら</Link>
              </Button>
            </CardContent>
          </Card>
        </UpMotion>
        {userId == null && (
          <div className="py-4">
            <Button asChild className="relative w-full">
              <Link to="/sign-up">
                <ButtonIconWrapper side="right">
                  <ChevronRight />
                </ButtonIconWrapper>
                ユーザー登録する
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UsageSection
