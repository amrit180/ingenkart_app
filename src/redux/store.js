import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import authTokenReducer from "./authToken";
import createCampaignReducer from "./createCampaignSlice";
import errorReducer from "./errorSlice";
import campaignsReducer from "./campaignsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  err: errorReducer,
  authToken: authTokenReducer,
  createCampaign: createCampaignReducer,
  campaigns: campaignsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     user: userReducer,
//     err: errorReducer,
//     authToken: authTokenReducer,
//     createCampaign: createCampaignReducer,
//     campaigns: campaignsReducer,
//   },
// });
