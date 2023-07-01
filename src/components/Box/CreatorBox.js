import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import React, { useState, useEffect } from "react";

import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { nextArrow } from "../../container/icons";
import { global } from "../../styles";
import AppText from "../AppText";
import Icon from "../Icon";
import CreatorCard from "../Card/CreatorCard";
import { useSelector } from "react-redux";
import { getTopCreators } from "../../functions/user";
import { useNavigation } from "@react-navigation/native";
const CreatorBox = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const page = 1;
  useEffect(() => {
    if (user) {
      getTopCreator();
    }
  }, [user]);
  const getTopCreator = () => {
    getTopCreators(user?.token, page)
      .then((res) => {
        setData(res.data.influencers);
      })
      .catch((err) => {
        console.log("TOP CREATOR ERROR_CREATOR BOX==>", err.response.data);
      });
  };
  return (
    <Pressable
      style={{
        backgroundColor: colors.white,
        paddingVertical: h(0.03),
        paddingHorizontal: w(0.05),
      }}
    >
      <Pressable style={[global.between, { marginBottom: h(0.03) }]}>
        <View>
          <AppText
            fontFamily={"Poppins_600SemiBold"}
            fontSize={24}
            text="Top Creators"
            mb={Platform.OS === "ios" ? 0 : -7}
          />
          <AppText
            fontSize={12}
            text="These were top creators of the week"
            color={colors.black70}
          />
        </View>
      </Pressable>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: h(0.1) }}
      >
        {data?.slice(0, 10).map((v, i) => {
          return (
            <CreatorCard
              data={v}
              key={i}
              index={i}
              ml={i > 0 && w(0.15)}
              onPress={() =>
                navigation.navigate("UserProfile", { id: v?.influencerId?._id })
              }
            />
          );
        })}
      </ScrollView>
    </Pressable>
  );
};

export default CreatorBox;
