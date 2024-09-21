import Heading from '@/components/elements/Heading'
import Message from '@/pages/top/components/hero-section/Message'
import { Button } from '@/components/shadcn-ui/button'
import { Card, CardContent, CardTitle } from '@/components/shadcn-ui/card'
import { ExternalLink } from 'lucide-react'
import Icon from '@/assets/icon.png'

function AboutPage() {
  return (
    <div className="container space-y-8 py-12">
      <Heading>このサイトについて</Heading>
      <Message />
      <Card>
        <CardTitle>/ Developer</CardTitle>
        <CardContent className="space-y-2">
          <img src={Icon} width="100" height="100" alt="" />
          <h3 className="text-lg font-semibold">kagome</h3>
          <p>主にWeb技術を学んでいます。</p>
          <div className="md:flex md:gap-4">
            <Button
              variant="link"
              className="flex h-7 gap-1"
              onClick={() => window.open('https://github.com/kagomen', '_blank')}
            >
              GitHub
              <ExternalLink size="18" />
            </Button>
            <Button
              variant="link"
              className="flex h-7 gap-1"
              onClick={() => window.open('https://x.com/kkagomme', '_blank')}
            >
              X
              <ExternalLink size="18" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AboutPage
