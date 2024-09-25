import { useParams } from 'react-router-dom'
import { Button } from '@/components/shadcn-ui/button'
import { FaAmazon } from 'react-icons/fa'
import { isbn13To10 } from './isbn13To10'

function AmazonLinkButton() {
  const { isbn } = useParams()
  const isbn10 = isbn13To10(isbn)
  const url = `https://www.amazon.co.jp/dp/${isbn10}?&tag=libraku-22&language=ja_JP`
  // https://affiliate.amazon.co.jp/home/tools/linkchecker?ac-ms-src=ac-nav にてリンクが動作するか定期的に確認すること
  return (
    <Button variant="ghost" className="absolute right-5 top-5 p-0">
      <div
        className={'flex h-8 w-8 items-center justify-center rounded-full border border-primary text-primary'}
        onClick={() => window.open(url, '_blank')}
      >
        <FaAmazon size="18" />
      </div>
    </Button>
  )
}

export default AmazonLinkButton
