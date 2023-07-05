import { TouchableOpacity } from "react-native";
import React from "react";
import AppText from "./AppText";
import colors from "../assets/colors";

const Pill = ({
  variant,
  text,
  height,
  width,
  onPress,
  ph,
  pv,
  mh,
  mv,
  mr,
  ml,
  bg,
  txtcolor,
  txtalign,
}) => {
  switch (variant) {
    case "active":
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
          style={{
            height,
            width,
            paddingHorizontal: ph || 0,
            paddingVertical: pv || 0,
            borderRadius: 5000,
            backgroundColor: colors.black,
            marginVertical: mv || 0,
            marginHorizontal: mh || 0,
            marginRight: mr || 0,
            marginLeft: ml || 0,
          }}
        >
          <AppText
            text={text}
            color={colors.white}
            fontFamily={"Poppins_500Medium"}
            mt={2}
            fontSize={13}
          />
        </TouchableOpacity>
      );
    case "inactive":
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
          style={{
            paddingHorizontal: ph,
            paddingVertical: pv,
            height,
            width,
            borderRadius: 5000,
            borderColor: "rgba(226, 226, 226, 1)",
            borderWidth: 1,
            backgroundColor: bg || "rgba(242, 242, 242, 1)",
            marginVertical: mv || 0,
            marginHorizontal: mh || 0,
            marginRight: mr || 0,
            marginLeft: ml || 0,
          }}
        >
          <AppText
            text={text}
            color={txtcolor || colors.txtgray}
            fontSize={13}
            mt={2}
            textAlign={txtalign || "left"}
          />
        </TouchableOpacity>
      );
  }
};

export default Pill;
