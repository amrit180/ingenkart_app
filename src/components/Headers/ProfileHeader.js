import { View, Pressable } from "react-native";
import React from "react";
import { backArrow, greyshare } from "../../container/icons";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { useSelector } from "react-redux";
import Icon from "../Icon";
import { global } from "../../styles";
import AppText from "../AppText";
import { useNavigation } from "@react-navigation/native";
import Hr from "../Hr";

const ProfileHeader = ({ name }) => {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  return (
    <>
      <View
        style={[
          global.between,

          {
            backgroundColor: colors.white,
            paddingHorizontal: w(0.05),
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            backgroundColor: colors.white,
            shadowOpacity: 0.03,
            shadowRadius: 1.41,
            borderBottomColor: "rgba(0,0,0,0.07)",
            borderBottomWidth: 0.5,
          },
        ]}
      >
        <View
          style={[
            global.start,
            {
              height: h(0.06),
            },
          ]}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name={backArrow} size={w(0.08)} />
          </Pressable>
          <AppText
            text={`@${name}`}
            fontFamily={"Montserrat_500Medium"}
            fontSize={16}
            ml={w(0.02)}
            color={"rgba(101, 101, 101, 1)"}
          />
        </View>
        <Pressable>{/* <Icon name={greyshare} size={w(0.09)} /> */}</Pressable>
      </View>
    </>
  );
};

export default ProfileHeader;
