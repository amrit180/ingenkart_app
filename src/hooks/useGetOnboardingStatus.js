import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function checkIfFirstLaunch() {
  try {
    const hasFirstLaunched = await AsyncStorage.getItem('@user_onboarded');
    if (hasFirstLaunched === null) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

const useGetOnboardingStatus = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [isFirstLaunchIsLoading, setIsFirstLaunchIsLoading] = useState(true);
  const setLaunchPad = async () => {
    const firstLaunch = await checkIfFirstLaunch();
    setIsFirstLaunch(firstLaunch);
    setIsFirstLaunchIsLoading(false);
  };
  useEffect(() => {
    setLaunchPad();
  }, []);

  return {
    isFirstLaunch: isFirstLaunch,
    isLoading: isFirstLaunchIsLoading,
  };
};

export default useGetOnboardingStatus;
