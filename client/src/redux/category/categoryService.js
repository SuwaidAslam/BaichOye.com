import axios from 'axios'

const url = 'http://localhost:5000/api/categories'



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
