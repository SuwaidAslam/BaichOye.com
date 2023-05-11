import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

const initialState = {
  categories: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
};


// Get Messages of a particular chat
export const getCategories = createAsyncThunk('/api/chat/chatMessages', async (data, ThunkAPI) => {
  try {
    return await categoryService.categories(data)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return ThunkAPI.rejectWithValue(message)
  }
})


export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    reset: (state) => {
      state.categories = []
      state.errorMessage = ''
      state.successMessage = ''
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // GET MY Chats
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(getCategories.fulfilled, (state, actions) => {
        state.categories = actions.payload.categories
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
      })
      .addCase(getCategories.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.errorMessage = actions.payload
      })
  },
})

export const {
  reset,
} = categorySlice.actions
export default categorySlice.reducer