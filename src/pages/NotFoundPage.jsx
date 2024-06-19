import SearchBar from "../components/SearchBar"

const NotFoundPage = () => {
  return (
    <div className="mx-auto mt-12 w-[90%]">
      <h2 className="font-semibold text-lg mb-1">404 NotFound</h2>
      <p className="mb-8">お探しのページが見つかりません。</p>
      <SearchBar />
    </div>
  )
}

export default NotFoundPage