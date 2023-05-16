import { View, Text, Pressable } from "react-native";
import React from "react";
import AppText from "../AppText";
import Avatar from "../Avatar";
import { checkIcon } from "../../container/icons";
import { global } from "../../styles";
import colors from "../../assets/colors";
import { w } from "../../config/utilFunction";

const CreatorCard = ({ data, index, ml }) => {
  return (
    <Pressable style={[global.start, { marginLeft: ml || 0 }]}>
      <AppText
        text={index + 1 < 10 ? `0${index + 1}` : 10}
        fontSize={13}
        color={colors.black30}
        mr={w(0.02)}
      />
      <Avatar
        variant="verifiedUser"
        avatar={data?.profilePicture?.url}
        icon={checkIcon}
        isize={0.04}
        size={0.12}
      />
      <AppText
        text={data?.name}
        fontFamily={"Poppins_500Medium"}
        fontSize={16}
        ml={w(0.03)}
      />
    </Pressable>
  );
};

export default CreatorCard;
