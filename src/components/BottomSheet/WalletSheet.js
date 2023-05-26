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
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");
const MAX_TRANSALTE_Y = -height / 1.5;

const WalletSheet = ({ childref }) => {
  const translateY = useSharedValue(-height / 1.5);
  const navigation = useNavigation();
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
      if (translateY.value > -height / 1.5) {
        scrollTo(-height / 1.5);
      } else if (translateY.value < -height / 1.5) {
        scrollTo(MAX_TRANSALTE_Y);
      }
    });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
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
      </Animated.View>
    </>
  );
};

export default WalletSheet;
