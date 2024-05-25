export default function Header({ goHome }) {
  return (
    <div className="bg-emerald-500 text-lg font-bold text-white">
      <p onClick={goHome} className="px-2 py-2 cursor-pointer">
        リブラク
      </p>
    </div>
  )
}
