import { View, Pressable, Image, TouchableOpacity } from "react-native";
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

const SimpleHeader = ({ brandName, brandPic, right = true, onPress }) => {
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
        </View>
        <View style={global.center}>
          <AppText
            text={brandName}
            fontFamily={"Poppins_500Medium"}
            fontSize={17}
            color={colors.black}
          />
        </View>

        <TouchableOpacity style={{ width: w(0.09) }} onPress={onPress}>
          <AppText
            text={"Done"}
            textDecorationLine="underline"
            color={colors.chatBlue}
            textAlign="center"
            mt={h(0.01)}
            fontFamily={"Poppins_500Medium"}
            fontSize={12}
          />
        </TouchableOpacity>
      </View>
      <Hr alignSelf="center" width={"100%"} borderWidth={0.5} />
    </>
  );
};

export default SimpleHeader;
