import { View, Text, Pressable, Linking } from "react-native";
import React from "react";
import { global } from "../../../styles";
import Icon from "../../Icon";
import AppText from "../../AppText";
import colors from "../../../assets/colors";
import { h, w } from "../../../config/utilFunction";
import {
  instagramlogo,
  reelslogo,
  shorts,
  youtubelogo,
} from "../../../container/icons";

const LinkCard = ({ side, item }) => {
  const actualLogo = (p) => {
    if (p === "youtube") return youtubelogo;
    if (p === "reels") return reelslogo;
    if (p === "shorts") return shorts;
    if (p === "instagram") return instagramlogo;
  };
  return (
    <Pressable
      style={[
        {
          backgroundColor:
            side === "right" ? colors.chatBlue : colors.receiverBg,
          maxWidth: "75%",
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
        text={"Links"}
        fontFamily={"Poppins_600SemiBold"}
        mb={h(0.015)}
      />
      <View style={global.center}>
        {/* {console.log(item.urlLinks)} */}
        {item.urlLinks
          ?.filter((v) => v.url !== "")
          ?.map((v, i) => (
            <Pressable
              onPress={() => Linking.openURL(v.url)}
              key={i}
              style={{
                width: w(0.1),
                height: w(0.1),
                marginLeft: i > 0 ? w(0.03) : 0,
                borderRadius: 100,
                backgroundColor: colors.white,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name={actualLogo(v.platform)} size={w(0.07)} />
            </Pressable>
          ))}
      </View>
    </Pressable>
  );
};

export default LinkCard;
