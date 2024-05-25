export default function Header({ goHome }) {
  return (
    <div className="bg-emerald-500 text-white font-bold text-lg">
      <p onClick={goHome} className="px-2 py-2">リブラク</p>
    </div>
  )
}
