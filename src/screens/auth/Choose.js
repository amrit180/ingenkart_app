import React, { useRef } from "react";
import {
  View,
  Animated,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import {
  AuthHeader,
  ChooseImage,
  Button,
  AppText,
  Layout,
} from "../../components";
import AS from "@react-native-async-storage/async-storage";

import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { selectBrand, selectInfluencer } from "../../container/images";
import { moveVertical, pressMove } from "../../config/animation";
import { useDispatch, useSelector } from "react-redux";
import { selectRole } from "../../redux/authSlice";
import { global } from "../../styles";

const Choose = () => {
  const routesLength = useNavigationState((state) => state.routes.length);
  const { auth } = useSelector((state) => ({ ...state }));
  const moveInflu = useRef(
    new Animated.Value(auth?.role === "influencer" ? -20 : 0)
  ).current;
  const moveBrand = useRef(
    new Animated.Value(auth?.role === "brand" ? -20 : 0)
  ).current;
  const buttonRef = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({ Poppins_600SemiBold });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Layout>
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          paddingHorizontal: w(0.08),
        }}
      >
        <AuthHeader index={routesLength} progress={0.3} />
        <AppText
          text="Welcome!"
          fontFamily={"Poppins_600SemiBold"}
          fontSize={24}
        />
        <AppText
          text="Tell us who you are, select your identity."
          fontSize={11}
          color={colors.black70}
        />
        <Pressable
          onPress={() => {
            if (auth?.role === "influencer") {
              dispatch(selectRole({ role: "" }));
              moveVertical({
                name: moveInflu,
                duration: 500,
                pos: 0,
              });
            } else {
              dispatch(selectRole({ role: "influencer" }));
              moveVertical({
                name: moveInflu,
                duration: 500,
                pos: -20,
              });
              moveVertical({
                name: moveBrand,
                duration: 500,
                pos: 0,
              });
            }
          }}
        >
          <ChooseImage
            mt={Platform.OS === "ios" ? h(0.1) : h(0.12)}
            name={selectInfluencer}
            height={0.3}
            width={0.5}
            check={auth?.role === "influencer" ? true : false}
            top={100}
            translate={moveInflu}
            text="Influencer"
          />
        </Pressable>
        <Pressable
          onPress={() => {
            if (auth?.role === "brand") {
              dispatch(selectRole({ role: "" }));
              moveVertical({
                name: moveBrand,
                duration: 500,
                pos: 0,
              });
            } else {
              dispatch(selectRole({ role: "brand" }));
              moveVertical({
                name: moveBrand,
                duration: 500,
                pos: -20,
              });
              moveVertical({
                name: moveInflu,
                duration: 500,
                pos: 0,
              });
            }
          }}
        >
          <ChooseImage
            mt={Platform.OS === "ios" ? h(0.1) : h(0.12)}
            name={selectBrand}
            height={0.3}
            width={0.5}
            check={auth?.role === "brand"}
            top={100}
            translate={moveBrand}
            text="Brand"
          />
        </Pressable>
        <TouchableOpacity
          activeOpacity={0.4}
          onPressIn={() => pressMove(buttonRef)}
          onPressOut={async () => {
            await AS.setItem("@auth_user", JSON.stringify(auth));
            navigation.navigate(
              auth?.role === "brand" ? "BrandAuthStack" : "InfluencerAuthStack"
            );
          }}
          style={{ marginTop: h(0.05), alignSelf: "center" }}
        >
          <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
        </TouchableOpacity>
        <View style={[global.center, { marginTop: h(0.02) }]}>
          <AppText
            fontSize={11}
            text="Already registered?"
            textAlign="center"
          />
          <Pressable onPress={() => navigation.replace("Login")}>
            <AppText
              fontSize={11}
              text=" Login here"
              textAlign="center"
              color={colors.chatBlue}
              textDecorationLine="underline"
            />
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

export default Choose;
