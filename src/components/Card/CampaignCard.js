import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AppText from "../AppText";
import Avatar from "../Avatar";
import { checkIcon } from "../../container/icons";
import { global } from "../../styles";
import colors from "../../assets/colors";
import { w } from "../../config/utilFunction";
import Tags from "../Tags";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CampaignCard = ({ data, index, ml, mv }) => {
  const { user } = useSelector((s) => ({ ...s }));
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("SingleCampaign", {
          id: data?._id,
          brandName: data?.brand?.name,
          imageUrl: data?.brand?.profilePicture.url,
        })
      }
      style={[global.between, { marginVertical: mv || 0 }]}
    >
      <View style={[global.start, { marginLeft: ml || 0 }]}>
        <AppText
          text={index + 1 < 10 ? `0${index + 1}` : 10}
          fontSize={13}
          color={colors.black30}
          mr={w(0.02)}
        />
        <Avatar
          variant="verifiedUser"
          avatar={data.campaignBanner}
          icon={checkIcon}
          isize={0.04}
          size={0.12}
        />
        <AppText
          text={`${
            data.campaignName?.length > 20
              ? data.campaignName.substr(0, 20) + "..."
              : data.campaignName
          }`}
          fontFamily={"Poppins_500Medium"}
          fontSize={16}
          ml={w(0.03)}
        />
      </View>

      <Tags
        variant={
          data.shortlistedInfluencer.includes(user?._id)
            ? "primary"
            : data.appliedInfluencer?.includes(user?._id)
            ? "disable"
            : null
        }
        text={
          data.shortlistedInfluencer.includes(user?._id)
            ? "Accepted!"
            : data.appliedInfluencer?.includes(user?._id)
            ? "Applied"
            : ""
        }
      />
    </TouchableOpacity>
  );
};

export default CampaignCard;
