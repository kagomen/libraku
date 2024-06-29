import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchData } from '../context/SearchData'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'
import { Asterisk, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

const SearchBar = () => {
  const nav = useNavigate()
  const location = useLocation()
  const { keyword, setKeyword } = useSearchData()

  function onSubmit(data) {
    setKeyword(data.searchKeyword)
    nav(`/search/${data.searchKeyword}`)
  }

  const schema = yup.object({
    searchKeyword: yup
      .string()
      .trim()
      .lowercase()
      .transform((value) => value.normalize('NFKC'))
      .required('キーワードが入力されていません')
  })

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

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
      <label htmlFor="searchKeyword" className="mb-1 block pl-1 text-xs">
        本をさがす
      </label>
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex">
        <Input
          id="searchKeyword"
          type="text"
          placeholder="タイトル・著者名など"
          {...register('searchKeyword')}
          className="bg-opacity-50 px-2 py-1 text-lg backdrop-blur-sm focus:outline-none"
        />
        <Button className="absolute right-0 top-0 h-full rounded-l-none">
          <Search size="20" />
        </Button>
      </form>
      {errors.searchKeyword && (
        <div className='mt-1.5 text-red-500 flex'>
          <Asterisk size="18" />
          <p className='text-sm'>{errors.searchKeyword?.message}</p>
        </div>
      )}
    </div>
  )
}

export default SearchBar
