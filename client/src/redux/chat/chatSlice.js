import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from './chatService';

const initialState = {
  chats: [],
  chatMessages: [],
  filteredChats: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
}

// send Message
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

// Get My Chats
export const myChats = createAsyncThunk('/api/chat/myChats', async (ThunkAPI) => {
  try {
    return await chatService.myChats()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return ThunkAPI.rejectWithValue(message)
  }
})

// Get Messages of a particular chat
export const getChatMessages = createAsyncThunk('/api/chat/chatMessages', async (data, ThunkAPI) => {
  try {
    return await chatService.chatMessages(data)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return ThunkAPI.rejectWithValue(message)
  }
})


export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    reset: (state) => {
      state.chats = []
      state.filteredChats = []
      state.chatMessages = []
      state.errorMessage = ''
      state.successMessage = ''
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
    },
    resetChats: (state) => {
      state.chats = []
      state.errorMessage = ''
    },
    resetChatMessages: (state) => {
      state.chatMessages = []
      state.errorMessage = ''
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
      // GET MY Chats
      .addCase(myChats.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(myChats.fulfilled, (state, actions) => {
        state.chats = actions.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
      })
      .addCase(myChats.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.errorMessage = actions.payload
      })
      // GET Particular messages
      .addCase(getChatMessages.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(getChatMessages.fulfilled, (state, actions) => {
        state.chatMessages = actions.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
      })
      .addCase(getChatMessages.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.errorMessage = actions.payload
      })
  },
})

export const {
  reset,
  searchFilter,
  resetChats,
  resetChatMessages
} = chatSlice.actions
export default chatSlice.reducer