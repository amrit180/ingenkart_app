import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import Icon from "../Icon";
import {
  age,
  barter,
  blackeye,
  blackplus,
  facebook,
  followers,
  instagram,
  location,
  tick,
  yellowtick,
  youtube,
} from "../../container/icons";
import AppText from "../AppText";
import { global } from "../../styles";
import Avatar from "../Avatar";
import { useNavigation } from "@react-navigation/native";

const ExploreCard = ({ item, mb }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        elevation: 3,
        height: h(0.2),
        backgroundColor: colors.white,
        width: "100%",
        borderRadius: 20,
        marginBottom: mb,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flex: 0.7,
          paddingHorizontal: w(0.05),
        }}
      >
        <View style={[global.start, { marginTop: h(0.02) }]}>
          <Avatar
            variant="verifiedUser"
            icon={yellowtick}
            avatar={item?.profilePicture?.url}
            size={0.13}
            isize={0.05}
          />
          <View style={{ marginLeft: w(0.03) }}>
            <AppText text={item.name} fontFamily={"Poppins_500Medium"} />
            {/* <View style={global.start}>
              {item?.socialMedia?.includes("instagram") && (
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: 100,
                    width: w(0.035),
                    height: w(0.035),
                    overflow: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon name={instagram} size={w(0.05)} />
                </View>
              )}
              {item?.socialMedia.includes("youtube") && (
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: 100,
                    width: w(0.035),
                    height: w(0.035),
                    marginLeft: -w(0.005),
                    overflow: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon name={youtube} size={w(0.06)} />
                </View>
              )}
              {item?.socialMedia.includes("facebook") && (
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: 100,
                    width: w(0.035),
                    height: w(0.035),
                    marginLeft: -w(0.005),
                    overflow: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon name={facebook} size={w(0.05)} />
                </View>
              )}
            </View> */}
          </View>
        </View>
        <View style={[global.center, { marginTop: h(0.025) }]}>
          <View style={global.center}>
            <Icon name={location} size={w(0.04)} />
            <AppText
              ml={w(0.01)}
              fontFamily={"Montserrat_500Medium"}
              fontSize={10}
              text={"Location: " + item?.state}
              color={"rgba(139, 139, 139, 1)"}
            />
          </View>

          <View style={[global.center, { marginHorizontal: w(0.05) }]}>
            <Icon name={barter} size={w(0.04)} />
            <AppText
              ml={w(0.01)}
              fontFamily={"Montserrat_500Medium"}
              fontSize={10}
              text={`Barter: ${item?.barterAvailiblity ? "Yes" : "No"} `}
              color={"rgba(139, 139, 139, 1)"}
            />
          </View>
          <View style={global.center}>
            <Icon name={followers} size={w(0.04)} />
            <AppText
              ml={w(0.01)}
              fontFamily={"Montserrat_500Medium"}
              fontSize={10}
              text={`Campaigns: ${item?.userProfile?.campaignsJoined?.length}`}
              color={"rgba(139, 139, 139, 1)"}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          //   backgroundColor: colors.black,
          flex: 0.3,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PublicProfile", { id: item?._id });
          }}
          style={[
            global.center,
            {
              flex: 0.5,
              borderTopColor: colors.borderColor,
              borderTopWidth: 1,
              borderRightColor: colors.borderColor,
              borderRightWidth: 1,
            },
          ]}
        >
          <Icon name={blackeye} size={w(0.05)} />
          <AppText
            text="View Profile"
            fontFamily={"Montserrat_500Medium"}
            ml={w(0.03)}
          />
        </TouchableOpacity>
        <View
          style={[
            global.center,
            {
              flex: 0.5,
              borderTopColor: colors.borderColor,
              borderTopWidth: 1,
            },
          ]}
        >
          <Icon name={blackplus} size={w(0.05)} />
          <AppText
            text="Connect"
            fontFamily={"Montserrat_500Medium"}
            ml={w(0.03)}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default ExploreCard;
