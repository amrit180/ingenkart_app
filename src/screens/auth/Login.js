import { View, TouchableOpacity, Pressable } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import AppText from "../../components/AppText";
import { global } from "../../styles/global";
import BoxShadow from "../../components/BoxShadow";

import {
  AuthHeader,
  Button,
  Input,
  Layout,
  SheetNumber,
} from "../../components";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPhone } from "../../redux/authSlice";
import { pressMove } from "../../config/animation";
import { checkPhoneNumber, phoneVerification } from "../../functions/auth";
import { HelperText } from "react-native-paper";
import { notverified, verified } from "../../container/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();
  const nsheetRef = useRef(null);
  const routesLength = useNavigationState((state) => state.routes.length);
  const [number, setNumber] = useState("");
  const [numberFound, setNumberFound] = useState(false);

  const buttonRef = useRef(new Animated.Value(0)).current;
  let dispatch = useDispatch();
  const { auth } = useSelector((s) => ({ ...s }));
  const handleSubmit = async () => {
    const res = await checkPhoneNumber(auth?.phone);
    if (routesLength == 1) {
      if (!res) {
        dispatch(setError({ error: true }));
        setNumberFound(false);
      } else {
        setNumberFound(true);
        const resp = await phoneVerification(auth?.uuid, auth?.phone).catch(
          (err) => console.log(err.response.data)
        );
        // console.log(resp.data);
        if (resp.data.success) {
          SwipeSheet(-h(0.75));
        }
      }
    } else {
      if (auth?.phoneVerified) {
        await AsyncStorage.setItem("@auth_user", JSON.stringify(auth));
        navigation.replace(
          auth?.role === "brand" ? "BrandStack" : "InfluencerStack"
        );
      } else {
        if (res) {
          dispatch(setError({ error: true }));
          setNumberFound(true);
        } else {
          setNumberFound(false);
          const resp = await phoneVerification(auth?.uuid, auth?.phone).catch(
            (err) => console.log(err.response.data)
          );
          // console.log(resp.data);
          if (resp.data.success) {
            SwipeSheet(-h(0.75));
          }
        }
      }
    }
  };

  const SwipeSheet = useCallback((value) => {
    nsheetRef.current.scrollTo(value);
    nsheetRef.current.timmer();
  }, []);

  const handleNumberChange = (value) => {
    setNumber(formatPhoneNumber(value));
  };
  const formatPhoneNumber = (text) => {
    // Remove all non-numeric characters from the input string
    const cleaned = text.replace(/\D/g, "");

    // Split the cleaned string into groups of 3 digits each
    const groups = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    // If the input string matches the expected pattern, join the groups with spaces
    if (groups) {
      return [groups[1], groups[2], groups[3]]
        .filter((group) => !!group)
        .join(" ");
    }

    // If the input string doesn't match the pattern, return the original input
    return text;
  };

  return (
    <Layout>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
            paddingHorizontal: w(0.08),
          }}
        >
          <AuthHeader index={routesLength} progress={0.8} />
          <AppText
            fontSize={26}
            fontFamily={"Poppins_600SemiBold"}
            text={routesLength > 1 ? "Enter phone number" : "Login"}
            mt={h(0.025)}
          />
          <AppText
            fontSize={13}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            color={colors.black50}
            mt={h(0.01)}
          />
          <View style={[{ marginTop: h(0.05) }, global.between]}>
            <View
              style={{
                width: w(0.14),
                borderRadius: 15,
                height: w(0.14),
                backgroundColor: colors.black,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppText
                fontFamily={"Montserrat_500Medium"}
                fontSize={15}
                color={colors.white}
                text="+91"
              />
              <BoxShadow size={w(0.14)} radius={15} top={h(0.005)} />
            </View>

            <Input
              value={number}
              onChangeText={(t) => {
                handleNumberChange(t);
                dispatch(setPhone({ phone: t.replace(/\s/g, "") }));
              }}
              maxLength={12}
              variant="number"
              width={0.68}
              placeholder="000 000 0000"
              fontFamily={"Montserrat_500Medium"}
              fontSize={17}
              textAlign="auto"
              pH={w(0.03)}
              icon={
                routesLength > 1
                  ? number?.length > 1
                    ? auth?.phoneVerified
                      ? verified
                      : notverified
                    : null
                  : null
              }
              onPress={() => {
                if (!auth?.phoneVerified) {
                  dispatch(setPhone({ phone: "" }));
                  setNumber("");
                }
              }}
            />
          </View>
          {auth?.error ? (
            auth?.phone?.length !== 10 ? (
              <HelperText type="error" visible={auth?.error}>
                Invalid Phone Number
              </HelperText>
            ) : numberFound ? (
              <HelperText type="error" visible={auth?.error}>
                Number is already registered
              </HelperText>
            ) : (
              <HelperText type="error" visible={auth?.error}>
                Number is not a registered phone number
              </HelperText>
            )
          ) : null}

          <View style={global.center}>
            <AppText
              text="By proceeding, I agree to all "
              fontFamily={"Montserrat_400Regular"}
              fontSize={12}
              mt={h(0.02)}
              color={colors.tnc}
              textAlign="center"
            />
            <AppText
              text="T&C "
              fontFamily={"Montserrat_400Regular"}
              fontSize={12}
              mt={h(0.02)}
              textAlign="center"
              textDecorationLine="underline"
              color={colors.chatBlue}
            />
            <AppText
              text="and "
              fontFamily={"Montserrat_400Regular"}
              fontSize={12}
              mt={h(0.02)}
              textAlign="center"
              color={colors.tnc}
            />
            <AppText
              text="Privacy Policy "
              fontFamily={"Montserrat_400Regular"}
              fontSize={12}
              mt={h(0.02)}
              textAlign="center"
              textDecorationLine="underline"
              color={colors.chatBlue}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.4}
            onPressIn={() => pressMove(buttonRef)}
            onPressOut={handleSubmit}
            style={{ marginTop: h(0.3), alignSelf: "center" }}
          >
            <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
          </TouchableOpacity>
          {routesLength == 1 && (
            <View style={[global.center, { marginTop: h(0.05) }]}>
              <AppText fontSize={13} text="New User?" textAlign="center" />
              <Pressable
                onPress={() => {
                  dispatch(setError({ error: false }));
                  navigation.replace("Choose");
                }}
              >
                <AppText
                  fontSize={13}
                  text=" Sign Up here"
                  textAlign="center"
                  color={colors.chatBlue}
                  textDecorationLine="underline"
                />
              </Pressable>
            </View>
          )}
          {/* <Text>{JSON.stringify(auth?.phone)}</Text> */}
        </View>
        <SheetNumber
          childref={nsheetRef}
          number={auth?.phone}
          routesLength={routesLength}
        />
      </GestureHandlerRootView>
    </Layout>
  );
};

export default Login;