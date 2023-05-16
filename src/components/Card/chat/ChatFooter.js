import { View, Text } from "react-native";
import React from "react";
import { h } from "../../../config/utilFunction";
import Avatar from "../../Avatar";
import { checkIcon } from "../../../container/icons";
import colors from "../../../assets/colors";
import AppText from "../../AppText";

const ChatFooter = ({ avatar, name }) => {
  return (
    <View
      style={{
        alignSelf: "center",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: h(0.05),
        alignItems: "center",
      }}
    >
      <Avatar
        avatar={avatar}
        variant="verifiedUser"
        size={0.2}
        icon={checkIcon}
        isize={0.07}
      />
      <AppText text={name} fontFamily={"Poppins_500Medium"} mt={h(0.02)} />

      <AppText
        text={"Budget ₹0-₹10K · 200 Shortlisted"}
        fontFamily={"Poppins_400Regular"}
        fontSize={11}
        color={colors.budgetColor}
        mt={h(0.01)}
      />
      <AppText
        text={"Lifestyle · Technology · Fitness"}
        fontSize={11}
        color={colors.budgetColor}
      />
      {/* <Text
        style={{
          fontFamily: "Poppins_400Regular",
          fontSize: 11,
          color: colors.budgetColor,
        }}>
        Lifestyle · Technology · Fitness
      </Text> */}
    </View>
  );
};

export default ChatFooter;
