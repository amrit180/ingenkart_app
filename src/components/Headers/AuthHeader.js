import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { headerstyle } from "../../styles/AuthHeader";
import Icon from "../Icon";
import { backArrow, logo } from "../../container/icons";
import { w } from "../../config/utilFunction";
import colors from "../../assets/colors";

const AuthHeader = ({ index, progress }) => {
  const navigation = useNavigation();

  if (index > 1) {
    return (
      <>
        <View style={headerstyle.container}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name={backArrow} size={w(0.1)} />
          </Pressable>
          <Icon name={logo} size={w(0.12)} />
        </View>
        <View
          style={{
            position: "relative",
            backgroundColor: colors.black10,
          }}
        >
          <View
            style={{
              width: w(progress),
              height: 0,
              borderColor: colors.borderYellow,
              borderWidth: 1,
            }}
          />
        </View>
      </>
    );
  } else {
    return (
      <View style={headerstyle.container}>
        <Icon name={logo} size={w(0.12)} />
      </View>
    );
  }
};

export default AuthHeader;
