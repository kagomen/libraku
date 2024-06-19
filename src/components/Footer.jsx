import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    // h-[ px]を変更したら、App.jsxのpb-[ px]も同じ数値に変更すること
    <div className="absolute bottom-0 flex h-[96px] w-full flex-col items-center justify-center gap-y-2 bg-emerald-500">
      <div className="flex justify-center gap-2 text-sm text-white">
        <Link to={'/contact'}>お問い合わせ</Link>
        <span>|</span>
        <Link to={'/contact'}>プライバシーポリシー</Link>
      </div>
      <p className="text-center text-xs text-emerald-600">Copyright © 2024 リブラク All Rights Reserved</p>
    </div>
  )
}
