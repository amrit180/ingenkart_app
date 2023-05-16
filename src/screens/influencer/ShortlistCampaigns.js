import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { Layout, WishlistCard } from "../../components";
import { getMyCampaigns } from "../../functions/influencer";
import { setCampaigns } from "../../redux/campaignsSlice";
import { useState } from "react";
import { useEffect } from "react";
import { empty } from "../../container/images";

const ShortlistCampaigns = () => {
  const { campaigns, user } = useSelector((s) => ({ ...s }));
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  let dispatch = useDispatch();
  useEffect(() => {
    getCampaigns();
  }, []);

  const getCampaigns = async () => {
    const res = await getMyCampaigns(user?.token, user?._id, page, limit).catch(
      (err) => console.log(err.response.data)
    );
    if (res.data.success) {
      dispatch(
        setCampaigns({
          appliedCampaigns: [...res.data.appliedCampaigns],
          joinedCampaigns: [...res.data.joinedCampaigns],
        })
      );
    }
  };
  return (
    <Layout>
      <View
        style={{
          backgroundColor: colors.white,
          height: "100%",
          width: "100%",
          paddingHorizontal: w(0.05),
        }}
      >
        {/* <Text>{JSON.stringify(campaigns?.joinedCampaigns)}</Text> */}
        {campaigns?.joinedCampaigns?.length > 0 ? (
          <FlatList
            data={campaigns?.joinedCampaigns}
            keyExtractor={(item) => item?._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <WishlistCard
                  data={item}
                  mt={h(0.01)}
                  wishlist={user?.wishlist.filter((v) => v?._id === item?._id)}
                />
              );
            }}
          />
        ) : (
          <Image
            source={empty}
            style={{ height: 300, width: "100%" }}
            resizeMode="contain"
          />
        )}
      </View>
    </Layout>
  );
};

export default ShortlistCampaigns;
