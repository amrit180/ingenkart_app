import {
  useFonts as useFontM,
  Montserrat_500Medium,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import {
  useFonts as useFontP,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_300Light,
} from "@expo-google-fonts/poppins";

import {
  useFonts as useFontI,
  Inter_600SemiBold,
  Inter_500Medium,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

const useCustomFonts = () => {
  let [MLoaded] = useFontM({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });
  let [PLoaded] = useFontP({
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_300Light,
  });
  let [ILoaded] = useFontI({
    Inter_600SemiBold,
    Inter_500Medium,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
  //   check if fonts are loaded or not

  return { MLoaded, PLoaded, ILoaded };
};

export default useCustomFonts;
