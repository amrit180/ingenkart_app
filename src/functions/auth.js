import axios from "axios";
import { API } from "../config/Values";

export const emailVerification = async (uuid, email) => {
  return await axios.post(
    `${API}/auth/send-mail-verification-otp`,
    {
      uuid,
      email,
    },
    {}
  );
};
export const phoneVerification = async (uuid, phone) => {
  return await axios.post(
    `${API}/auth/send-phone-verification-otp`,
    {
      uuid,
      phone,
    },
    {}
  );
};

export const verifyNumberOtp = async (uuid, otp, phone) => {
  return await axios.post(`${API}/auth/verify-otp`, {
    uuid,
    otp,
    phone,
  });
};

export const createOrUpdateUser = async (values, authtoken) => {
  // console.log(authtoken);
  return await axios.post(`${API}/auth/create-or-update-user`, values, {
    headers: {
      authorization: authtoken,
    },
  });
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${API}/auth/current-user-phone`,
    {},
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};
export const checkPhoneNumber = async (number) => {
  const { data } = await axios.post(
    `${API}/auth/check-existing-phone`,
    {
      phone: number,
    },
    {}
  );
  return data.isExisting;
};

export const getCategories = async () => {
  const { data } = await axios.get(`${API}/admin/category`);
  return data;
};

export const getAccessToken = async (userId, code, authtoken) => {
  return await axios.get(
    `${API}/auth/insta-access-token?userId=${userId}&code=${code}`,
    {
      headers: {
        authorization: authtoken,
      },
    }
  );
};
