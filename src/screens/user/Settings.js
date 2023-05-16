import { View, ScrollView, Image } from "react-native";
import React from "react";
import { Layout, SettingBox, SoloHeader } from "../../components";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { useSelector } from "react-redux";

import {
  acampaign,
  ccampaign,
  chatsupport,
  fulllogo,
  logout,
  privacy,
  scampaign,
  setting,
  subscription,
  tnc,
  transaction,
  wallet,
} from "../../container/icons";

const data = [
  {
    id: 1,
    name: "Edit your account",
    icon: setting,
    category: "account",
  },
  {
    id: 2,
    name: "Your Subscription/get subscription",
    icon: subscription,
    category: "account",
  },
  {
    id: 3,
    name: "Wallet",
    icon: wallet,
    category: "money",
  },
  {
    id: 4,
    name: "Transactions",
    icon: transaction,
    category: "money",
  },
  {
    id: 5,
    name: "Applied Campaigns",
    icon: acampaign,
    category: "campaign",
  },
  {
    id: 6,
    name: "Shortlisted Campaigns",
    icon: scampaign,
    category: "campaign",
  },
  {
    id: 7,
    name: "Completed Campaigns",
    icon: ccampaign,
    category: "campaign",
  },
  {
    id: 8,
    name: "Privacy Policy",
    icon: privacy,
    category: "user",
  },
  {
    id: 9,
    name: "Terms and Conditions",
    icon: tnc,
    category: "user",
  },
  {
    id: 10,
    name: "Chat Support",
    icon: chatsupport,
    category: "user",
  },
  {
    id: 11,
    name: "Logout",
    icon: logout,
    category: "user",
  },
];

const Settings = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <Layout>
      <SoloHeader title="Settings" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: w(0.05),
        }}
        showsVerticalScrollIndicator={false}
      >
        {user?.role === "brand" ? (
          <SettingBox
            height={h(0.28)}
            numElement={2.8}
            user={user}
            data={data?.filter((v) => v.name === "Edit your account")}
          />
        ) : (
          <SettingBox
            height={h(0.28)}
            numElement={4}
            user={user}
            data={data?.filter((v) => v.category === "account")}
          />
        )}
        <SettingBox
          height={h(0.28)}
          numElement={data?.filter((v) => v.category === "money")?.length}
          data={data?.filter((v) => v.category === "money")}
        />
        {user?.role === "influencer" && (
          <SettingBox
            height={h(0.28)}
            numElement={data?.filter((v) => v.category === "campaign")?.length}
            data={data?.filter((v) => v.category === "campaign")}
          />
        )}
        <SettingBox
          height={h(0.28)}
          numElement={data?.filter((v) => v.category === "user")?.length}
          data={data?.filter((v) => v.category === "user")}
        />
        <Image
          source={fulllogo}
          style={{
            width: 200,
            height: 30,
            alignSelf: "center",
            marginBottom: h(0.06),
            marginTop: h(0.02),
          }}
          resizeMode="contain"
        />
      </ScrollView>
    </Layout>
  );
};

export default Settings;
