import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import AppText from "../AppText";
import Icon from "../Icon";
import { nextArrow } from "../../container/icons";
import { global } from "../../styles";
import WishlistCard from "../Card/WishlistCard";
import SquareCard from "../Card/SquareCard";
import { LinearGradient } from "expo-linear-gradient";
import { team_marketing } from "../../container/images";
import BoxShadow from "../BoxShadow";
import { useNavigation } from "@react-navigation/native";

const CreateBox = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: colors.white,
        paddingVertical: h(0.03),
        paddingHorizontal: w(0.05),
      }}
    >
      <View style={[global.between, { marginBottom: h(0.03) }]}>
        <View>
          <AppText
            fontFamily={"Poppins_600SemiBold"}
            fontSize={26}
            text="Create."
          />
          <AppText
            fontSize={13}
            text="Kickstart your journey with shiny new campaign."
            color={colors.black70}
          />
        </View>
        <Pressable onPress={() => navigation.navigate("CreateCampaign")}>
          <Icon name={nextArrow} size={w(0.07)} />
        </Pressable>
      </View>
      <View>
        <LinearGradient
          useAngle={true}
          angle={135}
          angleCenter={{ x: 0.7, y: 0.9 }}
          style={{
            width: "100%",
            height: h(0.25),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
          colors={["rgba(252, 132, 226, .8)", "rgba(255, 223, 52, 1)"]}
        >
          <View
            style={{
              width: "96%",
              height: h(0.232),
              backgroundColor: colors.white30,
              borderRadius: 14,
              position: "relative",
            }}
          >
            <AppText
              text="Let's Begin"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={26}
              ml={w(0.04)}
              mt={h(0.015)}
            />
            <AppText
              text={"Create a campaign, hire" + "\n" + "influencers"}
              color={colors.graytxt}
              fontSize={13}
              ml={w(0.04)}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate("CreateCampaign")}
              style={{
                backgroundColor: colors.white30,
                width: w(0.2),
                height: h(0.035),
                marginLeft: w(0.04),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 7,
                marginTop: h(0.06),
              }}
            >
              <AppText
                text="Create"
                fontFamily={"Poppins_600SemiBold"}
                fontSize={15}
                mt={2}
              />
            </TouchableOpacity>
            <Image
              source={team_marketing}
              style={{
                height: h(0.3),
                width: "80%",
                top: -h(0.06),
                position: "absolute",
                right: -w(0.05),
              }}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>
        <BoxShadow width={"100%"} height={h(0.25)} top={h(0.005)} radius={20} />
      </View>
    </View>
  );
};

export default CreateBox;
