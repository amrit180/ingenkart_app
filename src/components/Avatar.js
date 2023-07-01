import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { h, w } from "../config/utilFunction";
import colors from "../assets/colors";
import Icon from "./Icon";
import { yellowPlus } from "../container/icons";

const Avatar = ({ variant, avatar, onPress, mr, ml, size, isize, icon }) => {
  switch (variant) {
    case "activestory":
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <LinearGradient
            colors={[
              "rgba(255, 175, 19, 1)",
              "rgba(255, 146, 19, 1)",
              "rgba(255, 217, 19, 1)",
            ]}
            style={{
              height: w(0.18),
              width: w(0.18),
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              marginRight: mr || 0,
              marginLeft: ml || 0,
            }}
          >
            <View
              style={{
                height: w(0.17),
                width: w(0.17),
                borderRadius: 500,
                backgroundColor: colors.white,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: avatar }}
                style={{
                  height: w(0.16),
                  width: w(0.16),
                  borderRadius: 500,
                }}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    case "inactivestory":
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <LinearGradient
            colors={[
              "rgb(178, 190, 181)",
              "rgba(115, 147, 179,0.5)",
              "rgb(178, 190, 181)",
            ]}
            style={{
              height: w(0.18),
              width: w(0.18),
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              marginRight: mr || 0,
              marginLeft: ml || 0,
            }}
          >
            <View
              style={{
                height: w(0.17),
                width: w(0.17),
                borderRadius: 500,
                backgroundColor: colors.white,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: avatar }}
                style={{
                  height: w(0.16),
                  width: w(0.16),
                  borderRadius: 500,
                }}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    case "addstory":
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <View
            style={{
              height: w(0.17),
              width: w(0.17),
              borderRadius: 500,
              backgroundColor: colors.white,
              alignItems: "center",
              justifyContent: "center",

              position: "relative",
              marginRight: mr || 0,
              marginLeft: ml || 0,
            }}
          >
            <Image
              source={{ uri: avatar }}
              style={{
                height: w(0.17),
                width: w(0.17),
                borderRadius: 500,
              }}
            />
            <View style={{ position: "absolute", bottom: 3, right: 3 }}>
              <Icon name={yellowPlus} size={w(0.06)} />
            </View>
          </View>
        </TouchableOpacity>
      );
    case "verifiedUser":
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <View
            style={{
              height: w(size),
              width: w(size),
              borderRadius: 500,
              backgroundColor: colors.white,
              alignItems: "center",
              justifyContent: "center",

              position: "relative",
              marginRight: mr || 0,
              marginLeft: ml || 0,
            }}
          >
            <Image
              source={{ uri: avatar }}
              style={{
                height: w(size),
                width: w(size),
                borderRadius: 500,
              }}
            />
            {icon && (
              <View
                style={{
                  position: "absolute",
                  bottom: -h(0.005),
                  right: -w(0.005),
                }}
              >
                <Icon name={icon} size={w(isize)} />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
  }
};

export default Avatar;
