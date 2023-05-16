import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { h, w } from "../../../config/utilFunction";
import Icon from "../../Icon";
import { link, linksub } from "../../../container/icons";
import colors from "../../../assets/colors";
import AppText from "../../AppText";

const SubmissionCard = ({ item, side, onPress }) => {
  return (
    <TouchableOpacity
      style={{ marginTop: h(0.01) }}
      onPress={onPress}
      activeOpacity={item.uploader.status ? 1 : 0.5}
    >
      <View
        style={{
          backgroundColor: colors.receiverBg,
          paddingHorizontal: w(0.05),
          paddingVertical: h(0.05),
          width: "60%",
          height: h(0.13),
          alignSelf: side === "right" ? "flex-end" : "flex-start",
          borderRadius: 10,
          borderColor: colors.subBorde,
          borderWidth: 1,
          borderStyle: "dashed",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name={item.uploader.status ? linksub : link} size={14} />
        <AppText
          fontFamily={"Poppins_500Medium"}
          ml={w(0.01)}
          text={`${item.uploader.status ? "Submitted" : "Submit here"}`}
          color={
            item.uploader.status ? colors.chatBlue : "rgba(120, 120, 120, 1)"
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default SubmissionCard;
