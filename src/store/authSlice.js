import { createSlice } from '@reduxjs/toolkit';


const safeParse = (item) => {
  try {
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
};

const initialState = {
  user: safeParse(localStorage.getItem('user')),
  token: localStorage.getItem('token'),
  isAuthenticated: Boolean(localStorage.getItem('token')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.clear(); 
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;