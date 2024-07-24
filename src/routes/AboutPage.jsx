import Heading from '@/components/Heading'
import Message from '@/components/hero-section/Message'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import Icon from '@/assets/icon.png'

function AboutPage() {
  return (
    <div className="bg-background py-10">
      <ResponsiveWrapper className="space-y-8">
        <Heading>このサイトについて</Heading>
        <Message />
        <Card>
          <CardTitle>/ Developer</CardTitle>
          <CardContent className="space-y-2">
            <img src={Icon} width="100" height="100" />
            <h3 className="text-lg font-semibold">kagome</h3>
            <p>主にWeb技術を学んでいます。現在就職活動中です。</p>
            <div>
              <Button
                variant="link"
                className="flex h-7 gap-1 p-0 font-normal"
                onClick={() => window.open('https://github.com/kagomen', '_blank')}
              >
                GitHub
                <ExternalLink size="18" />
              </Button>
              <Button
                variant="link"
                className=" flex h-7 gap-1 p-0 font-normal"
                onClick={() => window.open('https://x.com/kkagomme', '_blank')}
              >
                X
                <ExternalLink size="18" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </ResponsiveWrapper>
    </div>
  )
}

export default AboutPage
