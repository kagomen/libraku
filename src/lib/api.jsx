import axios from 'axios'

export async function search(keyword) {
  const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
  return res
}

export async function get(id) {
  const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
  return res
}