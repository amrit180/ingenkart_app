import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";

import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { nextArrow } from "../../container/icons";
import { global } from "../../styles";
import AppText from "../AppText";
import Icon from "../Icon";
import CreatorCard from "../Card/CreatorCard";
import { useSelector } from "react-redux";
import { getTopCreatorAPI } from "../../functions/user";
const CreatorBox = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);

  const page = 1;
  const limit = 10;
  useEffect(() => {
    if (user) {
      getTopCreator();
    }
  }, [user]);
  const getTopCreator = () => {
    getTopCreatorAPI(user?.token, page, limit)
      .then((res) => {
        console.log("TOP CREATOR_CREATOR BOX==>", res.data);
        setData(res.data.influencers);
        // console.warn(res.data.influencers[0], "hello");
      })
      .catch((err) => {
        console.log("TOP CREATOR ERROR_CREATOR BOX==>", err);
        // console.warn("hello", err.response.data);
      });
  };
  return (
    <View
      style={{
        backgroundColor: colors.white,
        paddingVertical: h(0.03),
        paddingHorizontal: w(0.05),
      }}
    >
      <View style={[global.between, { marginBottom: h(0.03) }]}>
        <View>
          <AppText
            fontFamily={"Poppins_600SemiBold"}
            fontSize={26}
            text="Top Creators"
          />
          <AppText
            fontSize={13}
            text="These were top creators of the week"
            color={colors.black70}
          />
        </View>
        {/* <AppText text={JSON.stringify(data)} /> */}
        {/* <Pressable>
          <Icon name={nextArrow} size={w(0.07)} />
        </Pressable> */}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map((v, i) => {
          return (
            <CreatorCard data={v} key={i} index={i} ml={i > 0 && w(0.15)} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CreatorBox;
