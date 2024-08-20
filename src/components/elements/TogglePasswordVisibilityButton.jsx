import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/chadcn-ui/button'

function TogglePasswordVisibilityButton(props) {
  return (
    <Button
      type="button"
      onClick={() => props.setShowPassword(!props.showPassword)}
      className="absolute right-1 h-[1.5rem] px-2"
      variant="ghost"
    >
      {props.showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
    </Button>
  )
}

export default TogglePasswordVisibilityButton
