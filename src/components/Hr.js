import { View, Text } from "react-native";
import React from "react";
import colors from "../assets/colors";

const Hr = ({ width, height, borderWidth, alignSelf, mv, mr, mb, mt }) => {
  return (
    <View
      style={{
        width,
        height,
        borderColor: colors.black10,
        borderWidth: borderWidth,
        alignSelf: alignSelf || "center",
        marginRight: mr || 0,
        marginBottom: mb || 0,
        marginTop: mt || 0,
        marginVertical: mv || 0,
      }}
    />
  );
};

export default Hr;
