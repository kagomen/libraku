import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Asterisk, Search } from 'lucide-react'
import { Input } from '@/components/chadcn-ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const SearchBar = (props) => {
  const nav = useNavigate()

  function onSubmit(data) {
    nav(`/search/${data.searchKeyword}`)
  }

  const schema = z.object({
    searchKeyword: z.string().trim().min(1, { message: 'キーワードが入力されていません' }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

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
