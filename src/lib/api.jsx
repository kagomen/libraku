import axios from 'axios'

export async function search(keyword, pageNum = 0) {
  const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&printType=books&startIndex=${pageNum}&langRestrict=ja`)
  return res
}

export async function get(id) {
  const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
  return res
}
export async function rakutenSearch(keyword) {
  axios.get(`https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=${keyword}&applicationId=1024983926354156256`)
}