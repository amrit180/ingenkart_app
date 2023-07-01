import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import Layout from "../Layout";
import LoaderItem from "./LoaderItem";
import { h, w } from "../../config/utilFunction";
import { global } from "../../styles";

const SingleCampaignLoader = () => {
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
      }, 1000);
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
    <Layout>
      <LoaderItem height={h(0.27)} width={"100%"} translateX={translateX} />
      <View
        style={[
          global.start,
          { marginTop: h(0.02), paddingHorizontal: w(0.05) },
        ]}
      >
        <LoaderItem
          height={w(0.14)}
          width={w(0.14)}
          radius={13}
          translateX={translateX}
          mr={w(0.03)}
        />
        <LoaderItem
          height={w(0.12)}
          width={"70%"}
          radius={5}
          translateX={translateX}
        />
      </View>
      <View
        style={[
          global.start,
          { marginTop: h(0.02), paddingHorizontal: w(0.05) },
        ]}
      >
        <LoaderItem
          height={w(0.2)}
          width={"100%"}
          radius={5}
          translateX={translateX}
        />
      </View>
      <View
        style={[
          global.start,
          { marginTop: h(0.02), paddingHorizontal: w(0.05) },
        ]}
      >
        <LoaderItem
          height={w(0.15)}
          width={"100%"}
          radius={5}
          translateX={translateX}
        />
      </View>
    </Layout>
  );
};

export default SingleCampaignLoader;
