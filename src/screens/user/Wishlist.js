import { View, Text, ScrollView, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Layout,
  SquareCard,
  StackHomeHeader,
  WishlistCard,
} from "../../components";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import NotificationData from "../../assets/data/NotificationData";
import { getCampaign } from "../../functions/campaign";
import { useBookmark } from "../../hooks";
import { empty } from "../../container/images";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { getbookmark, removeAllBookmarks } = useBookmark();
  useEffect(() => {
    getbookmark();
  }, []);

  // const getAllCampaigns = async () => {
  //   const data = await getbookmark();
  //   setCampaign(data);
  // };
  return (
    <Layout>
      <StackHomeHeader name="Wishlist" />

      <ScrollView>
        <View style={{ paddingHorizontal: w(0.05), paddingTop: h(0.01) }}>
          {user?.wishlist?.length == 0 ? (
            <Image
              source={empty}
              style={{ height: 200, width: "100%", marginTop: h(0.05) }}
              resizeMode="contain"
            />
          ) : (
            user?.wishlist?.map((c, i) => (
              <WishlistCard
                data={c}
                mt={i > 0 && h(0.03)}
                key={i}
                wishlist={true}
              />
            ))
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Wishlist;
