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

const Layout = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Layout;
