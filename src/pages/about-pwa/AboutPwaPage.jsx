import Heading from '@/components/elements/Heading'
import { Card, CardContent } from '@/components/shadcn-ui/card'
import Step from '../top/components/usage-section/Step'
import { Button } from '@/components/shadcn-ui/button'
import { Link } from 'react-router-dom'
import step1 from '@/assets/about-pwa/pwa-step1.png'
import step2 from '@/assets/about-pwa/pwa-step2.png'
import step3 from '@/assets/about-pwa/pwa-step3.png'
import step4 from '@/assets/about-pwa/pwa-step4.png'

function AboutPwaPage() {
  return (
    <div className="container space-y-8  py-12 md:space-y-10 md:pb-20">
      <Heading className="mb-8">ホーム画面にリブラクを追加する</Heading>
      <Card className="space-y-5 border-none">
        <Step step="1" />
        <img src={step1} alt="" width="150" height="294.13" className="mx-auto" />
        <CardContent className="text-center">
          <p>
            <Button asChild variant="link">
              <Link to="/">トップページ</Link>
            </Button>
            に移動し、画面下部のマークをタップします。
          </p>
        </CardContent>
      </Card>
      <Card className="space-y-5 border-none">
        <Step step="2" />
        <img src={step2} alt="" width="150" height="294.13" className="mx-auto" />
        <CardContent className="text-center">
          <p>「ホーム画面に追加」をタップします。</p>
        </CardContent>
      </Card>
      <Card className="space-y-5 border-none">
        <Step step="3" />
        <img src={step3} alt="" width="150" height="294.13" className="mx-auto" />
        <CardContent className="text-center">
          <p>画面左上の「追加」をタップします。</p>
        </CardContent>
      </Card>
      <Card className="space-y-5 border-none">
        <Step step="4" />
        <img src={step4} alt="" width="150" height="294.13" className="mx-auto" />
        <CardContent className="text-center">
          <p>ブラウザを閉じ、ホーム画面を確認します。より便利にリブラクが使えるようになりました！</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AboutPwaPage
