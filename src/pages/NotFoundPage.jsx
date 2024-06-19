import SearchBar from '../components/SearchBar'

const NotFoundPage = () => {
  return (
    <div className="mx-auto mt-12 w-[90%]">
      <h2 className="mb-1 text-lg font-semibold">404 NotFound</h2>
      <p className="mb-8">お探しのページが見つかりません。</p>
      <SearchBar />
    </div>
  )
}

export default NotFoundPage
