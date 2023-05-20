import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import colors from "../../assets/colors";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { fs, h, w } from "../../config/utilFunction";
import { useSelector } from "react-redux";

import AppText from "../AppText";
import Icon from "../Icon";
import { blackadd } from "../../container/icons";
import WalletBox from "../Box/WalletBox";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");
const MAX_TRANSALTE_Y = -h(0.8);

const WalletSheet = ({ childref }) => {
  const translateY = useSharedValue(-height / 1.3);

  const user = useSelector((state) => state.user);
  const transY = useRef(0);
  const scrollTo = useCallback((destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
    transY.value = destination;
  }, []);

  childref.current = {
    scrollTo: scrollTo,
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
      if (translateY.value > -height / 1.3) {
        scrollTo(-height / 1.3);
      } else if (translateY.value < -height / 1.3) {
        scrollTo(MAX_TRANSALTE_Y);
      }
    });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const rBottomSheetView = useAnimatedStyle(() => {
    // console.log(translateY.value);
    return {
      display: translateY.value > -760 ? "flex" : "none",
    };
  });

  return (
    <>
      <GestureDetector gesture={gesture}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              {
                position: "absolute",
                height: h(0.05),
                width: "100%",
                backgroundColor: colors.white,
                top: height,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingHorizontal: w(0.05),
                zIndex: 100,
              },
              rBottomSheetStyle,
            ]}
          >
            <View
              style={{
                width: w(0.17),
                height: 5,
                backgroundColor: colors.black50,
                alignSelf: "center",
                marginVertical: 15,
                borderRadius: 13,
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </GestureDetector>
      <Animated.View
        style={[
          {
            position: "absolute",

            height: height,
            width: "100%",
            backgroundColor: colors.white,
            top: height + h(0.049),

            paddingHorizontal: w(0.05),
            zIndex: 100,
          },
          rBottomSheetStyle,
        ]}
      >
        <WalletBox />
        <ScrollView>
          <Pressable>
            <Text>{JSON.stringify(user, null, 4)}</Text>
          </Pressable>
        </ScrollView>
      </Animated.View>

      <Animated.View
        style={[
          {
            width: "100%",
            height: h(0.25),
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: w(0.05),
            alignItems: "center",
          },
        ]}
      >
        <Animated.Text
          style={[
            {
              color: colors.black,
              fontSize: fs(30),
              fontFamily: "Poppins_600SemiBold",
            },
          ]}
        >
          <AppText text={"₹"} />
          {user?.credits}
        </Animated.Text>
        <TouchableOpacity
          style={{
            height: h(0.04),
            width: w(0.45),
            backgroundColor: colors.white,
            borderRadius: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: w(0.02),
          }}
        >
          <Icon name={blackadd} size={w(0.05)} />
          <AppText text="Add a withdrwal method" fontSize={11} />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default WalletSheet;
