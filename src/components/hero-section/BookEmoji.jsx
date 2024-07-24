import book0 from '@/assets/books/emoji_u1f4d3.svg'
import book1 from '@/assets/books/emoji_u1f4d4.svg'
import book2 from '@/assets/books/emoji_u1f4d5.svg'
import book3 from '@/assets/books/emoji_u1f4d6.svg'
import book4 from '@/assets/books/emoji_u1f4d7.svg'
import book5 from '@/assets/books/emoji_u1f4d8.svg'
import book6 from '@/assets/books/emoji_u1f4d9.svg'

const bookEmojis = [book0, book1, book2, book3, book4, book5, book6]

function BookEmoji(props) {
  const src = bookEmojis[props.book]
  return <img src={src} alt="" width={props.width} height={props.height} />
}

export default BookEmoji
