import { View, Text, Animated } from "react-native";
import React from "react";

const LoaderItem = ({ translateX, width, height, radius }) => {
  return (
    <View
      style={{
        width: width || 0,
        height: height || 0,
        borderRadius: radius || 0,
        backgroundColor: "#ECEFF1",
        overflow: "hidden",
        //   marginRight: 16,
      }}
    >
      <Animated.View
        style={{
          width: 20,
          opacity: 0.5,
          height: "100%",
          backgroundColor: "white",
          transform: [{ translateX: translateX }],
        }}
      ></Animated.View>
    </View>
  );
};

export default LoaderItem;
