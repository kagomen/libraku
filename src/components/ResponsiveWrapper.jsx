import { cn } from '@/lib/utils'

function ResponsiveWrapper({ children, className }) {
  return <div className={cn('mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]', className)}>{children}</div>
}

export default ResponsiveWrapper
