import "react-native-gesture-handler";

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack, OnboardStack } from "./src/routes";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { CustomStatusBar, Error } from "./src/components";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { db, firebaseAuth } from "./firebase";
import * as Updates from "expo-updates";
import {
  useBookmark,
  useCustomFonts,
  useGetAuthStatus,
  useGetOnboardingStatus,
} from "./src/hooks";
import {
  getAsyncUser,
  noUser,
  setNewNotification,
  setNotifications,
} from "./src/redux/userSlice";
import { setToken } from "./src/redux/authToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageIdentifier } from "./src/config/AsyncStorageIdentifier";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { mode } from "./src/config/Values";

const App = () => {
  const MyApp = () => {
    const { isFirstLaunch, isLoading } = useGetOnboardingStatus();
    const { err } = useSelector((s) => ({ ...s }));
    const { isAuthLoading } = useGetAuthStatus();
    const { getbookmark } = useBookmark();
    const { ILoaded, MLoaded, PLoaded } = useCustomFonts();
    const dispatch = useDispatch();
    const { user } = useSelector((s) => ({ ...s }));

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          const idToken = await user?.getIdTokenResult();
          console.log(idToken?.token, "App.js");
          dispatch(getAsyncUser(idToken?.token));
          getbookmark();

          dispatch(setToken({ token: idToken?.token }));
        } else {
          dispatch(noUser());
        }
      });
      return () => unsubscribe();
    }, [dispatch]);
    useEffect(() => {
      if (mode === "PROD") {
        onFetchUpdateAsync();
      }
    }, []);

    if (!MLoaded && !PLoaded && !ILoaded && isLoading) {
      return null;
    }
    return (
      <NavigationContainer>
        {isFirstLaunch ? <OnboardStack /> : <AuthStack />}
        {err.error && <Error text={err.message} />}
        <StatusBar backgroundColor="white" style={"dark"} translucent={false} />
      </NavigationContainer>
    );
  };

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  }
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
};
export default App;
