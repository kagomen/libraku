import { Link } from 'react-router-dom'
import { Button } from '@/components/shadcn-ui/button'

function NavMenuForGeneralUser() {
  return (
    <Button size="sm" asChild className="text-sm">
      <Link to="/sign-in">ログイン</Link>
    </Button>
  )
}

export default NavMenuForGeneralUser
