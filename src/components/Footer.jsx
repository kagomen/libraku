import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="sticky top-full flex h-[96px] w-full flex-col items-center justify-center gap-y-2 bg-emerald-500">
      <div className="flex justify-center gap-2 text-sm text-white">
        <Link to={'/contact'}>お問い合わせ</Link>
        <span>|</span>
        <Link to={'/contact'}>プライバシーポリシー</Link>
      </div>
      <p className="text-center text-xs text-emerald-600">Copyright © 2024 リブラク All Rights Reserved</p>
    </div>
  )
}
