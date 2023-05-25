import {
  Animated,
  Button,
  Pressable,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../../assets/colors";
import {
  AppText,
  Icon,
  Layout,
  SingleCampaignHeader,
  WalletSheet,
} from "../../components";

import { useRef } from "react";
import { useCallback } from "react";
import { walletbg } from "../../container/images";
import { h, w } from "../../config/utilFunction";
import { useSelector } from "react-redux";
import { blackadd } from "../../container/icons";
import { useNavigation } from "@react-navigation/native";

const Wallet = () => {
  const childref = useRef(null);
  const { user } = useSelector((s) => ({ ...s }));
  const navigation = useNavigation();
  const SwipeSheet = useCallback((value) => {
    childref.current.scrollTo(value);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <SingleCampaignHeader brandName={"Wallet"} right={false} />
      <ImageBackground
        source={walletbg}
        style={{
          height: h(0.27),
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        resizeMode="cover"
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <AppText text={"₹"} fontFamily={"Inter_400Regular"} fontSize={20} />
          <AppText
            text={user?.credits}
            fontFamily={"Poppins_600SemiBold"}
            fontSize={60}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Kycform")}
          style={{
            height: h(0.04),
            width: w(0.45),
            backgroundColor: colors.white,
            borderRadius: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: w(0.02),
          }}
        >
          <Icon name={blackadd} size={w(0.05)} />
          <AppText text="Add a withdrwal method" fontSize={11} />
        </TouchableOpacity>
      </ImageBackground>
      <WalletSheet childref={childref} />
    </SafeAreaView>
  );
};

export default Wallet;
