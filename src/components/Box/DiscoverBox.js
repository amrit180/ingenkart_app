import { View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import AppText from "../AppText";
import Icon from "../Icon";
import { nextArrow } from "../../container/icons";
import { global } from "../../styles";
import WishlistCard from "../Card/WishlistCard";
import SquareCard from "../Card/SquareCard";
import { useNavigation } from "@react-navigation/native";
import EditorChoiceCard from "../Card/EditorChoiceCard";

const DiscoverBox = ({ data, squareCardData }) => {
  const navigation = useNavigation();

  // console.warn(JSON.stringify(data, 2, 4));
  return (
    <View
      style={{
        backgroundColor: colors.white,
        paddingVertical: h(0.03),
        paddingHorizontal: w(0.05),
      }}
    >
      {/* <Text> {JSON.stringify(data[0]?.campaignId, null, 4)} </Text> */}
      <View style={[global.between, { marginBottom: h(0.03) }]}>
        <View>
          <AppText
            fontFamily={"Poppins_600SemiBold"}
            fontSize={26}
            text="Discover"
          />
          <AppText
            fontSize={13}
            text="Discover the latest campaigns you can apply"
            color={colors.black70}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Discover")}>
          <Icon name={nextArrow} size={w(0.07)} />
        </TouchableOpacity>
      </View>
      <EditorChoiceCard data={data[0]?.campaignId} wishlist={false} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {squareCardData.map((v, i) =>
          renderItem(v, i, () => navigation.navigate("SingleCampaign", v))
        )}
      </View>
    </View>
  );
};

export default DiscoverBox;

const renderItem = (item, i, onPress) => {
  return <SquareCard data={item} key={i} mt={h(0.05)} onPress={onPress} />;
};
