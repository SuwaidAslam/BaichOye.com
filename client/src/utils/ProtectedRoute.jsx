import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) {
    return <Navigate replace to="/login" />
  }
  return children
}

export const ProtectedSellRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if((user && user.verificationStatus !== 'Approved')){
    return <Navigate replace to="/verify-me" />
  }
  if (!user) {
    return <Navigate replace to="/login" />
  }
  return children
}


export const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) {
    return children
  }
  return <Navigate replace to="/" />
}