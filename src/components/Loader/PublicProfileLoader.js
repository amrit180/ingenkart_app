import { View, Text, Animated, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import Layout from "../Layout";
import LoaderItem from "./LoaderItem";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { global } from "../../styles";
import Hr from "../Hr";
import { useNavigation } from "@react-navigation/native";
import Icon from "../Icon";
import { backArrow } from "../../container/icons";

const PublicProfileLoader = () => {
  const circleAnimatedValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 345,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 200);
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
        <Pressable onPress={() => navigation.goBack()} style={global.start}>
          <Icon name={backArrow} size={w(0.1)} />
          <LoaderItem
            height={h(0.025)}
            width={w(0.25)}
            translateX={translateX}
          />
        </Pressable>
      </View>
      <LoaderItem height={h(0.125)} width={"100%"} translateX={translateX} />
      <View
        style={{
          alignSelf: "center",
          backgroundColor: colors.white,
          borderRadius: 100,
          width: w(0.25),
          height: w(0.25),
          justifyContent: "center",
          alignItems: "center",
          marginTop: -w(0.12),
        }}
      >
        <LoaderItem
          height={w(0.2)}
          width={w(0.2)}
          translateX={translateX}
          radius={100}
        />
      </View>
      <View style={[global.center]}>
        <View style={[global.center]}>
          <LoaderItem
            height={w(0.07)}
            width={w(0.07)}
            translateX={translateX}
            mr={w(0.01)}
          />
          <LoaderItem height={w(0.07)} width={w(0.2)} translateX={translateX} />
        </View>
        <View style={[global.center, { marginLeft: w(0.01) }]}>
          <LoaderItem
            height={w(0.07)}
            width={w(0.07)}
            translateX={translateX}
            mr={w(0.01)}
          />
          <LoaderItem height={w(0.07)} width={w(0.2)} translateX={translateX} />
        </View>
        <View style={[global.center, { marginLeft: w(0.01) }]}>
          <LoaderItem
            height={w(0.07)}
            width={w(0.07)}
            translateX={translateX}
            mr={w(0.01)}
          />
          <LoaderItem height={w(0.07)} width={w(0.2)} translateX={translateX} />
        </View>
      </View>
      <View style={{ paddingHorizontal: w(0.07), marginTop: h(0.03) }}>
        <LoaderItem height={h(0.125)} width={"100%"} translateX={translateX} />
      </View>
      <View style={{ paddingHorizontal: w(0.07), marginTop: h(0.03) }}>
        <LoaderItem
          height={h(0.07)}
          width={"100%"}
          translateX={translateX}
          radius={15}
        />
      </View>
      <View style={{ paddingHorizontal: w(0.07), marginTop: h(0.03) }}>
        <LoaderItem
          height={h(0.07)}
          width={"100%"}
          translateX={translateX}
          radius={15}
        />
      </View>
    </Layout>
  );
};

export default PublicProfileLoader;
