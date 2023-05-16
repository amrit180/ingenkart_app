// /approve-or-reshoot-links

import axios from "axios";
import { API } from "../config/Values";

export const ApproveOrReshoot = async (authtoken, value) => {
  return await axios.post(`${API}/brand/approve-or-reshoot-links`, value, {
    headers: {
      authorization: authtoken,
    },
  });
};

export const createCampaignAPI = async (authtoken, values) => {
  return await axios.post(`${API}/brand/create-campaign`, values, {
    headers: {
      authorization: authtoken,
    },
  });
};

export const searchInfluencerAPI = async (authtoken, values) => {
  return await axios.post(`${API}/brand/search-influencers`, values, {
    headers: {
      authorization: authtoken,
    },
  });
};
