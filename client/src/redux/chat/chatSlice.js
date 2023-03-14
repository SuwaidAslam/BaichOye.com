import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from './chatService';

const initialState = {
  chats: [],
  filteredChats: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
}

// POST AD
export const sendChat = createAsyncThunk(
  '/api/chat/send',
  async (data, ThunkAPI) => {
    try {
      return await chatService.sendChat(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return ThunkAPI.rejectWithValue(message)
    }
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: (state) => {
      state.chats = []
      state.filteredChats = []
      state.errorMessage = ''
      state.successMessage = ''
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
    },
    searchFilter: (state, action) => {
      const input = action.payload

      state.filteredChats = state.chats.filter((chat) =>
      chat.message.toLowerCase().includes(input.toLowerCase())
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChat.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(sendChat.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(sendChat.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
  },
})

export const {
  reset,
  searchFilter,
} = chatSlice.actions
export default chatSlice.reducer
