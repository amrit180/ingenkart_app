import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

// calling authToken data ayncronus way

const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: initialState,
  reducers: {
    setToken: (state, {payload}) => {
      state.token = payload.token;
    },
  },
});

export const {setToken} = authTokenSlice.actions;

export default authTokenSlice.reducer;
