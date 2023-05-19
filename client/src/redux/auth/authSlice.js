import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  verificationStatus: "NotSubmitted",
}

// register
export const register = createAsyncThunk(
  'auth/signup',
  async (data, ThunkAPI) => {
    try {
      return await authService.register(data)
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
// // activate account
// export const activateAccount = createAsyncThunk(
//   'auth/activate-account',
//   async (token, ThunkAPI) => {
//     try {
//       return await authService.activateAccount(token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return ThunkAPI.rejectWithValue(message)
//     }
//   }
// )

// LOGIN
export const login = createAsyncThunk('auth/signin', async (data, ThunkAPI) => {
  try {
    return await authService.login(data)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return ThunkAPI.rejectWithValue(message)
  }
})

// // GOOGLE LOGIN
// export const googleLogin = createAsyncThunk(
//   'auth/googlelogin',
//   async (response, ThunkAPI) => {
//     try {
//       return await authService.googleLogin(response)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return ThunkAPI.rejectWithValue(message)
//     }
//   }
// )
// // FIND ACCOUNT
// export const findAccount = createAsyncThunk(
//   'auth/find-account',
//   async (email, ThunkAPI) => {
//     try {
//       return await authService.findAccount(email)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return ThunkAPI.rejectWithValue(message)
//     }
//   }
// )
// // CHANGE PASSWORD
// export const changePassword = createAsyncThunk(
//   'auth/change-password',
//   async (data, ThunkAPI) => {
//     try {
//       return await authService.changePassword(data)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return ThunkAPI.rejectWithValue(message)
//     }
//   }
// )

// Update Profile
export const update = createAsyncThunk(
  'auth/update',
  async (data, ThunkAPI) => {
    try {
      return await authService.update(data)
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

// post the verification data to the server
export const submitVerificationData = createAsyncThunk(
  'auth/verify-id',
  async (data, ThunkAPI) => {
    try {
      return await authService.submitVerificationData(data)
    } catch (error) {
      const message = error.message || error.toString()
      return ThunkAPI.rejectWithValue(message)
    }
  }
)

// isVerficationDataSubmitted to the server
export const checkVerificationDataSubmission = createAsyncThunk(
  'auth/is-verification-submitted',
  async (ThunkAPI) => {
    try {
      return await authService.checkVerificationDataSubmission()
    } catch (error) {
      const message = error.message || error.toString()
      return ThunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.successMessage = ''
      state.errorMessage = ''
    },
    resetUser: (state) => {
      state.user = null
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.successMessage = ''
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.user = null
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(register.fulfilled, (state, actions) => {
        state.user = null
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(register.rejected, (state, actions) => {
        state.user = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })

      // // ACITVATE ACCOUNT
      // .addCase(activateAccount.pending, (state) => {
      //   state.isLoading = true
      //   state.user = null
      //   state.isSuccess = false
      //   state.isError = false
      //   state.successMessage = ''
      //   state.errorMessage = ''
      // })
      // .addCase(activateAccount.fulfilled, (state, actions) => {
      //   state.user = null
      //   state.isSuccess = true
      //   state.isLoading = false
      //   state.isError = false
      //   state.successMessage = actions.payload.successMsg
      //   state.errorMessage = ''
      // })
      // .addCase(activateAccount.rejected, (state, actions) => {
      //   state.user = null
      //   state.isSuccess = false
      //   state.isLoading = false
      //   state.isError = true
      //   state.successMessage = ''
      //   state.errorMessage = actions.payload
      // })

      // GOOGLE SIGNIN
      // .addCase(googleLogin.pending, (state) => {
      //   state.isLoading = true
      //   state.user = null
      //   state.isSuccess = false
      //   state.isError = false
      //   state.successMessage = ''
      //   state.errorMessage = ''
      // })
      // .addCase(googleLogin.fulfilled, (state, actions) => {
      //   state.user = actions.payload.user
      //   state.isSuccess = true
      //   state.isLoading = false
      //   state.isError = false
      //   state.successMessage = actions.payload.successMsg
      //   state.errorMessage = ''
      // })
      // .addCase(googleLogin.rejected, (state, actions) => {
      //   state.user = null
      //   state.isSuccess = false
      //   state.isLoading = false
      //   state.isError = true
      //   state.successMessage = ''
      //   state.errorMessage = actions.payload
      // })
      // // SIGNIN
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.user = null
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(login.fulfilled, (state, actions) => {
        state.user = actions.payload.user
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(login.rejected, (state, actions) => {
        state.user = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
      // FIND ACCOUNT
      // .addCase(findAccount.pending, (state) => {
      //   state.isLoading = true
      //   state.isSuccess = false
      //   state.isError = false
      //   state.successMessage = ''
      //   state.errorMessage = ''
      // })
      // .addCase(findAccount.fulfilled, (state, actions) => {
      //   state.isSuccess = true
      //   state.isLoading = false
      //   state.isError = false
      //   state.successMessage = actions.payload.successMsg
      //   state.errorMessage = ''
      // })
      // .addCase(findAccount.rejected, (state, actions) => {
      //   console.log(actions)
      //   state.isSuccess = false
      //   state.isLoading = false
      //   state.isError = true
      //   state.successMessage = ''
      //   state.errorMessage = actions.payload
      // })
      // // CHANGE PASSWORD
      // .addCase(changePassword.pending, (state) => {
      //   state.isLoading = true
      //   state.isSuccess = false
      //   state.isError = false
      //   state.successMessage = ''
      //   state.errorMessage = ''
      // })
      // .addCase(changePassword.fulfilled, (state, actions) => {
      //   state.isSuccess = true
      //   state.isLoading = false
      //   state.isError = false
      //   state.successMessage = actions.payload.successMsg
      //   state.errorMessage = ''
      // })
      // .addCase(changePassword.rejected, (state, actions) => {
      //   console.log(actions)
      //   state.isSuccess = false
      //   state.isLoading = false
      //   state.isError = true
      //   state.successMessage = ''
      //   state.errorMessage = actions.payload
      // })
      // Update
      .addCase(update.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(update.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(update.rejected, (state, actions) => {
        console.log(actions)
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
      // submitVerificationData
      .addCase(submitVerificationData.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(submitVerificationData.fulfilled, (state, actions) => {
        state.user = actions.payload.user
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(submitVerificationData.rejected, (state, actions) => {
        console.log(actions)
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
      // checkVerificationDataSubmission
      .addCase(checkVerificationDataSubmission.pending, (state) => {
        state.verificationStatus = null
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(checkVerificationDataSubmission.fulfilled, (state, actions) => {
        state.verificationStatus = actions.payload.verificationStatus
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(checkVerificationDataSubmission.rejected, (state, actions) => {
        console.log(actions)
        state.verificationStatus = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
  },
})

export const { reset, resetUser } = authSlice.actions
export default authSlice.reducer
