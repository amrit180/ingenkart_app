import { View, Text, Image, Animated } from "react-native";
import React from "react";
import { h, w } from "../config/utilFunction";
import LGradient from "./LGradient";
import colors from "../assets/colors";
import AppText from "./AppText";

import BoxShadow from "./BoxShadow";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { checkIcon } from "../container/icons";

const ChooseImage = ({
  name,
  bwidth,
  bheight,
  iwidth,
  iheight,
  height,
  width,
  check,
  top,
  text,
  translate,
  scaleRef,
  mt,
  txtcolor,
  ft,
  txttop,
  radius,
}) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: w(bwidth) || w(0.6),
        height: h(bheight) || h(0.2),
        alignSelf: "center",
        marginTop: mt || 0,
        position: "relative",
        overflow: "visible",
      }}
    >
      <BoxShadow
        height={h(bheight) || h(0.2)}
        width={w(bwidth) || w(0.6)}
        radius={radius || 22}
        top={h(0.005)}
      />
      <LGradient
        height={h(bheight) || h(0.2)}
        width={w(bwidth) || w(0.6)}
        radius={radius || 22}
        check={check}
      >
        <View
          style={{
            width: w(iwidth) || w(0.59),
            height: h(iheight) || h(0.195),
            borderRadius: radius || 22,
            backgroundColor: colors.white,
            justifyContent: "flex-end",
            paddingBottom: h(0.02),
            alignItems: "center",
            position: "relative",
          }}
        >
          <AppText
            text={text}
            fontFamily={txtcolor ? "Poppins_400Regular" : "Poppins_600SemiBold"}
            color={txtcolor}
            fontSize={ft || 14}
            top={txttop}
          />
        </View>
      </LGradient>
      {check && (
        <Image
          source={checkIcon}
          style={{
            width: 20,
            height: 20,
            position: "absolute",
            bottom: 0,
            right: 0,
            resizeMode: "contain",
          }}
        />
      )}
      {scaleRef ? (
        <Animated.Image
          source={name}
          style={{
            height: h(height),

            width: w(width),
            position: "absolute",
            top: -top || 0,
            transform: [
              {
                translateY: translate || 0,
              },
              {
                scaleY:
                  scaleRef.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  }) || 0,
              },
              {
                scaleX:
                  scaleRef.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  }) || 0,
              },
            ],
          }}
          resizeMode="contain"
        />
      ) : (
        <Animated.Image
          source={name}
          style={{
            height: h(height),
            width: w(width),
            position: "absolute",
            top: -top || 0,
            transform: [
              {
                translateY: translate || 0,
              },
            ],
          }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default ChooseImage;
