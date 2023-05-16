import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { calTime, h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import Avatar from "../Avatar";
import AppText from "../AppText";
import { global } from "../../styles";
import Tags from "../Tags";
import Icon from "../Icon";
import {
  apply,
  heartOutline,
  users,
  wishlistoutline,
  wishlistsolid,
} from "../../container/icons";
import { LinearGradient } from "expo-linear-gradient";
import { useBookmark } from "../../hooks";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const SquareCard = ({ data, wishlist, mt, onPress }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => ({ ...state }));
  const { storeBookmark } = useBookmark();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate("SingleCampaign", {
          id: data?._id,
          brandName: data?.brand?.name,
          imageUrl: data?.brand?.profilePicture.url,
        })
      }
    >
      <ImageBackground
        source={{
          uri: data?.campaignBanner,
        }}
        style={{
          height: h(0.3),
          width: w(0.43),
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          marginTop: mt || 0,
        }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0)",
            colors.black,
          ]}
          style={{
            height: h(0.3),
            width: w(0.43),
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            onPress={() => storeBookmark(data)}
            style={{
              width: w(0.1),
              height: w(0.1),
              borderRadius: 10,
              backgroundColor: colors.white,
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              top: w(0.05),
              right: w(0.05),
              elevation: 5,
            }}
          >
            <Icon
              name={
                user?.wishlist?.filter((v) => v?._id == data?._id)?.length > 0
                  ? wishlistsolid
                  : wishlistoutline
              }
              size={w(0.06)}
            />
          </TouchableOpacity>
          <View
            style={{
              height: h(0.07),
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              borderRadius: 10,
              elevation: 3,
              alignSelf: "center",
              position: "absolute",
              bottom: h(0.001),
              left: w(0.03),
              overflow: "hidden",
            }}
          >
            <Avatar
              variant="verifiedUser"
              size={0.08}
              avatar={
                data?.brand?.profilePicture.url ||
                "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
              }
            />
            <View
              style={{
                marginLeft: w(0.02),

                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <AppText
                fontFamily={"Poppins_400Regular"}
                text={
                  data?.campaignName?.length > 10
                    ? data?.campaignName.substring(0, 10) + "..."
                    : data?.campaignName
                }
                fontSize={16}
                color={colors.white}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SquareCard;
