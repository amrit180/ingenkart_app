import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import Icon from "../Icon";
import {
  fulllogo,
  heartOutline,
  notificationActive,
  notificationOutline,
} from "../../container/icons";
import { global } from "../../styles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const HomeHeader = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigation = useNavigation();

  return (
    <View
      style={[
        global.between,
        {
          height: h(0.073),
          backgroundColor: colors.white,
          paddingHorizontal: w(0.05),
          position: "relative",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.03,
          shadowRadius: 1.41,
          borderBottomColor: "rgba(0,0,0,0.07)",
          borderBottomWidth: 0.5,
          zIndex: 1,
        },
      ]}
    >
      <Icon name={fulllogo} height={h(0.025)} width={w(0.25)} />

      <View
        style={[
          global.between,
          {
            width: user?.role === "brand" ? w(0.2) : w(0.33),
          },
        ]}
      >
        {user?.role !== "brand" && (
          <Pressable onPress={() => navigation.navigate("Wishlist")}>
            <Icon name={heartOutline} size={h(0.03)} />
          </Pressable>
        )}
        <Pressable onPress={() => navigation.navigate("Notification")}>
          <Icon
            name={
              user?.newNotification ? notificationActive : notificationOutline
            }
            size={h(0.035)}
          />
        </Pressable>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserProfile", {
              id: user?._id,
            })
          }
        >
          <Image
            source={{ uri: user?.profilePicture?.url }}
            style={{
              height: h(0.045),
              width: h(0.045),
              borderRadius: 100,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
