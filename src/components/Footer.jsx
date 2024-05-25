export default function Footer({ searchResults }) {
  return (
    <div className={`flex items-center w-full justify-center bg-emerald-500 text-white text-xs h-[32px] ${searchResults == null ? ' absolute bottom-0 ' : ' static '}`}>
      <p>Developed by kagome 2024</p>
    </div>
  )
}