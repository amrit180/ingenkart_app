import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { createUserData } from "../redux/authSlice";

async function checkIfAuth() {
  try {
    const hasUser = await AsyncStorage.getItem("@auth_user");
    if (hasUser === null) {
      return null;
    }
    return hasUser;
  } catch (error) {
    return false;
  }
}

const useGetAuthStatus = () => {
  const dispatch = useDispatch();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const setLaunchPad = async () => {
    const userAuth = await checkIfAuth();
    console.log(userAuth);

    if (userAuth) {
      dispatch(createUserData(JSON.parse(userAuth)));
    }
    setIsAuthLoading(false);
  };
  useEffect(() => {
    setLaunchPad();
  }, []);

  return {
    isAuthLoading: isAuthLoading,
  };
};

export default useGetAuthStatus;
