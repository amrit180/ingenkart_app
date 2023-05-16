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
  Button,
  Icon,
  Input,
  Layout,
  SheetEmail,
} from "../../../components";
import { useNavigationState } from "@react-navigation/native";
import { h, w } from "../../../config/utilFunction";

import {
  calender,
  mail,
  notverified,
  radio,
  verified,
} from "../../../container/icons";
import {
  Poppins_600SemiBold,
  useFonts as useFont,
} from "@expo-google-fonts/poppins";
import { useFonts, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { pressMove } from "../../../config/animation";
import { useDispatch, useSelector } from "react-redux";
import {
  setBio,
  setCompanyName,
  setDOB,
  setEmail,
  setError,
  setFirstName,
  setLastName,
  setTagLine,
  setTNC,
} from "../../../redux/authSlice";
import moment from "moment";
import as from "@react-native-async-storage/async-storage";
import { emailVerification } from "../../../functions/auth";
import { mailformat } from "../../../config/Values";
import { HelperText } from "react-native-paper";

const CreateBrandProfile = ({ navigation }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  // const [hide, setHide] = useState(false);
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Poppins_600SemiBold,
  });
  const [fontsLoadeds] = useFont({
    Montserrat_500Medium,
    Poppins_600SemiBold,
  });
  if (!fontsLoaded && fontsLoadeds) return null;
  const buttonRef = useRef(new Animated.Value(0)).current;
  const nsheetRef = useRef(null);
  const SwipeSheet = useCallback(
    async (value) => {
      nsheetRef.current.scrollTo(value);
      nsheetRef.current.timmer();
      if (auth.email !== "")
        await emailVerification(auth?.uuid, auth?.email).catch((err) =>
          console.log(err.response.data)
        );
    },
    [auth.email]
  );
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (auth?.emailVerified) {
      await as.setItem("@auth_user", JSON.stringify(auth));
      navigation.navigate("PersonalInfo");
    } else {
      if (
        auth?.companyName.length < 3 ||
        auth?.tagLine.length < 3 ||
        auth?.bio.length < 10 ||
        !auth?.email.match(mailformat) ||
        !auth?.tnc
      ) {
        dispatch(setError({ error: true }));
      } else {
        dispatch(setError({ error: false }));
        if (auth?.email !== "") SwipeSheet(-h(0.7));
      }
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
            <AuthHeader index={2} progress={0.2} />
            <AppText
              fontFamily={"Poppins_600SemiBold"}
              fontSize={26}
              text="Create your profile"
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
                value={auth?.companyName}
                onChangeText={(t) =>
                  dispatch(setCompanyName({ companyName: t }))
                }
                placeholder="Company Name"
                variant="text"
                mt={h(0.03)}
                mb={auth?.error && auth?.companyName.length < 3 ? 0 : h(0.03)}
                width={0.85}
                fontFamily={"Montserrat_500Medium"}
                fontSize={16}
                maxLength={100}
                textAlign="left"
                error={auth?.error && auth?.companyName.length < 3}
                message="Company Name should be at least 3 characters"
              />
              <Input
                pH={w(0.025)}
                type="outline"
                placeholder="Tag Line"
                value={auth?.tagLine}
                onChangeText={(t) => dispatch(setTagLine({ tagLine: t }))}
                variant="text"
                mb={auth?.error && auth?.tagLine.length < 3 ? 0 : h(0.03)}
                width={0.85}
                fontFamily={"Montserrat_500Medium"}
                fontSize={16}
                maxLength={100}
                textAlign="left"
                error={auth?.error && auth?.tagLine.length < 3}
                message="Tag Line should be at least 3 characters"
              />

              <Input
                pH={w(0.025)}
                type="outline"
                placeholder="Bio"
                multiline={true}
                value={auth?.bio}
                onChangeText={(t) => dispatch(setBio({ bio: t }))}
                variant="text"
                mb={auth?.error && auth?.bio.length < 10 ? 0 : h(0.03)}
                width={0.85}
                height={0.2}
                fontFamily={"Montserrat_500Medium"}
                fontSize={16}
                maxLength={100}
                textAlign="left"
                error={auth?.error && auth?.bio.length < 10}
                message="Bio should be at least 10 characters"
              />

              <Input
                pH={w(0.025)}
                placeholder="Email ID"
                variant="email"
                value={auth?.email}
                onChangeText={(t) => dispatch(setEmail({ email: t }))}
                mb={auth?.error && !auth?.email.match(mailformat) ? 0 : h(0.01)}
                width={0.85}
                fontFamily={"Montserrat_500Medium"}
                fontSize={15}
                maxLength={100}
                textAlign="left"
                icon={
                  auth?.email.length > 5 &&
                  auth?.email.includes("@") &&
                  auth?.email.includes(".")
                    ? auth?.emailVerified
                      ? verified
                      : notverified
                    : mail
                }
                error={auth?.error && !auth?.email.match(mailformat)}
                message="Please enter a valid email id"
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: w(0.05),
                  width: "100%",
                  marginBottom: auth?.error && !auth?.tnc ? 0 : h(0.015),
                }}
              >
                <Pressable
                  onPress={() => dispatch(setTNC({ tnc: !auth?.tnc }))}
                >
                  <Icon name={auth?.tnc ? verified : radio} size={w(0.04)} />
                </Pressable>
                <AppText color={colors.tnc} text="I accept to" ml={w(0.01)} />
                <AppText
                  color={colors.chatBlue}
                  text="Terms & Conditions"
                  ml={w(0.01)}
                  textDecorationLine="underline"
                />
                <AppText color={colors.tnc} text="of ytb." ml={w(0.01)} />
              </View>
              {auth?.error && (
                <HelperText type="error" visible={!auth?.tnc}>
                  Terms & Conditions is required
                </HelperText>
              )}
              <TouchableOpacity
                activeOpacity={0.4}
                onPressIn={() => pressMove(buttonRef)}
                onPressOut={handleSubmit}
                style={{
                  marginTop: auth?.error ? 0 : h(0.03),
                  alignSelf: "center",
                }}
              >
                <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
        <SheetEmail childref={nsheetRef} />
      </GestureHandlerRootView>
    </Layout>
  );
};

export default CreateBrandProfile;
