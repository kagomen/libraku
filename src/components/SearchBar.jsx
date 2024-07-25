import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchData } from '../context/SearchData'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Asterisk, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
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

  // トップページまたはユーザーページ遷移時にkeywordをリセットさせる
  useEffect(() => {
    if (location.pathname == '/' || location.pathname == '/user-page') {
      setKeyword('')
    }
  }, [location.pathname, setKeyword])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-center">
        <Input
          id="searchKeyword"
          type="text"
          placeholder="本のタイトル, 著者名, ISBN, etc"
          {...register('searchKeyword')}
          className={props.className}
        />
        <button className="absolute right-3 text-foreground">
          <Search size="20" />
        </button>
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
