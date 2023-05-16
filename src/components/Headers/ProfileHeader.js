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
  // console.log(JSON.stringify(user));
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
            <Icon name={backArrow} size={w(0.1)} />
          </Pressable>
          <AppText
            text={`@${name}`}
            fontFamily={"Montserrat_500Medium"}
            fontSize={19}
            ml={w(0.02)}
            color={"rgba(101, 101, 101, 1)"}
          />
        </View>
        <Pressable>
          <Icon name={greyshare} size={w(0.09)} />
        </Pressable>
      </View>
      <Hr alignSelf="center" width={"100%"} borderWidth={0.5} />
    </>
  );
};

export default ProfileHeader;
