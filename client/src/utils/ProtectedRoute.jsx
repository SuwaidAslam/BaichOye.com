import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { checkVerificationDataSubmission } from '../redux/auth/authSlice'

export const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) {
    return <Navigate replace to="/login" />
  }
  return children
}

export const ProtectedSellRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) {
    return <Navigate replace to="/login" />
  }
  else if (user) {
    const dispatch = useDispatch()
    dispatch(checkVerificationDataSubmission())
    if (user && user.verificationStatus !== 'Approved') {
      // toast.error('To post an Ad, your account must be verified')
      return <Navigate replace to="/verify-me" />
    }
  }
  return children
}


export const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) {
    return children
  }
  return <Navigate replace to="/login" />
}

export const ProtectedAdRoute = ({ children }) => {
  return children
}