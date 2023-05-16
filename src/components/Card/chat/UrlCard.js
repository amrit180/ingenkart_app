import { View, Text, Pressable, Linking } from "react-native";
import React from "react";
import colors from "../../../assets/colors";
import { h, w } from "../../../config/utilFunction";
import Icon from "../../Icon";
import {
  bluelink,
  externalbluelink,
  linkblue,
  linkto,
} from "../../../container/icons";
import AppText from "../../AppText";
import { global } from "../../../styles";

const UrlCard = ({ side, item }) => {
  return (
    <Pressable
      style={[
        {
          backgroundColor:
            side === "right" ? colors.chatBlue : colors.receiverBg,
          width: "75%",
          alignSelf: side === "right" ? "flex-end" : "flex-start",
          borderRadius: 10,
          borderTopRightRadius: side === "right" ? 0 : 10,
          borderTopLeftRadius: side === "right" ? 10 : 0,
          paddingHorizontal: 12,
          paddingVertical: 7,
          marginTop: h(0.01),
          paddingBottom: h(0.02),
        },
      ]}
    >
      <AppText
        color={side === "right" ? colors.white : colors.black}
        text={"URL"}
        fontFamily={"Poppins_600SemiBold"}
      />
      {item?.urlLinks?.map((v, i) => (
        <View key={i} style={[global.between, { marginTop: h(0.01) }]}>
          <View style={global.start}>
            <Icon
              name={side === "right" ? bluelink : linkblue}
              size={w(0.06)}
            />
            <AppText
              text={`${
                v?.url?.length > 19 ? v.url.substring(0, 19) + "..." : v.url
              }`}
              color={side === "right" ? colors.white : colors.black}
              fontSize={15}
              ml={w(0.01)}
            />
          </View>
          <Pressable onPress={() => Linking.openURL(v.url)}>
            <Icon
              name={side === "right" ? linkto : externalbluelink}
              size={w(0.06)}
            />
          </Pressable>
        </View>
      ))}
    </Pressable>
  );
};

export default UrlCard;
