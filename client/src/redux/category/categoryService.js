import axios from 'axios'
import { SERVER_URL } from '../../constants/url'

const url = `${SERVER_URL}api/categories`



// MY Chats
const categories = async () => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }
  const category = await axios({
    method: 'get',
    url: `${url}/getAll`,
    headers: header,
  })

  return category.data
}


const categoryService = {
  categories,
}

export default categoryService
