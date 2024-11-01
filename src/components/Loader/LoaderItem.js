import { View, Text, Animated } from "react-native";
import React from "react";

const LoaderItem = ({ translateX, width, height, radius, bg, mr, mt }) => {
  return (
    <View
      style={{
        width: width || 0,
        height: height || 0,
        borderRadius: radius || 0,
        backgroundColor: bg || "#ECEFF1",
        overflow: "hidden",
        marginRight: mr || 0,
        marginTop: mt || 0,
      }}
    >
      <Animated.View
        style={{
          width: 10,
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
