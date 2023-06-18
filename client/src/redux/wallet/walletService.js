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

// makeTransactionFromWallet
const makeTransactionFromWallet = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }
  const ad = await axios({
    method: 'post',
    url: `${url}/makeTransactionFromWallet`,
    headers: header,
    data,
  })
  return ad.data
}

// get transactions of the current user
const getTransactions = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }
  const ad = await axios({
    method: 'get',
    url: `${url}/getTransactions`,
    headers: header,
  })
  return ad.data
}

// get Wallet Balance
const getWalletBalance = async () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }
  const ad = await axios({
    method: 'get',
    url: `${url}/getWalletBalance`,
    headers: header,
  })
  return ad.data
}

// desposit money to wallet
const depositMoney = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }
  const ad = await axios({
    method: 'post',
    url: `${url}/depositMoney`,
    headers: header,
    data: {
      amount: data
    },
  })
  return ad.data
}

// withdraw money from wallet
const withdrawMoney = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }
  const ad = await axios({
    method: 'post',
    url: `${url}/withdrawMoney`,
    headers: header,
    data: {
      amount: data
    },
  })
  return ad.data
}



const chatService = {
  makeTransaction,
  makeTransactionFromWallet,
  getTransactions,
  getWalletBalance,
  depositMoney,
  withdrawMoney,
}

export default chatService
