import { createSlice } from '@reduxjs/toolkit';

// Redux persist is used internally to remember user data; Redux alone can't do it on refresh the user data is cleared
const initialState = {
  User1: null,
  currentUser:null,
  error: null,
  loading: false
}

const tempUserSlice = createSlice({
  name: 'tempUserSlice',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.User1 = action.payload;
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.User1 = null;
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    }
  }
})

export const { signInStart, signInSuccess, signInFailure, logout } = tempUserSlice.actions;
export default tempUserSlice.reducer;