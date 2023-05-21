import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { calTime, h, nFormatter, w } from "../../config/utilFunction";
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
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useBookmark } from "../../hooks";

const WishlistCard = ({ data, mt, wishlist }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => ({ ...state }));
  const { storeBookmark } = useBookmark();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("SingleCampaign", {
          id: data?._id,
          brandName: data?.brand?.name,
          imageUrl: data?.brand?.profilePicture.url,
        })
      }
      style={{
        height: h(0.3),
        width: "100%",
        borderRadius: 20,
        overflow: "hidden",
        marginTop: mt || 0,
      }}
    >
      <ImageBackground
        source={{
          uri: data?.campaignBanner,
        }}
        style={{
          height: h(0.3),
          width: "100%",
          position: "relative",
        }}
        resizeMode="cover"
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
            backgroundColor: colors.white,
            height: h(0.12),
            width: "90%",
            borderRadius: 10,
            elevation: 3,
            alignSelf: "center",
            position: "absolute",
            bottom: h(0.02),
            overflow: "hidden",
          }}
        >
          <View
            style={[
              global.start,
              {
                backgroundColor: colors.white,
                height: h(0.07),
                paddingHorizontal: w(0.03),
                width: "100%",
                borderBottomColor: colors.borderColor,
                borderBottomWidth: 1,
              },
            ]}
          >
            <Avatar
              variant="verifiedUser"
              size={0.1}
              avatar={
                data?.brand?.profilePicture.url ||
                "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
              }
            />
            <View
              style={{
                marginLeft: w(0.02),
                width: "90%",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <AppText
                  fontFamily={"Poppins_600SemiBold"}
                  text={
                    data?.campaignName?.length > 18
                      ? data?.campaignName.substring(0, 18) + "..."
                      : data?.campaignName
                  }
                  fontSize={19}
                />
                <Tags variant="primary" text="New!" ml={w(0.01)} />
              </View>
              <AppText
                text={calTime(data?.createdAt)}
                color={colors.black30}
                fontSize={13}
              />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 0.5,
                borderRightColor: colors.borderColor,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRightWidth: 1,
              }}
            >
              <Icon name={users} size={w(0.05)} />
              <AppText
                fontFamily={"Montserrat_500Medium"}
                text={
                  nFormatter(data?.followersRange?.min) +
                  "-" +
                  nFormatter(data?.followersRange?.max)
                }
                ml={w(0.01)}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SingleCampaign", {
                  id: data?._id,
                  brandName: data?.brand?.name,
                  imageUrl: data?.brand?.profilePicture.url,
                })
              }
              style={{
                flex: 0.5,
                borderRightColor: colors.borderColor,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRightWidth: 1,
              }}
            >
              <Icon name={apply} size={w(0.05)} />
              <AppText
                fontFamily={"Montserrat_500Medium"}
                text={data?.brand?._id === user?._id ? "View Now" : "Apply Now"}
                ml={w(0.01)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default WishlistCard;
