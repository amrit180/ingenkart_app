import { View, Text } from "react-native";
import React from "react";
import { fs } from "../config/utilFunction";
import colors from "../assets/colors";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

const AppText = ({
  text,
  fontFamily,
  fontSize,
  color,
  textAlign,
  textDecorationLine,
  ml,
  mr,
  mt,
  mb,
  top,
  width,
  position,
  bottom,
  right,
  left,
  ls,
}) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Text
      adjustsFontSizeToFit={true}
      style={{
        fontFamily: fontFamily || "Poppins_400Regular",
        fontSize: fs(fontSize) || fs(14),
        color: color || colors.black,
        textAlign: textAlign || "auto",
        position: position || "relative",
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        textDecorationLine: textDecorationLine || "none",
        marginLeft: ml || 0,
        marginTop: mt || 0,
        marginRight: mr || 0,
        marginBottom: mb || 0,
        width: width,
        letterSpacing: ls || -0.3333,
      }}
    >
      {text}
    </Text>
  );
};

export default AppText;
