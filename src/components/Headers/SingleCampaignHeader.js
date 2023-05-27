import { View, Pressable, Image, TouchableOpacity } from "react-native";
import React from "react";
import { backArrow, greyshare, report } from "../../container/icons";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { useSelector } from "react-redux";
import Icon from "../Icon";
import { global } from "../../styles";
import AppText from "../AppText";
import { useNavigation } from "@react-navigation/native";
import Hr from "../Hr";

const SingleCampaignHeader = ({ brandName, brandPic, right = true }) => {
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
            zIndex: 1000,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={[
              global.start,
              {
                height: h(0.08),
              },
            ]}
          >
            <Icon name={backArrow} size={w(0.1)} />
          </View>
        </TouchableOpacity>
        <View style={global.center}>
          {brandPic && (
            <Image
              source={{ uri: brandPic }}
              style={{ height: w(0.08), width: w(0.08), borderRadius: 100 }}
            />
          )}
          <AppText
            text={brandName}
            fontFamily={"Montserrat_700Bold"}
            fontSize={15}
            ml={w(0.02)}
            color={colors.black}
          />
        </View>
        {right ? (
          <Pressable>
            {/* <Icon name={greyshare} size={w(0.09)} /> */}
          </Pressable>
        ) : (
          <Pressable>
            <Icon name={report} size={w(0.09)} />
          </Pressable>
        )}
      </View>
      <Hr alignSelf="center" width={"100%"} borderWidth={0.5} />
    </>
  );
};

export default SingleCampaignHeader;
