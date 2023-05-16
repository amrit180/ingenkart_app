import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appliedCampaigns: [],
  joinedCampaigns: [],
};

// calling authToken data ayncronus way

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState: initialState,
  reducers: {
    setCampaigns: (state, {payload}) => {
      state.appliedCampaigns = payload.appliedCampaigns;
      state.joinedCampaigns = payload.joinedCampaigns;
    },
  },
});

export const {setCampaigns} = campaignsSlice.actions;

export default campaignsSlice.reducer;
