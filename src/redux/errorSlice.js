import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  error: false,
  message: 'no new error',
  type: 'error',
};

// calling authToken data ayncronus way

const errorSlice = createSlice({
  name: 'err',
  initialState: initialState,
  reducers: {
    setError: (state, {payload}) => {
      state.error = payload.error;
      state.message = payload.message;
      state.type = payload.type;
    },
  },
});

export const {setError} = errorSlice.actions;

export default errorSlice.reducer;
