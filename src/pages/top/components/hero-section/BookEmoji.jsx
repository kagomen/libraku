import miniBook from '@/assets/book-emojis/emoji_u1f4d4.svg'
import bigBook from '@/assets/book-emojis/emoji_u1f4d6.svg'
import normalBook from '@/assets/book-emojis/emoji_u1f4d7.svg'
import { motion } from 'framer-motion'

function BookEmoji() {
  return (
    <div className="absolute">
      <span className="fixed -left-8 top-16  transform opacity-70">
        <motion.div
          initial={{ y: 0, rotate: '-16deg' }}
          animate={{ y: [0, -10, 0] }}
          exit={{ y: 40 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'loop', delay: 0, ease: 'easeInOut' }}
        >
          <img src={bigBook} width="240px" height="240px" alt="" />
        </motion.div>
      </span>
      <span className="fixed right-0 top-[380px] opacity-50">
        <motion.div
          initial={{ y: 0, rotate: '24deg' }}
          animate={{ y: [0, 8, 0] }}
          exit={{ y: 40 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', delay: 0, ease: 'easeInOut' }}
        >
          <img src={miniBook} width="100px" height="100px" alt="" />
        </motion.div>
      </span>
      <span className="fixed -left-6 top-[560px] opacity-60">
        <motion.div
          initial={{ y: 0, rotate: '-32deg' }}
          animate={{ y: [0, -18, 0] }}
          exit={{ y: 40 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'loop', delay: 0, ease: 'easeInOut' }}
        >
          <img src={normalBook} width="180px" height="180px" alt="" />
        </motion.div>
      </span>
    </div>
  )
}

export default BookEmoji
