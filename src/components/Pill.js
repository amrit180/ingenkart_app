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
            mt={1}
            fontSize={16}
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
            borderColor: colors.photobg,
            borderWidth: 1,
            backgroundColor: bg || colors.white,
            marginVertical: mv || 0,
            marginHorizontal: mh || 0,
            marginRight: mr || 0,
            marginLeft: ml || 0,
          }}
        >
          <AppText
            text={text}
            color={txtcolor || colors.txtgray}
            fontSize={16}
            textAlign={txtalign || "left"}
          />
        </TouchableOpacity>
      );
  }
};

export default Pill;
