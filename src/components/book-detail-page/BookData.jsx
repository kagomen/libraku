import { useBookData } from '@/api/api'
import NoImage from '@/assets/noimage.webp'
import { Card, CardContent } from '@/components/chadcn-ui/card'
import { Button } from '@/components/chadcn-ui/button'
import Title from './Title'
import Content from './Content'
import { ChevronRight, Heart } from 'lucide-react'
import ColumnTitle from '@/components/ColumnTitle'
import ButtonIconWrapper from '../ButtonIconWrapper'
import { useUserContext } from '@/contexts/UserContext'
import { Link } from 'react-router-dom'
import DialogForNonRegisteredUser from '../DialogForNonRegisteredUser'
import { DialogTrigger } from '../chadcn-ui/dialog'
import { noImageUrl } from '@/utils/constants'
import FavoriteToggleButton from './FavoriteToggleButton'
import AmazonLinkButton from './AmazonLinkButton'

const BookData = (props) => {
  const { data: book } = useBookData(props.isbn)
  const { cardNumber, userId } = useUserContext()

  return (
    <div className="space-y-6">
      <Card className="relative py-11">
        <AmazonLinkButton />
        {userId ? (
          <FavoriteToggleButton book={book} isbn={props.isbn} />
        ) : (
          <DialogForNonRegisteredUser>
            <Button asChild variant="ghost" className="absolute right-5 top-5 p-0">
              <DialogTrigger>
                <div className="w-fit rounded-full bg-border p-2.5 text-white">
                  <Heart />
                </div>
              </DialogTrigger>
            </Button>
          </DialogForNonRegisteredUser>
        )}
        <div className="space-y-11">
          <img
            src={book.largeImageUrl != noImageUrl ? book.largeImageUrl : NoImage}
            width="140"
            height="200"
            className="mx-auto block h-[200px] w-[140px] object-contain"
          />
          <div className="mx-auto mt-10 w-full space-y-6 text-left">
            <div>
              <Title>書名</Title>
              <Content>{book.title ? book.title : '-'}</Content>
            </div>
            <div>
              <Title>著者名</Title>
              <Content>{book.author ? book.author : '-'}</Content>
            </div>
            <div>
              <Title>出版社</Title>
              <Content>{book.publisherName ? book.publisherName : '-'}</Content>
            </div>
            <div>
              <Title>出版日</Title>
              <Content>{book.salesDate ? book.salesDate : '-'}</Content>
            </div>
            <div>
              <Title>価格</Title>
              <Content>{book.itemPrice ? `${book.itemPrice}円` : '-'}</Content>
            </div>
            <div>
              <Title>ISBN</Title>
              <Content>{book.isbn ? book.isbn : '-'}</Content>
            </div>
            <div>
              <Title>本日の日付</Title>
              <Content className="border-b-0">{new Date().toLocaleDateString('ja-JP')}</Content>
            </div>
            {cardNumber && (
              <div>
                <Title>利用者番号</Title>
                <Content>{cardNumber}</Content>
              </div>
            )}
          </div>
        </div>
      </Card>
      {!cardNumber && (
        <Card className="space-y-6">
          <ColumnTitle>もっと便利に</ColumnTitle>
          <CardContent>
            <p>図書カードの利用者番号を登録すると、リクエストカードの記入がよりスムーズになります。</p>
          </CardContent>
          <div>
            <Title>利用者番号</Title>
            <Content>例：123-456-7890</Content>
          </div>
          {userId ? (
            <Button asChild className="relative w-full">
              <Link to="/settings/user-number">
                <ButtonIconWrapper side="right">
                  <ChevronRight />
                </ButtonIconWrapper>
                利用者番号を登録する
              </Link>
            </Button>
          ) : (
            <DialogForNonRegisteredUser>
              <Button asChild className="relative w-full">
                <DialogTrigger>
                  <ButtonIconWrapper side="right">
                    <ChevronRight />
                  </ButtonIconWrapper>
                  利用者番号を登録する
                </DialogTrigger>
              </Button>
            </DialogForNonRegisteredUser>
          )}
        </Card>
      )}
    </div>
  )
}

export default BookData
