import { View, Text, Animated, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { facebook, instagram, youtube } from "../../container/icons";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import Icon from "../Icon";
import AppText from "../AppText";
import { global } from "../../styles";

const SocialSegment = ({ state, setState }) => {
  const { translateX, active, xTabOne, xTabTwo, xTabThree } = state;
  const handleSlide = (type) => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View
      style={[
        global.evenly,
        {
          backgroundColor: "rgba(243, 243, 243, 1)",
          height: h(0.065),
          marginTop: h(0.03),
          width: "100%",
          borderRadius: 10,
        },
      ]}
    >
      <Animated.View
        style={{
          backgroundColor: colors.white,
          width: w(0.28),
          height: h(0.05),
          borderRadius: 10,
          elevation: 3,
          position: "absolute",

          transform: [
            {
              translateX,
            },
          ],
        }}
      />
      <TouchableOpacity
        onLayout={(e) => {
          setState({ ...state, xTabOne: 0 });
        }}
        onPress={() => {
          setState({
            ...state,
            active: 0,
          });
          handleSlide(xTabOne);
        }}
        style={[global.center, { width: w(0.28) }]}
      >
        <Icon name={instagram} size={w(0.07)} />
        <AppText text="Instagram" fontFamily={"Poppins_500Medium"} />
      </TouchableOpacity>
      <TouchableOpacity
        onLayout={(e) => {
          setState({ ...state, xTabTwo: e.nativeEvent.layout.x });
        }}
        onPress={() => {
          setState({
            ...state,
            active: 1,
          });
          handleSlide(xTabTwo);
        }}
        style={[global.center, { width: w(0.28) }]}
      >
        <Icon name={youtube} size={w(0.07)} />
        <AppText text="Youtube" fontFamily={"Poppins_500Medium"} />
      </TouchableOpacity>
      <TouchableOpacity
        onLayout={(e) => {
          setState({ ...state, xTabThree: e.nativeEvent.layout.x });
        }}
        onPress={() => {
          setState({
            ...state,
            active: 2,
          });
          handleSlide(xTabThree);
        }}
        style={[global.center, { width: w(0.28) }]}
      >
        <Icon name={facebook} size={w(0.07)} />
        <AppText text="Facebook" fontFamily={"Poppins_500Medium"} />
      </TouchableOpacity>
    </View>
  );
};

export default SocialSegment;
