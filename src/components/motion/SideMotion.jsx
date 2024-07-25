import { motion } from 'framer-motion'

function SideMotion({ children, delay = 0.2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: delay, ease: 'easeInOut' }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export default SideMotion
