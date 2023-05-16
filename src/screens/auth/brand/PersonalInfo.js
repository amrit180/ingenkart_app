import {
  View,
  Pressable,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import colors from "../../../assets/colors";
import {
  AppText,
  AuthHeader,
  BoxShadow,
  Button,
  Icon,
  Input,
  Layout,
  SheetEmail,
} from "../../../components";
import { useNavigationState } from "@react-navigation/native";
import { h, w } from "../../../config/utilFunction";

import {
  useFonts as useFont,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

import { pressMove } from "../../../config/animation";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setInstagramUrl,
  setLinkedinUrl,
  setLocation,
  setWebsite,
} from "../../../redux/authSlice";
import moment from "moment";
import as from "@react-native-async-storage/async-storage";

import { urlFormat } from "../../../config/Values";
import { global } from "../../../styles";
import { locationblack } from "../../../container/icons";

const PersonalInfo = ({ navigation }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  // const [hide, setHide] = useState(false);
  const [fontsLoaded] = useFont({
    Montserrat_500Medium,
  });
  const [fontsLoadeds] = useFonts({
    Poppins_600SemiBold,
  });
  const buttonRef = useRef(new Animated.Value(0)).current;
  const nsheetRef = useRef(null);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (
      !auth?.website?.match(urlFormat) ||
      !auth?.instagramUrl?.match(urlFormat) ||
      !auth?.linkedinUrl?.match(urlFormat) ||
      auth?.state == "" ||
      auth?.city == ""
    ) {
      dispatch(setError({ error: true }));
    } else {
      dispatch(setError({ error: false }));
      await as.setItem("@auth_user", JSON.stringify(auth));
      navigation.navigate("LogoUpload");
    }
  };

  return (
    <Layout>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: colors.white }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              backgroundColor: colors.white,
              flex: 1,
              paddingHorizontal: w(0.075),
            }}
          >
            <AuthHeader index={2} progress={0.4} />
            <AppText
              fontFamily={"Poppins_600SemiBold"}
              fontSize={26}
              text="Personal info"
              mt={h(0.025)}
            />
            <AppText
              fontSize={13}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              color={colors.black50}
              mt={h(0.01)}
            />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: h(0.05) }}
            >
              <Input
                type="outline"
                pH={w(0.025)}
                value={auth?.website}
                onChangeText={(t) =>
                  dispatch(
                    setWebsite({
                      website: t,
                    })
                  )
                }
                placeholder="Website"
                variant="text"
                mt={h(0.03)}
                mb={
                  auth?.error && !auth?.website?.match(urlFormat) ? 0 : h(0.03)
                }
                width={0.85}
                fontFamily={"Montserrat_500Medium"}
                fontSize={16}
                maxLength={100}
                textAlign="left"
                error={auth?.error && !auth?.website?.match(urlFormat)}
                message="Website should be at correct url format"
              />
              <Input
                pH={w(0.025)}
                type="outline"
                placeholder="Instagram URL"
                value={auth?.instagramUrl}
                onChangeText={(t) =>
                  dispatch(setInstagramUrl({ instagramUrl: t }))
                }
                variant="text"
                mb={
                  auth?.error && !auth?.instagramUrl?.match(urlFormat)
                    ? 0
                    : h(0.03)
                }
                width={0.85}
                fontFamily={"Montserrat_500Medium"}
                fontSize={16}
                maxLength={100}
                textAlign="left"
                error={auth?.error && !auth?.instagramUrl?.match(urlFormat)}
                message="Instagram URL should be at correct url format"
              />
              <Input
                pH={w(0.025)}
                type="outline"
                placeholder="Linkedin URL"
                value={auth?.linkedinUrl}
                onChangeText={(t) =>
                  dispatch(setLinkedinUrl({ linkedinUrl: t }))
                }
                variant="text"
                mb={
                  auth?.error && !auth?.linkedinUrl?.match(urlFormat)
                    ? 0
                    : h(0.03)
                }
                width={0.85}
                fontFamily={"Montserrat_500Medium"}
                fontSize={16}
                maxLength={100}
                textAlign="left"
                error={auth?.error && !auth?.linkedinUrl?.match(urlFormat)}
                message="Linkedin URL should be at correct url format"
              />

              <View style={{ position: "relative" }}>
                <BoxShadow
                  width={"100%"}
                  height={h(0.07)}
                  radius={15}
                  top={h(0.003)}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("Location")}
                  style={[
                    global.between,
                    {
                      minHeight: h(0.07),
                      width: "100%",
                      borderRadius: 15,
                      position: "relative",
                      borderColor: colors.black30,
                      borderWidth: 1,
                      paddingHorizontal: w(0.07),
                      backgroundColor: colors.white,
                    },
                  ]}
                >
                  {auth?.state !== "" && auth?.city !== "" && (
                    <View
                      style={{
                        backgroundColor: colors.white,
                        position: "absolute",
                        top: -h(0.01),
                        left: w(0.03),
                        paddingHorizontal: w(0.01),
                      }}
                    >
                      <AppText
                        textAlign={"center"}
                        text="Location"
                        fontFamily={"Montserrat_500Medium"}
                        fontSize={12}
                        color={colors.black}
                      />
                    </View>
                  )}
                  <AppText
                    text={`${
                      auth?.state === "" && auth?.city === ""
                        ? "Location"
                        : auth?.state + ", " + auth?.city
                    }`}
                    fontFamily={"Montserrat_500Medium"}
                    fontSize={15}
                  />

                  <Icon name={locationblack} size={w(0.05)} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.4}
                onPressIn={() => pressMove(buttonRef)}
                onPressOut={handleSubmit}
                style={{
                  marginTop: auth?.error ? h(0.03) : h(0.03),
                  alignSelf: "center",
                }}
              >
                <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </Layout>
  );
};

export default PersonalInfo;
