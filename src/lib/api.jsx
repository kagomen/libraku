import axios from 'axios'

export async function search(keyword) {
  const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=jp`)
  return res
}

export async function get(id) {
  const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
  return res
}

export async function moreSearch(keyword, pageNum) {
  const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&startIndex=${pageNum}&langRestrict=jp`)
  return res
}