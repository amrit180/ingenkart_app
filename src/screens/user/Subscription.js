import { View, Text, Image } from "react-native";
import React from "react";
import { commingsoon } from "../../container/icons";
import { h } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { global } from "../../styles";
import { Layout, SingleCampaignHeader } from "../../components";

const Subscription = () => {
  return (
    <Layout>
      <SingleCampaignHeader brandName={"Subscription"} right={true} />
      <View style={[global.center, { flex: 1, backgroundColor: colors.white }]}>
        <Image
          source={commingsoon}
          style={{ width: "100%", height: h(0.45), resizeMode: "contain" }}
        />
      </View>
    </Layout>
  );
};

export default Subscription;
