import { motion } from 'framer-motion'

function FloatMotion({ children, delay = 0, rotate, duration }) {
  return (
    <motion.div
      initial={{ y: 0, rotate }}
      animate={{ y: [0, -20, 0] }}
      exit={{ y: 40 }}
      transition={{ duration, repeat: Infinity, repeatType: 'loop', delay, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export default FloatMotion
