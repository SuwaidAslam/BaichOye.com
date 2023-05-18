import axios from 'axios'

const url = 'http://localhost:5000/api/auth'

const register = async (data) => {
  const user = await axios.post(`${url}/signup`, data)

  return user.data
}

// const activateAccount = async (token) => {
//   const header = {
//     authorization: `Bearer ${token}`,
//   }

//   const user = await axios({
//     method: 'post',
//     url: `${url}/activate`,
//     headers: header,
//   })

//   if (user) {
//     localStorage.setItem('token', JSON.stringify(user.data.token))
//   }

//   return user.data
// }

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

// // google login
// const googleLogin = async (response) => {
//   const user = await axios({
//     method: 'POST',
//     url: `${url}/googlelogin`,
//     headers: {
//       Authorization: `Bearer ${response.credential}`,
//     },
//   })

//   if (user) {
//     localStorage.setItem('token', JSON.stringify(user.data.token))
//     localStorage.setItem('user', JSON.stringify(user.data.user))
//   }

//   return user.data
// }

// const findAccount = async (email) => {
//   const user = await axios({
//     method: 'post',
//     url: `${url}/forget`,
//     data: email,
//   })

//   return user.data
// }

// const changePassword = async (data) => {
//   const { password, password2, token } = data

//   const headers = {
//     Authorization: `Bearer ${token}`,
//   }
//   const user = await axios({
//     method: 'put',
//     url: `${url}/change-password`,
//     data: {
//       password,
//       password2,
//     },
//     headers,
//   })

//   return user.data
// }

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
  return user.data
}

const authService = {
  register,
  // activateAccount,
  login,
  // findAccount,
  // changePassword,
  // googleLogin,
  update,
  submitVerificationData,
  checkVerificationDataSubmission
}

export default authService
