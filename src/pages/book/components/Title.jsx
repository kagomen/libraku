import { CardTitle } from '@/components/shadcn-ui/card'

function Title({ children }) {
  return (
    <CardTitle className="m-0 w-[120px] rounded-md rounded-b-none bg-primary px-4 py-2 font-normal text-white">
      {children}
    </CardTitle>
  )
}

export default Title
