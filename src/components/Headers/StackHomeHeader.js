import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import Icon from "../Icon";
import {
  backArrow,
  heartOutline,
  heartSolid,
  notificationOutline,
  notificationSolid,
} from "../../container/icons";
import { global } from "../../styles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AppText from "../AppText";

const StackHomeHeader = ({ name, noback }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigation = useNavigation();

  return (
    <View
      style={[
        global.between,
        {
          height: h(0.07),
          backgroundColor: colors.white,
          paddingHorizontal: w(0.05),
          marginBottom: 1,
        },
      ]}
    >
      <View style={global.start}>
        {!noback && (
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name={backArrow} size={w(0.1)} />
          </Pressable>
        )}
        <AppText
          text={name}
          fontFamily={"Poppins_600SemiBold"}
          fontSize={24}
          ml={!noback ? w(0.03) : 0}
        />
      </View>
      <View
        style={[
          global.between,
          {
            width: user?.role === "brand" ? w(0.2) : w(0.3),
          },
        ]}
      >
        {user?.role !== "brand" && (
          <Pressable onPress={() => navigation.navigate("Wishlist")}>
            <Icon
              name={name === "Wishlist" ? heartSolid : heartOutline}
              size={h(0.03)}
            />
          </Pressable>
        )}
        <Pressable onPress={() => navigation.navigate("Notification")}>
          <Icon
            name={name === "Activity" ? notificationSolid : notificationOutline}
            size={h(0.035)}
          />
        </Pressable>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              user?.role === "brand" ? "BrandProfile" : "UserProfile",
              {
                id: user?._id,
              }
            )
          }
        >
          <Image
            source={{ uri: user?.profilePicture?.url }}
            style={{
              height: h(0.05),
              width: h(0.05),
              borderRadius: 100,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StackHomeHeader;
