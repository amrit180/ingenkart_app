import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import Layout from "../Layout";
import LoaderItem from "./LoaderItem";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { global } from "../../styles";
import Hr from "../Hr";

const HomepageLoader = () => {
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
      <View
        style={[
          global.between,
          {
            height: h(0.073),
            backgroundColor: colors.white,
            paddingHorizontal: w(0.05),
            position: "relative",
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            backgroundColor: colors.white,
            shadowOpacity: 0.03,
            shadowRadius: 1.41,
            borderBottomColor: "rgba(0,0,0,0.07)",
            borderBottomWidth: 0.5,
            zIndex: 1,
          },
        ]}
      >
        <LoaderItem height={h(0.025)} width={w(0.25)} translateX={translateX} />
        <View
          style={[
            global.between,
            {
              width: w(0.33),
            },
          ]}
        >
          <LoaderItem
            height={h(0.03)}
            width={h(0.03)}
            radius={100}
            translateX={translateX}
          />
          <LoaderItem
            height={h(0.03)}
            width={h(0.03)}
            radius={100}
            translateX={translateX}
          />
          <LoaderItem
            height={h(0.045)}
            width={h(0.045)}
            radius={100}
            translateX={translateX}
          />
        </View>
      </View>
      <View
        style={[
          global.start,
          {
            height: h(0.12),
            backgroundColor: colors.white,
            paddingHorizontal: w(0.04),
          },
        ]}
      >
        <LoaderItem
          height={w(0.16)}
          width={w(0.16)}
          radius={100}
          translateX={translateX}
        />
      </View>
      <Hr alignSelf="center" width={"90%"} borderWidth={1.6} />
      <View
        style={{
          marginTop: h(0.03),
          paddingHorizontal: w(0.04),
        }}
      >
        <LoaderItem
          height={h(0.3)}
          width={"100%"}
          radius={20}
          translateX={translateX}
        />
      </View>
      <View
        style={[
          global.between,
          {
            paddingHorizontal: w(0.04),
            marginTop: h(0.03),
          },
        ]}
      >
        <LoaderItem
          height={h(0.3)}
          width={w(0.43)}
          radius={20}
          translateX={translateX}
        />
        <LoaderItem
          height={h(0.3)}
          width={w(0.43)}
          radius={20}
          translateX={translateX}
        />
      </View>
    </Layout>
  );
};

export default HomepageLoader;
