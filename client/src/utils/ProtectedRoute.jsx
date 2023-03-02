import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return <Navigate replace to="/" />
  }else{
    return children
  }
}

export const PublicRoute = ({ children }) => {
  // const user = JSON.parse(localStorage.getItem('user'))
  return children
  // if (!user) {
  //   return children
  // }
  // return <Navigate replace to="/" />
}