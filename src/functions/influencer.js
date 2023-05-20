import axios from "axios";
import { API } from "../config/Values";

export const connectToCampaign = async (authtoken, value) => {
  return await axios.post(`${API}/influencer/connect-to-campaign`, value, {
    headers: {
      authorization: authtoken,
    },
  });
};
export const getAllReels = async (authtoken, page, limit, userId) => {
  return await axios.post(
    `${API}/influencer/get-reels`,
    {
      page,
      limit,
      userId,
    },
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};

export const likeOrUnlikeReels = async (authtoken, reelId, userId, isLiked) => {
  return await axios.post(
    `${API}/influencer/like-reel`,
    {
      reelId,
      userId,
      isLiked,
    },
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};

export const addCommentOnReels = async (reelId, userId, text, authtoken) => {
  return await axios.post(
    `${API}/influencer/comment`,
    {
      reelId,
      userId,
      text,
    },
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};
export const getCommentOnReels = async (reelId, page, limit, authtoken) => {
  return await axios.post(
    `${API}/influencer/get-comments?reelId=${reelId}&page=${page}&limit=${limit}`,
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};

export const getMyCampaigns = async (authtoken, influencerId, page, limit) => {
  return await axios.get(
    `${API}/influencer/my-campaigns?influencerId=${influencerId}&page=${page}&limit=${limit}`,
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};

export const getEditorChoiceAPI = async (authtoken) => {
  return await axios.get(`${API}/influencer/editor-choice-campaigns`, {
    headers: {
      authorization: authtoken,
    },
  });
};
export const getFilterAPI = async (authtoken) => {
  return await axios.get(`${API}/influencer/filter-campaigns`, {
    headers: {
      authorization: authtoken,
    },
  });
};
