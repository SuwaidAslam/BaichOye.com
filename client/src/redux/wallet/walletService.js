import axios from 'axios'

const url = 'http://localhost:5000/api/wallet'


// makeTransaction
const makeTransaction = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }
  const ad = await axios({
    method: 'post',
    url: `${url}/makeTransaction`,
    headers: header,
    data,
  })
  return ad.data
}

const chatService = {
  makeTransaction,
}

export default chatService
