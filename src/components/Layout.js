import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import colors from "../assets/colors";
import { Pressable } from "react-native";

const Layout = ({ children, bg }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1, backgroundColor: bg || colors.white }}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Layout;
