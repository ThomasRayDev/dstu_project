import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const fetchUser = createAsyncThunk('user/fetchUserStatus', async () => {
  const response = await axios.get('/auth/current-user');
  return response.data;
});

const initialState = {
  user: {},
  status: 'loading',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.user = {};
      state.status = 'loading';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.user = {};
      state.status = 'error';
    });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
