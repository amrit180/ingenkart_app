import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { checkIcon } from "../container/icons";
import colors from "../assets/colors";
import AppText from "./AppText";
import { global } from "../styles";
import { calTime, w, h } from "../config/utilFunction";

const NotiComp = ({ variant, data, onPress }) => {
  switch (variant) {
    case "shortlist":
      return (
        <View
          style={[
            global.start,
            {
              backgroundColor: colors.white,
              height: h(0.1),
              paddingHorizontal: w(0.05),
            },
          ]}
        >
          <Avatar
            variant="verifiedUser"
            icon={checkIcon}
            isize={0.055}
            size={0.11}
            avatar={data.campaign.banner}
          />
          <View style={{ marginLeft: w(0.02) }}>
            <View style={global.start}>
              <AppText
                text="You have been shortlisted for "
                color={colors.notiColorGray}
                fontSize={12}
              />
              <AppText
                fontFamily={"Poppins_600SemiBold"}
                text={data.campaign.name.substr(0, 15) + "..."}
                fontSize={12}
              />
            </View>
            <AppText
              text={calTime(data.timeStamps)}
              color={colors.black30}
              fontSize={10}
            />
          </View>
        </View>
      );

    case "rejected":
      return (
        <View
          style={[
            global.start,
            {
              backgroundColor: colors.white,
              height: h(0.1),
              paddingHorizontal: w(0.05),
              width: "100%",
            },
          ]}
        >
          <Avatar
            variant="verifiedUser"
            icon={checkIcon}
            isize={0.055}
            size={0.11}
            avatar={data.campaign.banner}
          />
          <View
            style={{
              marginLeft: w(0.02),
              width: "80%",

              paddingRight: w(0.05),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <AppText
                text="Your request for "
                color={colors.notiColorGray}
                fontSize={12}
              />
              <AppText
                fontFamily={"Poppins_600SemiBold"}
                text={data.campaign.name.substr(0, 20) + "..."}
                fontSize={12}
              />
              <AppText
                text=" has been rejected "
                color={colors.notiColorGray}
                fontSize={12}
              />
            </View>
            <AppText
              text={calTime(data.timeStamps)}
              color={colors.black30}
              fontSize={10}
            />
          </View>
        </View>
      );
    // You received a message from BRAND_NAME
    case "message":
      return (
        <View
          style={[
            global.start,
            {
              backgroundColor: colors.white,
              height: h(0.1),
              paddingHorizontal: w(0.05),
              width: "100%",
            },
          ]}
        >
          <Avatar
            variant="verifiedUser"
            icon={checkIcon}
            isize={0.055}
            size={0.11}
            avatar={data.brand.image}
          />
          <View
            style={{
              marginLeft: w(0.02),
              width: "90%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <AppText
                text="You received a message from "
                color={colors.notiColorGray}
              />
              <AppText
                fontFamily={"Poppins_600SemiBold"}
                text={data.brand.name}
              />
            </View>
            <AppText
              text={calTime(data.createdAt)}
              color={colors.black30}
              fontSize={13}
            />
          </View>
        </View>
      );
    // A new campaign has come in _CATEGORY_NAME
    case "campaign":
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[
            global.start,
            {
              backgroundColor: colors.white,
              height: h(0.1),
              paddingHorizontal: w(0.05),
              width: "100%",
            },
          ]}
        >
          <Avatar
            variant="verifiedUser"
            icon={checkIcon}
            isize={0.055}
            size={0.11}
            avatar={data.user.profilePicture}
          />
          <View
            style={{
              marginLeft: w(0.02),
              width: "90%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <AppText
                text="An influencer connected to campaign"
                color={colors.notiColorGray}
                fontSize={12}
              />
              <AppText
                fontFamily={"Poppins_600SemiBold"}
                text={data.user.name}
                fontSize={12}
              />
            </View>
            <AppText
              text={calTime(data.timeStamps)}
              color={colors.black30}
              fontSize={10}
            />
          </View>
        </TouchableOpacity>
      );
    case "payment":
      return (
        <View
          style={[
            global.start,
            {
              backgroundColor: colors.white,
              height: h(0.1),
              paddingHorizontal: w(0.05),
              width: "100%",
            },
          ]}
        >
          <Avatar
            variant="verifiedUser"
            icon={checkIcon}
            isize={0.055}
            size={0.11}
            avatar={
              "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
            }
          />
          <View
            style={{
              marginLeft: w(0.02),
              width: "90%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <AppText
                text="You received your token payment of "
                color={colors.notiColorGray}
                fontSize={12}
              />
              <AppText
                fontFamily={"Poppins_600SemiBold"}
                text={"₹" + data.paymentAmount}
                fontSize={12}
              />
            </View>
            <AppText
              text={calTime(data.timeStamps)}
              color={colors.black30}
              fontSize={10}
            />
          </View>
        </View>
      );
  }
};

export default NotiComp;
