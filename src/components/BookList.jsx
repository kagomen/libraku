import { Link } from 'react-router-dom'
import NoImage from '../assets/noimage.webp'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { search } from '../lib/api'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import Loading from './Loading'
import MessageShowAllItems from './MessageShowAllItems'

export default function BookList(props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['searchBooks', props.keyword],
    queryFn: ({ pageParam }) => {
      return search(props.keyword, pageParam)
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    // getNextPageParam:
    // 引数: 現在のページのデータ (lastPage) とこれまでのすべてのページのデータ (allPages)
    // 返り値: 次のページのパラメータ (次のページが存在しない場合は undefined ) => hasNextPageに反映される
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage <= lastPage.data.pageCount ? nextPage : undefined
    },
  })

  const books = data?.pages?.flatMap((page) => page.data.Items) || []

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  return (
    <div>
      <p className="text-sm">
        &quot;
        <span className="font-semibold">{props.keyword}</span>
        &quot;の検索結果：
      </p>
      {books?.map((book) => {
        return (
          <Link to={`/book/${book.Item.isbn}`} key={book.Item.isbn}>
            <div className="mt-4 flex items-start gap-4 rounded border border-emerald-500 bg-white p-4">
              <img src={book.Item.mediumImageUrl ?? NoImage} width="85" height="108" className="shrink-0" />
              <div>
                <h2 className="mb-1 text-sm font-semibold">{book.Item.title}</h2>
                <p className="text-xs">{book.Item.author}</p>
              </div>
            </div>
          </Link>
        )
      })}
      <div ref={ref}>{isFetchingNextPage ? <Loading /> : !hasNextPage && <MessageShowAllItems />}</div>
    </div>
  )
}
