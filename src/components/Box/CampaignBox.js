import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CreatorCard from "../Card/CreatorCard";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { nextArrow } from "../../container/icons";
import { global } from "../../styles";
import AppText from "../AppText";
import Icon from "../Icon";
import CampaignCard from "../Card/CampaignCard";
import { useNavigation } from "@react-navigation/native";

const CampaignBox = ({ data, mv }) => {
  const navigation = useNavigation();

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
            text="Applied Campaigns"
          />
          <AppText
            fontSize={13}
            text="Your recent applied campaigns"
            color={colors.black70}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("TopTabs")}>
          <Icon name={nextArrow} size={w(0.07)} />
        </TouchableOpacity>
      </View>
      {data.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <AppText text={JSON.stringify(data[0], null, 4)} /> */}
          {data?.map((v, i) => {
            return <CampaignCard data={v} index={i} key={i} mv={mv} />;
          })}
        </ScrollView>
      ) : (
        <View
          style={{ height: h(0.3), width: "100%", justifyContent: "center" }}
        >
          <AppText
            text={"No Campaign"}
            textAlign={"center"}
            fontSize={18}
            fontFamily={"Poppins_600SemiBold"}
          />
          <AppText text={"Apply your first campaign!!!"} textAlign={"center"} />
        </View>
      )}
    </View>
  );
};

export default CampaignBox;
