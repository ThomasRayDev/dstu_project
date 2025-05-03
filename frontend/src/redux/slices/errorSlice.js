import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    setError: (state, action) => action.payload,
    clearError: () => null,
  },
});

export const { setError, clearError } = errorSlice.actions;

export const setErrorWithTimeout =
  (message, delay = 5000) =>
  (dispatch) => {
    dispatch(setError(message));
    setTimeout(() => {
      dispatch(clearError());
    }, delay);
  };

export default errorSlice.reducer;
