import { CardDescription } from '@/components/shadcn-ui/card'

function Content({ children }) {
  return (
    <CardDescription className="m-0 rounded-tr-md border border-primary pl-4 leading-relaxed">
      {children}
    </CardDescription>
  )
}

export default Content
