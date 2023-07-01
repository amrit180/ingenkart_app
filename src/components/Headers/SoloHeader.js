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
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.03,
        shadowRadius: 1.41,
        borderBottomColor: "rgba(0,0,0,0.07)",
        borderBottomWidth: 0.5,
      }}
    >
      <AppText fontFamily={"Poppins_600SemiBold"} fontSize={24} text={title} />
      {/* <Hr alignSelf="center" width={"100%"} borderWidth={1.6} /> */}
    </View>
  );
};

export default SoloHeader;
