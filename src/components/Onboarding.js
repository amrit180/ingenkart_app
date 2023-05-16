import { View, Image, Pressable } from "react-native";
import React from "react";

import { h, w } from "../config/utilFunction";
import AppText from "./AppText";

const Onboarding = ({ image, text, content, index }) => {
  return (
    <View
      style={{
        width: w(1),
        height: "100%",
        paddingHorizontal: w(0.05),
      }}
    >
      <Image
        source={image}
        style={{ width: "100%", height: w(1), marginTop: h(0.04) }}
        resizeMode="contain"
      />
      <AppText
        fontFamily={"Inter_800ExtraBold"}
        fontSize={54}
        text={text}
        textAlign="center"
      />
      <AppText fontSize={15} text={content} textAlign="center" />
    </View>
  );
};

export default Onboarding;
