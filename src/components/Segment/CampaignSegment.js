import { View, Text, Animated, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { facebook, instagram, youtube } from "../../container/icons";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import Icon from "../Icon";
import AppText from "../AppText";
import { global } from "../../styles";

const CampaignSegment = ({ state, setState }) => {
  const { translateX, active, xTabOne, xTabTwo, xTabThree } = state;
  const handleSlide = (type) => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View
      style={[
        global.evenly,
        {
          height: h(0.065),

          marginTop: h(0.03),
          width: "80%",
          alignSelf: "center",
          backgroundColor: "rgba(243, 243, 243, 1)",
          borderRadius: 10,
          paddingHorizontal: w(0.02),
        },
      ]}
    >
      <View
        style={[
          global.evenly,
          {
            height: h(0.065),
            // marginTop: h(0.03),
            width: "100%",
            alignSelf: "center",
          },
        ]}
      >
        <Animated.View
          style={{
            backgroundColor: colors.white,
            width: w(0.4),
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
          style={[global.center, { width: w(0.4) }]}
        >
          {/* <Icon name={instagram} size={w(0.07)} /> */}
          <AppText text="Applied" fontFamily={"Poppins_500Medium"} />
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
          style={[global.center, { width: w(0.4) }]}
        >
          {/* <Icon name={youtube} size={w(0.07)} /> */}
          <AppText text="Shortlist" fontFamily={"Poppins_500Medium"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CampaignSegment;
