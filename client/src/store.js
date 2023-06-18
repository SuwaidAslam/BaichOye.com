import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/auth/authSlice'
import adsReducer from './redux/ads/adsSlice'
import chatsReducer from './redux/chat/chatSlice'
import categoryReducer from './redux/category/categorySlice'
import walletReducer from './redux/wallet/walletSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adsReducer,
    chats: chatsReducer,
    categories: categoryReducer,
    wallet: walletReducer,
  },
})