import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Linking,
} from "react-native";
import React from "react";
import { calTime, h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import Avatar from "../Avatar";
import AppText from "../AppText";

import { LinearGradient } from "expo-linear-gradient";

import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const InstaCard = ({ data, wishlist, mt, onPress }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => Linking.openURL(data.permalink)}
    >
      <ImageBackground
        source={{
          uri: data?.media_url,
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
                data?.profile_pic ||
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
                  data?.caption?.length > 10
                    ? data?.caption.substring(0, 10) + "..."
                    : data?.caption
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

export default InstaCard;
