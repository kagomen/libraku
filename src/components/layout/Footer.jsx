import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="sticky top-full flex h-[96px] w-full flex-col items-center justify-center gap-y-2 bg-stone-300">
      <div className="flex justify-center gap-2 text-sm text-white">
        <Link to={'/contact'}>お問い合わせ</Link>
        <span>|</span>
        <Link to={'/about'}>このサイトについて</Link>
      </div>
      <p className="text-center text-xs text-foreground/40">Copyright © 2024 リブラク All Rights Reserved</p>
    </div>
  )
}
