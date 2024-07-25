import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import SearchBar from '../components/SearchBar'

const NotFoundPage = () => {
  return (
    <div className="py-12">
      <ResponsiveWrapper>
        <h2 className="mb-1 text-lg font-semibold">404 NotFound</h2>
        <p className="mb-8">お探しのページが見つかりません。</p>
        <SearchBar />
      </ResponsiveWrapper>
    </div>
  )
}

export default NotFoundPage
