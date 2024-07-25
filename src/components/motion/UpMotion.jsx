import { motion } from 'framer-motion'

function UpMotion({ children, delay = 0.1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay, ease: 'easeInOut' }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export default UpMotion
