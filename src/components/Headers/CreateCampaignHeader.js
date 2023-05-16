import { View, Pressable, Image } from "react-native";
import React from "react";
import {
  backArrow,
  backcross,
  checkIcon,
  greyshare,
  nextArrow,
  threedots,
} from "../../container/icons";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { useSelector } from "react-redux";
import Icon from "../Icon";
import { global } from "../../styles";
import AppText from "../AppText";

import { useNavigation } from "@react-navigation/native";
import Hr from "../Hr";
import Avatar from "../Avatar";

const CreateCampaignHeader = ({
  index,
  avatar,
  headerName,
  mt,
  rightPress,
  handleSubmit,
}) => {
  const navigation = useNavigation();
  if (index == 0) {
    return (
      <>
        <View
          style={[
            global.between,

            {
              backgroundColor: colors.white,
              paddingHorizontal: w(0.05),
            },
          ]}
        >
          <View
            style={[
              global.start,
              {
                height: h(0.08),
              },
            ]}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name={index == 0 ? backcross : backArrow}
                size={index == 0 ? w(0.08) : w(0.1)}
              />
            </Pressable>
          </View>
          <View style={global.center}>
            <AppText
              text="Create Campaign"
              fontFamily={"Montserrat_700Bold"}
              fontSize={15}
              ml={w(0.02)}
              color={colors.black}
            />
          </View>
          <Pressable onPress={handleSubmit}>
            <Icon name={nextArrow} size={w(0.09)} />
          </Pressable>
        </View>
        <Hr alignSelf="center" width={"100%"} borderWidth={0.5} />
      </>
    );
  } else if (index == 1) {
    return (
      <>
        <View
          style={[
            global.between,

            {
              backgroundColor: colors.white,
              paddingHorizontal: w(0.05),
            },
          ]}
        >
          <View
            style={[
              global.start,
              {
                height: h(0.08),
              },
            ]}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name={index == 0 ? backcross : backArrow}
                size={index == 0 ? w(0.08) : w(0.1)}
              />
            </Pressable>
          </View>
          <View style={global.center}>
            <AppText
              text="Influencer Info"
              fontFamily={"Montserrat_700Bold"}
              fontSize={15}
              ml={w(0.02)}
              color={colors.black}
            />
          </View>
          <Pressable onPress={handleSubmit}>
            <Icon name={nextArrow} size={w(0.09)} />
          </Pressable>
        </View>
        <Hr alignSelf="center" width={"100%"} borderWidth={0.5} />
      </>
    );
  } else if (index == 2) {
    return (
      <>
        <View
          style={[
            global.between,

            {
              backgroundColor: colors.white,
              paddingHorizontal: w(0.05),
            },
          ]}
        >
          <View
            style={[
              global.start,
              {
                height: h(0.08),
              },
            ]}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name={index == 0 ? backcross : backArrow}
                size={index == 0 ? w(0.08) : w(0.1)}
              />
            </Pressable>
          </View>
          <View style={global.center}>
            <AppText
              text="Campaign Media"
              fontFamily={"Montserrat_700Bold"}
              fontSize={15}
              ml={w(0.02)}
              color={colors.black}
            />
          </View>
          <Pressable>
            {/* <Icon name={nextArrow} size={w(0.09)} /> */}
          </Pressable>
        </View>
        <Hr alignSelf="center" width={"100%"} borderWidth={0.5} />
      </>
    );
  } else if (index == 3) {
    return (
      <View style={{ position: "absolute", zIndex: 1000, width: "100%" }}>
        <View
          style={[
            global.between,

            {
              backgroundColor: colors.white,
              paddingHorizontal: w(0.05),
              marginTop: mt || 0,
            },
          ]}
        >
          <View
            style={[
              global.start,
              {
                height: h(0.08),
              },
            ]}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name={index == 0 ? backcross : backArrow}
                size={index == 0 ? w(0.08) : w(0.1)}
              />
            </Pressable>
          </View>
          <View style={global.center}>
            <Avatar
              avatar={avatar}
              variant="verifiedUser"
              size={0.09}
              icon={checkIcon}
              isize={0.03}
            />
            <AppText
              text={headerName}
              fontFamily={"Montserrat_700Bold"}
              fontSize={15}
              ml={w(0.02)}
              color={colors.black}
            />
          </View>
          <Pressable onPress={rightPress}>
            <Icon name={threedots} size={w(0.07)} />
          </Pressable>
        </View>
        <Hr alignSelf="center" width={"100%"} borderWidth={0.5} />
      </View>
    );
  } else if (index == 4) {
    return (
      <View style={{ zIndex: 1000, width: "100%" }}>
        <View
          style={[
            global.between,

            {
              backgroundColor: colors.white,
              paddingHorizontal: w(0.05),
              marginTop: mt || 0,
            },
          ]}
        >
          <View
            style={[
              global.start,
              {
                height: h(0.08),
              },
            ]}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name={index == 0 ? backcross : backArrow}
                size={index == 0 ? w(0.08) : w(0.1)}
              />
            </Pressable>
          </View>
          <View style={global.center}>
            <AppText
              text={headerName}
              fontFamily={"Montserrat_700Bold"}
              fontSize={15}
              ml={w(0.02)}
              color={colors.black}
            />
          </View>
          <Pressable></Pressable>
        </View>
        <Hr alignSelf="center" width={"100%"} borderWidth={0.5} />
      </View>
    );
  }
};

export default CreateCampaignHeader;
