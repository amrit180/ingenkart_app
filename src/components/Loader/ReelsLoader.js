import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { h, w } from "../../config/utilFunction";

import LoaderItem from "./LoaderItem";
import colors from "../../assets/colors";
import { global } from "../../styles";

const ReelsLoader = () => {
  const circleAnimatedValue = useRef(new Animated.Value(0)).current;

  const circleAnimated = () => {
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 345,

      useNativeDriver: true,
    }).start(() => {
      Animated.timing(circleAnimatedValue, {
        toValue: 0,
        duration: 345,

        useNativeDriver: true,
      }).start(() => {
        circleAnimated();
      });
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
    <>
      <Animated.View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: colors.black40,
          opacity: circleAnimatedValue,
        }}
      >
        <View
          style={[
            global.start,
            {
              position: "absolute",
              bottom: h(0.1),
              paddingHorizontal: w(0.05),
            },
          ]}
        >
          <LoaderItem
            height={50}
            width={50}
            radius={100}
            translateX={translateX}
            mr={w(0.02)}
          />
          <View>
            <LoaderItem
              height={10}
              width={100}
              radius={100}
              translateX={translateX}
            />
            <LoaderItem
              height={10}
              width={50}
              radius={100}
              translateX={translateX}
              mt={h(0.01)}
            />
          </View>
        </View>
      </Animated.View>
      <View
        style={[
          {
            position: "absolute",
            bottom: h(0.1),
            right: 0,
            paddingHorizontal: w(0.05),
          },
        ]}
      >
        <LoaderItem
          height={30}
          width={30}
          radius={10}
          translateX={translateX}
          mt={h(0.01)}
        />
        <View>
          <LoaderItem
            height={30}
            width={30}
            radius={10}
            mt={h(0.01)}
            translateX={translateX}
          />
          <LoaderItem
            height={30}
            width={30}
            radius={10}
            translateX={translateX}
            mt={h(0.01)}
          />
        </View>
      </View>
    </>
  );
};

export default ReelsLoader;
