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


// MY Chats
const myChats = async () => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const user = await axios({
    method: 'get',
    url: `${url}/myChats`,
    headers: header,
  })

  return user.data
}

// Particular chat messages
const chatMessages = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const user = await axios({
    method: 'post',
    url: `${url}/chatMessages`,
    headers: header,
    data,
  })

  return user.data
}

const chatService = {
  sendChat,
  myChats,
  chatMessages,
}

export default chatService
