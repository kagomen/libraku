import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchData } from '../context/SearchData'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Asterisk, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const SearchBar = (props) => {
  const nav = useNavigate()
  const location = useLocation()
  const { keyword, setKeyword } = useSearchData()

  function onSubmit(data) {
    setKeyword(data.searchKeyword)
    nav(`/search/${data.searchKeyword}`)
  }

  const schema = z.object({
    searchKeyword: z.string().trim().min(1, { message: 'キーワードが入力されていません' }),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  // inputタグのvalueにkeywordをセットする
  useEffect(() => {
    setValue('searchKeyword', keyword)
  }, [keyword, setValue])

  // トップページ遷移時にkeywordをリセットさせる
  useEffect(() => {
    if (location.pathname == '/') {
      setKeyword('')
    }
  }, [location.pathname, setKeyword])

  return (
    <div className="my-4">
      {/* トップページの時のみ「本をさがす」を表示 */}
      {location.pathname == '/' && (
        <label htmlFor="searchKeyword" className="mb-1 block pl-1 text-sm">
          本をさがす
        </label>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex">
        <Input
          id="searchKeyword"
          type="text"
          placeholder="タイトル・著者名など"
          {...register('searchKeyword')}
          className={props.className}
        />
        <Button variant="ghost" className="absolute right-0 top-0 text-foreground">
          <Search size="20" />
        </Button>
      </form>
      {errors.searchKeyword && (
        <div className="mt-1.5 flex text-red-500">
          <Asterisk size="17" />
          <p className="text-sm">{errors.searchKeyword?.message}</p>
        </div>
      )}
    </div>
  )
}

export default SearchBar
