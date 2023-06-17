import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import walletService from './walletService';

const initialState = {
  transactions: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
}

// create transaction
export const makeTransaction = createAsyncThunk(
  'wallet/makeTransaction',
  async (data, thunkAPI) => {
    try {
      const response = await walletService.makeTransaction(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    reset: (state) => {
      state.transactions = []
      state.errorMessage = ''
      state.successMessage = ''
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeTransaction.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(makeTransaction.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(makeTransaction.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
  },
})

export const {
  reset
} = walletSlice.actions
export default walletSlice.reducer