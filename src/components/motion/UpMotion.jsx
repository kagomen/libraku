import { motion } from 'framer-motion'

function UpMotion({ children, delay = 0.2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: delay, ease: 'easeInOut' }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export default UpMotion
