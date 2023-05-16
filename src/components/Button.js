import {
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import BoxShadow from "./BoxShadow";
import Icon from "./Icon";
import { rightArrow } from "../container/icons";
import { h } from "../config/utilFunction";
import AppText from "./AppText";
import colors from "../assets/colors";

import { global } from "../styles";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";

const Button = ({
  variant,
  size,
  buttonRef,
  name,
  width,
  height,
  alignSelf,
  mt,
  onPress,
  isLoading,
  fontSize,
}) => {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;
  switch (variant) {
    case "standard":
      return (
        <View
          style={{
            marginTop: mt,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={onPress}
            style={[
              global.center,
              {
                width,
                height,
                borderRadius: 15,
                alignSelf: alignSelf || "flex-start",
                backgroundColor: colors.black,
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator size={25} color={colors.white} />
            ) : (
              <AppText
                text={name}
                fontFamily={"Poppins_600SemiBold"}
                fontSize={fontSize || 22}
                color={colors.white}
              />
            )}
          </TouchableOpacity>
          <BoxShadow width={width} height={height} top={h(0.005)} radius={15} />
        </View>
      );
    case "round":
      return (
        <View>
          <Animated.View
            style={{
              height: size,
              width: size,
              borderRadius: 500,
              transform: [{ translateY: buttonRef }],
            }}
          >
            <Icon name={name || rightArrow} size={size} />
          </Animated.View>
          <BoxShadow size={size} top={h(0.005)} />
        </View>
      );
    case "outline":
      return (
        <View>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={onPress}
            style={[
              global.center,
              {
                width,
                height,
                borderRadius: 15,
                marginTop: mt,
                alignSelf: alignSelf || "flex-start",
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.black,
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator size={25} color={colors.black} />
            ) : (
              <AppText
                text={name}
                fontFamily={"Poppins_500Medium"}
                fontSize={22}
                color={colors.black}
              />
            )}
          </TouchableOpacity>
          <BoxShadow width={width} height={height} top={h(0.005)} radius={15} />
        </View>
      );
    case "info":
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.4}
          style={[
            global.center,
            {
              backgroundColor: colors.resend,
              width,
              height,
              borderRadius: 23,
              marginTop: mt,
              alignSelf: alignSelf || "flex-start",
            },
          ]}
        >
          <AppText
            text={name}
            fontFamily={"Poppins_500Medium"}
            fontSize={13}
            color={colors.black40}
          />
        </TouchableOpacity>
      );
    case "resend":
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.4}
          style={[
            global.center,
            {
              backgroundColor: colors.resendBlue,
              width,
              height,
              borderRadius: 23,
              marginTop: mt,
              alignSelf: alignSelf || "flex-start",
            },
          ]}
        >
          <AppText
            text={name}
            fontFamily={"Poppins_500Medium"}
            fontSize={13}
            color={colors.white}
          />
        </TouchableOpacity>
      );
  }
};

export default Button;
