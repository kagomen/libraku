import axios from 'axios'

export async function init(keyword) {
  const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
  return res
}
