import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { h, w } from "../../config/utilFunction";

import LoaderItem from "./LoaderItem";

const ReelsLoader = () => {
  const circleAnimatedValue = useRef(new Animated.Value(0)).current;

  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 345,

      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 500);
    });
  };
  useEffect(() => {
    circleAnimated();
  }, []);

  const translateX = circleAnimatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-10, w(0.5), w(1)],
  });
  return (
    <View>
      <LoaderItem height={h(1)} width={"100%"} translateX={translateX} />
    </View>
  );
};

export default ReelsLoader;
