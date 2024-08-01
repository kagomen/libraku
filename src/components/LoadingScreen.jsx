import { Loader } from 'lucide-react'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center  backdrop-blur-sm">
      <div className="animate-spin text-4xl text-primary">
        <Loader />
      </div>
    </div>
  )
}

export default LoadingScreen
