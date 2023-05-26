import { View, Text } from "react-native";
import React from "react";
import { calTime, h, w } from "../../config/utilFunction";
import { global } from "../../styles/global";
import { useSelector } from "react-redux";
import { checkIcon } from "../../container/icons";
import colors from "../../assets/colors";
import Avatar from "../Avatar";
import AppText from "../AppText";

const CommentCard = ({ item }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const userId = user?._id;
  return (
    <View
      style={[
        global.between,
        {
          backgroundColor: colors.white,
          height: h(0.09),
          width: "100%",

          paddingVertical: h(0.01),
        },
      ]}
    >
      <View style={[global.start, { alignItems: "flex-start" }]}>
        <Avatar
          avatar={item.userId?.profilePicture.url}
          variant="verifiedUser"
          size={0.12}
          icon={checkIcon}
          isize={0.04}
        />
        <View style={{ marginLeft: w(0.02) }}>
          <AppText
            text={item.userId?.name}
            fontFamily={"Poppins_500Medium"}
            width={w(0.65)}
          />
          <AppText
            width={w(0.65)}
            text={item.text}
            fontFamily={"Poppins_300Light"}
            fontSize={12}
            color={colors.chatText}
          />
        </View>
      </View>
      <View style={{ alignSelf: "flex-start" }}>
        <AppText
          text={calTime(item.createdAt)}
          fontSize={11}
          color={colors.black30}
        />
      </View>
    </View>
  );
};

export default CommentCard;
