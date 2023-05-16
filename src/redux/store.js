import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import authTokenReducer from './authToken';
import createCampaignReducer from './createCampaignSlice';
import errorReducer from './errorSlice';
import campaignsReducer from './campaignsSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    err: errorReducer,
    authToken: authTokenReducer,
    createCampaign: createCampaignReducer,
    campaigns: campaignsReducer,
  },
});
