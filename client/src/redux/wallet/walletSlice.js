import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import walletService from './walletService';

const initialState = {
  transactions: [],
  balance: 0,
  depositedAmount: 0,
  withdrawnAmount: 0,
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

// makeTransactionFromWallet  
export const makeTransactionFromWallet = createAsyncThunk(
  'wallet/makeTransactionFromWallet',
  async (data, thunkAPI) => {
    try {
      const response = await walletService.makeTransactionFromWallet(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// get transactions 
export const getTransactions = createAsyncThunk(
  'wallet/getTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await walletService.getTransactions();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// getWalletBalance
export const getWalletBalance = createAsyncThunk(
  'wallet/getWalletBalance',
  async (_, thunkAPI) => {
    try {
      const response = await walletService.getWalletBalance();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// deposit money
export const depositMoney = createAsyncThunk(
  'wallet/depositMoney',
  async (data, thunkAPI) => {
    try {
      const response = await walletService.depositMoney(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// withdraw money
export const withdrawMoney = createAsyncThunk(
  'wallet/withdrawMoney',
  async (data, thunkAPI) => {
    try {
      const response = await walletService.withdrawMoney(data);
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
        state.successMessage = actions.payload.message
        state.errorMessage = ''
      })
      .addCase(makeTransaction.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload.error
      })
      //makeTransactionFromWallet
      .addCase(makeTransactionFromWallet.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(makeTransactionFromWallet.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.message
        state.errorMessage = ''
      })
      .addCase(makeTransactionFromWallet.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload.error
      })
      // get transactions
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      }
      )
      .addCase(getTransactions.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
        state.transactions = actions.payload.transactions
      }
      )
      .addCase(getTransactions.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      }
      )
      // get wallet balance
      .addCase(getWalletBalance.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      }
      )
      .addCase(getWalletBalance.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
        state.balance = actions.payload.balance
        state.depositedAmount = actions.payload.depositedAmount
        state.withdrawnAmount = actions.payload.withdrawnAmount
      }
      )
      .addCase(getWalletBalance.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      }
      )
      // deposit money
      .addCase(depositMoney.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      }
      )
      .addCase(depositMoney.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
        state.balance = actions.payload.balance
        state.depositedAmount = actions.payload.depositedAmount
        state.withdrawnAmount = actions.payload.withdrawnAmount
      }
      )
      .addCase(depositMoney.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      }
      )
      // withdrawMoney
      .addCase(withdrawMoney.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      }
      )
      .addCase(withdrawMoney.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
        state.balance = actions.payload.balance
        state.depositedAmount = actions.payload.depositedAmount
        state.withdrawnAmount = actions.payload.withdrawnAmount
      }
      )
      .addCase(withdrawMoney.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      }
      )
  },
})

export const {
  reset
} = walletSlice.actions
export default walletSlice.reducer