import { View, Text, Pressable } from "react-native";
import React from "react";
import AppText from "../AppText";
import Avatar from "../Avatar";
import { checkIcon } from "../../container/icons";
import { global } from "../../styles";
import colors from "../../assets/colors";
import { w } from "../../config/utilFunction";

const CreatorCard = ({ data, index, ml, onPress }) => {
  return (
    <Pressable
      style={[global.start, { paddingLeft: ml || 0 }]}
      onPress={onPress}
    >
      <AppText
        text={index + 1 < 10 ? `0${index + 1}` : 10}
        fontSize={13}
        color={colors.black30}
        mr={w(0.02)}
      />
      <Avatar
        variant="verifiedUser"
        avatar={data?.influencerId?.profilePicture?.url}
        icon={checkIcon}
        isize={0.055}
        size={0.11}
      />
      <AppText
        text={data?.influencerId?.name}
        fontFamily={"Poppins_500Medium"}
        fontSize={16}
        ml={w(0.03)}
      />
    </Pressable>
  );
};

export default CreatorCard;
