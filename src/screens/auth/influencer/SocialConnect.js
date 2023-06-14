import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useRef } from "react";
import {
  AppText,
  AuthHeader,
  BoxShadow,
  Button,
  Icon,
  Layout,
} from "../../../components";
import { h, w } from "../../../config/utilFunction";
import colors from "../../../assets/colors";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { instagram, rightarrow, youtube } from "../../../container/icons";
import { global } from "../../../styles";
import { pressMove } from "../../../config/animation";

const SocialConnect = () => {
  const routesLength = useNavigationState((state) => state.routes.length);
  const { auth } = useSelector((s) => ({ ...s }));
  const navigation = useNavigation();
  const buttonRef = useRef(new Animated.Value(0)).current;
  const handleSubmit = () => {};
  return (
    <Layout>
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          paddingHorizontal: w(0.08),
        }}
      >
        <AuthHeader index={routesLength} progress={0.7} />
        <AppText
          fontFamily={"Poppins_600SemiBold"}
          fontSize={26}
          text="Connect Socials"
          mt={h(0.025)}
        />
        <AppText
          fontSize={13}
          text="By authenticating your social accounts, you'll get more your chance of being invited by brands to participate in Multiple Campaigns"
          color={colors.black50}
          mt={h(0.01)}
        />
        <TouchableOpacity
          style={{ position: "relative", marginTop: h(0.1) }}
          onPress={() => navigation.navigate("InstagramCheck")}
        >
          <View
            style={[
              global.between,
              {
                borderWidth: 1,
                borderColor: colors.black30,
                borderRadius: 15,
                width: "100%",
                height: h(0.065),
                backgroundColor: colors.white,
                paddingHorizontal: w(0.025),
              },
            ]}
          >
            <View style={[global.start]}>
              <Icon name={instagram} size={w(0.1)} />
              <AppText text={"Instagram"} fontSize={15} ml={w(0.02)} />
            </View>
            <Icon name={rightarrow} size={w(0.07)} />
          </View>
          <BoxShadow
            height={h(0.065)}
            width={"100%"}
            radius={13}
            top={h(0.003)}
          />
        </TouchableOpacity>
        <View style={{ position: "relative", marginTop: h(0.04) }}>
          <View
            style={[
              global.between,
              {
                borderWidth: 1,
                borderColor: colors.black30,
                borderRadius: 15,
                width: "100%",
                height: h(0.065),

                backgroundColor: colors.white,

                paddingHorizontal: w(0.025),
              },
            ]}
          >
            <View style={[global.start]}>
              <Icon name={youtube} size={w(0.1)} />
              <AppText text={"YouTube"} fontSize={15} ml={w(0.02)} />
            </View>
            <Icon name={rightarrow} size={w(0.07)} />
          </View>
          <BoxShadow
            height={h(0.065)}
            width={"100%"}
            radius={13}
            top={h(0.003)}
          />
        </View>
        {/* <View style={{ position: "relative", marginTop: h(0.04) }}>
          <View
            style={[
              global.between,
              {
                borderWidth: 1,
                borderColor: colors.black30,
                borderRadius: 15,
                width: "100%",
                height: h(0.065),

                backgroundColor: colors.white,

                paddingHorizontal: w(0.025),
              },
            ]}
          >
            <View style={[global.start]}>
              <Icon name={youtube} size={w(0.1)} />
              <AppText text={"YouTube"} fontSize={15} ml={w(0.02)} />
            </View>
            <Icon name={rightarrow} size={w(0.07)} />
          </View>
          <BoxShadow
            height={h(0.065)}
            width={"100%"}
            radius={13}
            top={h(0.003)}
          />
        </View> */}
        <TouchableOpacity
          activeOpacity={0.4}
          onPressIn={() => pressMove(buttonRef)}
          onPressOut={handleSubmit}
          style={{ alignSelf: "center", position: "absolute", bottom: h(0.15) }}
        >
          <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default SocialConnect;
