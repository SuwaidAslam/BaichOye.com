import axios from 'axios'
import { SERVER_URL } from '../../constants/url'

const url = `${SERVER_URL}api/auth`

const register = async (data) => {
  const user = await axios.post(`${url}/signup`, data)

  return user.data
}

// login
const login = async (data) => {
  const user = await axios({
    method: 'post',
    url: `${url}/signin`,
    data,
  })

  if (user) {
    localStorage.setItem('token', JSON.stringify(user.data.token))
    localStorage.setItem('user', JSON.stringify(user.data.user))
  }

  return user.data
}

const update = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const current_user = JSON.parse(localStorage.getItem('user'))
  const id = current_user._id
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const user = await axios({
    method: 'put',
    url: `${url}/update/${id}`,
    data: data,
    headers,
  })
  localStorage.setItem('user', JSON.stringify(user.data.user))
  return user.data
}

// verify method to verify user
const submitVerificationData = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const current_user = JSON.parse(localStorage.getItem('user'))
  const id = current_user._id
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const user = await axios({
    method: 'post',
    url: `${url}/verify-id/${id}`,
    data: data,
    headers,
  })
  localStorage.setItem('user', JSON.stringify(user.data.user))
  return user.data
}

// verify method to verify user
const checkVerificationDataSubmission = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const current_user = JSON.parse(localStorage.getItem('user'))
  const id = current_user._id
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const user = await axios({
    method: 'get',
    url: `${url}/is-verification-submitted/${id}`,
    headers,
  })
  localStorage.setItem('user', JSON.stringify(user.data.user))
  return  user.data.user.verificationStatus
}

const authService = {
  register,
  login,
  update,
  submitVerificationData,
  checkVerificationDataSubmission
}

export default authService
