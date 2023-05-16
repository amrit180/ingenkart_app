import axios from "axios";
import { API } from "../config/Values";

export const getCampaign = async (
  authtoken,
  page,
  limit,
  role,
  userId,
  categories
) => {
  // console.log("MY CATEGORIES FROM AXIOS", categories);
  return await axios.post(
    `${API}/user/get-campaigns`,
    {
      page,
      limit,
      role,
      userId,
      categories,
    },
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};

export const getCampaignInfo = async (authtoken, campaignId) => {
  return await axios.get(
    `${API}/user/get-campaign-info?campaignId=${campaignId}`,
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};
