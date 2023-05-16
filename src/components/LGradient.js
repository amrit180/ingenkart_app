import { View, Text, Image, Platform } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../assets/colors";

import { checkIcon } from "../container/icons";

const LGradient = ({ children, height, width, radius, check }) => {
  return (
    <LinearGradient
      colors={
        check
          ? [colors.borderYellow, colors.borderYellow]
          : ["rgba(0, 0, 0, 0.02)", colors.black30]
      }
      style={{
        height: height,
        width: width,
        borderRadius: radius,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default LGradient;
