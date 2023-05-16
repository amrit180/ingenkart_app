import { View, Text } from "react-native";
import React from "react";
import AppText from "./AppText";
import { h, w } from "../config/utilFunction";

const Tags = ({ variant, ml, text }) => {
  switch (variant) {
    case "primary":
      return (
        <View
          style={{
            marginLeft: ml || 0,
            backgroundColor: "rgba(255, 99, 99, .1)",
            borderRadius: 100,
            paddingHorizontal: w(0.02),
            height: h(0.022),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText
            text={text}
            fontFamily={"Montserrat_700Bold"}
            fontSize={11}
            color="rgba(255, 99, 99, 1)"
          />
        </View>
      );
    case "disable":
      return (
        <View
          style={{
            marginLeft: ml || 0,
            backgroundColor: "rgba(116, 116, 116, .1)",
            borderRadius: 100,
            paddingHorizontal: w(0.02),
            height: h(0.022),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText
            text={text}
            fontFamily={"Montserrat_700Bold"}
            fontSize={11}
            color="rgba(137, 137, 137, 1)"
          />
        </View>
      );
  }
};

export default Tags;
