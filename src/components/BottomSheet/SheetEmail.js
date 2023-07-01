import {
  View,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import colors from "../../assets/colors";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { h, w } from "../../config/utilFunction";
import AppText from "../AppText";

import { global } from "../../styles";

import Button from "../Button";
import { useCoundownTimmer } from "../../hooks";
import Input from "../Input";
import {
  emailVerification,
  verifyMailOtp,
  verifyNumberOtp,
} from "../../functions/auth";
import { useDispatch, useSelector } from "react-redux";
import { setEmailVerified } from "../../redux/authSlice";
import { HelperText } from "react-native-paper";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");
const MAX_TRANSALTE_Y = -height / 1.2;

const SheetEmail = ({ childref }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const translateY = useSharedValue(0);
  const [loading, setLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { time, timmer } = useCoundownTimmer();
  const transY = useSharedValue(0);
  const scrollTo = useCallback((destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
    transY.value = destination;
  }, []);

  childref.current = {
    scrollTo: scrollTo,
    timmer: timmer,
  };

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSALTE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -height / 2) {
        scrollTo(0);
      } else if (translateY.value < -height / 2) {
        scrollTo(MAX_TRANSALTE_Y);
      }
    });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  const rBottomSheetBackground = useAnimatedStyle(() => {
    return {
      top: Math.abs(translateY.value) < 200 ? height : 0,
    };
  });

  const pin1ref = useRef();
  const pin2ref = useRef();
  const pin3ref = useRef();
  const pin4ref = useRef();
  const pin5ref = useRef();
  const pin6ref = useRef();
  const maxLength = 6;

  const [otp, setOtp] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });
  const { pin1, pin2, pin3, pin4, pin5, pin6 } = otp;

  const verifyOtp = async () => {
    setLoading(true);
    let totalOtp = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
    await verifyNumberOtp(auth?.uuid, totalOtp)
      .then((res) => {
        dispatch(setEmailVerified({ emailVerified: true }));
        setOtp({ pin1: "", pin2: "", pin3: "", pin4: "", pin5: "", pin6: "" });
        console.log("done otp check");
        setLoading(false);
        setError(false);
        scrollTo(0);
      })
      .catch((err) => {
        if (err.response.data.success == false) {
          setLoading(false);
          setOtp({
            pin1: "",
            pin2: "",
            pin3: "",
            pin4: "",
            pin5: "",
            pin6: "",
          });
          setError(true);
        }
      });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <>
      <GestureDetector gesture={gesture}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Animated.View
            style={[
              {
                position: "absolute",
                height: height,
                width: "100%",
                backgroundColor: colors.white,
                top: height,
                borderRadius: 30,

                paddingHorizontal: w(0.075),
                zIndex: 100,
              },
              rBottomSheetStyle,
            ]}
          >
            <View
              style={{
                width: w(0.13),
                height: 5,
                backgroundColor: colors.black50,
                alignSelf: "center",
                marginVertical: 15,
                borderRadius: 13,
              }}
            />
            <AppText
              fontFamily={"Poppins_600SemiBold"}
              fontSize={24}
              text="Verify your Email"
              mt={h(0.01)}
            />
            <AppText
              mt={h(0.01)}
              color={colors.black50}
              fontSize={11}
              text={`An OTP was send to ${auth?.email} please enter correct otp to continue.`}
            />

            <View style={{ flexDirection: "row", marginTop: h(0.05) }}>
              <Input
                onFocus={
                  translateY.value < 0 && isKeyboardVisible
                    ? scrollTo(-h(0.9))
                    : null
                }
                refValue={pin1ref}
                variant="number"
                ml={w(0.02)}
                value={pin1}
                onChangeText={(t) => {
                  setOtp({ ...otp, pin1: t });
                  t !== "" && pin2ref?.current?.focus();
                }}
              />
              <Input
                onFocus={
                  translateY.value < 0 && isKeyboardVisible
                    ? scrollTo(-h(0.9))
                    : null
                }
                ml={w(0.02)}
                value={pin2}
                variant="number"
                refValue={pin2ref}
                onChangeText={(t) => {
                  setOtp({ ...otp, pin2: t });
                  t !== ""
                    ? pin3ref?.current?.focus()
                    : pin1ref?.current?.focus();
                }}
              />
              <Input
                onFocus={
                  translateY.value < 0 && isKeyboardVisible
                    ? scrollTo(-h(0.9))
                    : null
                }
                ml={w(0.02)}
                value={pin3}
                variant="number"
                refValue={pin3ref}
                onChangeText={(t) => {
                  setOtp({ ...otp, pin3: t });
                  t !== ""
                    ? pin4ref?.current?.focus()
                    : pin2ref?.current?.focus();
                }}
              />
              <Input
                onFocus={
                  translateY.value < 0 && isKeyboardVisible
                    ? scrollTo(-h(0.9))
                    : null
                }
                ml={w(0.04)}
                value={pin4}
                variant="number"
                refValue={pin4ref}
                onChangeText={(t) => {
                  setOtp({ ...otp, pin4: t });
                  t !== ""
                    ? pin5ref?.current?.focus()
                    : pin3ref?.current?.focus();
                }}
              />
              <Input
                onFocus={
                  translateY.value < 0 && isKeyboardVisible
                    ? scrollTo(-h(0.9))
                    : null
                }
                ml={w(0.02)}
                value={pin5}
                variant="number"
                refValue={pin5ref}
                onChangeText={(t) => {
                  setOtp({ ...otp, pin5: t });
                  t !== ""
                    ? pin6ref?.current?.focus()
                    : pin4ref?.current?.focus();
                }}
              />
              <Input
                onFocus={
                  translateY.value < 0 && isKeyboardVisible
                    ? scrollTo(-h(0.9))
                    : null
                }
                ml={w(0.02)}
                value={pin6}
                variant="number"
                refValue={pin6ref}
                onChangeText={(t) => {
                  setOtp({ ...otp, pin6: t });
                  t !== "" ? Keyboard.dismiss() : pin5ref?.current?.focus();
                }}
              />
            </View>
            {error && (
              <HelperText type="error" visible={error}>
                Otp is incorrect or invalid
              </HelperText>
            )}
            <AppText
              text="Didn't receive the code?"
              textAlign="center"
              mt={h(0.05)}
            />
            {time == 0 ? (
              <Button
                onPress={async () => {
                  timmer();
                  await emailVerification(auth?.uuid, auth?.email).catch(
                    (err) => console.log(err.response.data)
                  );
                }}
                width={w(0.2)}
                height={h(0.04)}
                name="Resend"
                variant="resend"
                mt={h(0.03)}
                alignSelf="center"
              />
            ) : (
              <Button
                width={w(0.3)}
                height={h(0.04)}
                name={`Resend in ${time}s`}
                variant="info"
                mt={h(0.03)}
                alignSelf="center"
              />
            )}
            <Button
              onPress={() => verifyOtp()}
              variant="standard"
              height={h(0.07)}
              width={"100%"}
              mt={h(0.05)}
              name="Verify"
              isLoading={loading}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </GestureDetector>
      <TouchableWithoutFeedback onPress={() => scrollTo(0)}>
        <Animated.View
          style={[
            {
              backgroundColor: colors.overlay,
              zIndex: 10,
              height,
              width: "100%",
              position: "absolute",
            },
            rBottomSheetBackground,
          ]}
        />
      </TouchableWithoutFeedback>
    </>
  );
};

export default SheetEmail;
