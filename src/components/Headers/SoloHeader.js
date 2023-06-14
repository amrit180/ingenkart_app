import { View, Text } from "react-native";
import React from "react";
import AppText from "../AppText";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import Hr from "../Hr";

const SoloHeader = ({ title }) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        paddingHorizontal: w(0.05),
        paddingVertical: h(0.01),
        elevation: 1,
      }}
    >
      <AppText fontFamily={"Poppins_600SemiBold"} fontSize={26} text={title} />
      {/* <Hr alignSelf="center" width={"100%"} borderWidth={0.5} /> */}
    </View>
  );
};

export default SoloHeader;
