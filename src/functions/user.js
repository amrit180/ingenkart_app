import axios from "axios";
import { API } from "../config/Values";

export const editProfile = async (value, authtoken) => {
  return await axios.patch(`${API}/user/profile`, value, {
    headers: {
      authorization: authtoken,
    },
  });
};

export const searchCampaign = async (authtoken, page, limit, campaignName) => {
  console.log("========HITTING SEARCH ROUTE========", campaignName);
  return await axios.get(
    `${API}/user/search-campaign?page=${page}&limit=${limit}&campaignName=${campaignName} `,
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};

export const getStoryAPI = async (authtoken) => {
  return await axios.get(`${API}/user/story`, {
    headers: {
      authorization: authtoken,
    },
  });
};

export const getTopCreatorAPI = async (authtoken, page, limit) => {
  return await axios.get(
    `${API}/user/top-creators?page=${page}&limit=${limit}`,
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};

export const getProfile = async (authtoken, userId) => {
  return await axios.get(`${API}/user/profile?userId=${userId}`, {
    headers: {
      authorization: authtoken,
    },
  });
};
export const closeChat = async (authtoken, connectionId) => {
  return await axios.post(
    `${API}/brand/close-chat`,
    {
      connectionId,
    },
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};
export const reportChat = async (authtoken, userId, connectionId, reason) => {
  return await axios.post(
    `${API}/user/report-chat`,
    {
      userId,
      connectionId,
      reason,
    },
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};
export const blockChat = async (authtoken, userId, connectionId) => {
  return await axios.post(
    `${API}/user/block-chat`,
    {
      userId,
      connectionId,
    },
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};

export const sendChat = async (value, authtoken) => {
  return await axios.post(`${API}/user/add-message`, value, {
    headers: {
      authorization: authtoken,
    },
  });
};

export const addKycDetails = async (
  fullName,
  currentAddress,
  panNumber,
  userId,
  authtoken
) => {
  return await axios.post(
    `${API}/influencer/add-kyc-details`,
    {
      fullName,
      currentAddress,
      panNumber,
      userId,
    },
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};
export const uploadKycDocuments = async (
  adharDocumentLink,
  panDocumentLink,
  userId,
  authtoken
) => {
  return await axios.post(
    `${API}/influencer/upload-kyc-documents`,
    {
      adharDocumentLink,
      panDocumentLink,
      userId,
    },
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};
export const addKycBankDetails = async (
  bankAccountName,
  accountNumber,
  ifscCode,
  userId,
  authtoken
) => {
  return await axios.post(
    `${API}/influencer/add-kyc-bank-details`,
    {
      bankAccountName,
      accountNumber,
      ifscCode,
      userId,
    },
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};
