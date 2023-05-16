import { View, Text } from "react-native";
import React from "react";
import AppText from "../AppText";
import Icon from "../Icon";
import { arrowDown } from "../../container/icons";
import { w } from "../../config/utilFunction";
import { global } from "../../styles";

const WalletBox = () => {
  return (
    <View>
      <View style={global.between}>
        <AppText
          text={"All Transactions"}
          fontSize={18}
          fontFamily={"Poppins_600SemiBold"}
        />
        <Icon name={arrowDown} size={w(0.06)} />
      </View>
    </View>
  );
};

export default WalletBox;
