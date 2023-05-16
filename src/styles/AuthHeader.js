import { StyleSheet } from "react-native";
import colors from "../assets/colors";
import { h, w } from "../config/utilFunction";

export const headerstyle = StyleSheet.create({
  container: {
    width: w(1) - w(0.16),
    height: h(0.07),
    backgroundColor: colors.white,
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
