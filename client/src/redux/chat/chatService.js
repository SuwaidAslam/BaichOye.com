import axios from 'axios'

const url = 'http://localhost:5000/api/chat'

// Send chat
const sendChat = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }
  const ad = await axios({
    method: 'post',
    url: `${url}/send`,
    headers: header,
    data,
  })
  return ad.data
}


const chatService = {
  sendChat,
}

export default chatService
