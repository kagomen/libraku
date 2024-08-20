import SearchBar from '@/components/elements/SearchBar'

const NotFoundPage = () => {
  return (
    <div className="container py-12">
      <h2 className="mb-1 text-lg font-semibold">404 NotFound</h2>
      <p className="mb-8">お探しのページが見つかりません。</p>
      <SearchBar />
    </div>
  )
}

export default NotFoundPage
