import {
  Animated,
  Button,
  Pressable,
  ScrollView,
  View,
  Text,
} from "react-native";
import React from "react";
import colors from "../../assets/colors";
import {
  AppText,
  Layout,
  SingleCampaignHeader,
  WalletSheet,
} from "../../components";

import { useRef } from "react";
import { useCallback } from "react";

const Wallet = () => {
  const childref = useRef(null);

  const SwipeSheet = useCallback((value) => {
    childref.current.scrollTo(value);
  }, []);
  return (
    <Layout>
      <View style={{ flex: 1, backgroundColor: colors.grey217 }}>
        <SingleCampaignHeader brandName={"Wallet"} right={false} />
        <WalletSheet childref={childref} />
      </View>
    </Layout>
  );
};

export default Wallet;
