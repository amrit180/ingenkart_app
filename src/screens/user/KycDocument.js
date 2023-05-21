import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import React, { useRef } from "react";
import {
  AppText,
  Button,
  Icon,
  Layout,
  SingleCampaignHeader,
} from "../../components";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { clicktoupload, upload } from "../../container/icons";
import { pressMove } from "../../config/animation";

const KycDocument = () => {
  const buttonRef = useRef(new Animated.Value(0)).current;
  let createCampaign;
  const handleSubmit = () => {};
  return (
    <Layout>
      <SingleCampaignHeader brandName={"Documents"} right={false} />
      <View style={{ paddingHorizontal: w(0.05), marginTop: h(0.05) }}>
        <AppText
          text={"Upload Documents"}
          fontSize={22}
          fontFamily={"Poppins_600SemiBold"}
        />
        <View
          style={{
            // flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            // onPress={openGallery}
            style={{
              borderWidth: 1,
              borderColor: colors.black30,
              height: h(0.25),
              borderRadius: 15,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: h(0.02),
            }}
          >
            {!createCampaign ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: h(0.05),
                }}
              >
                <Icon name={upload} size={w(0.15)} />
                <Icon name={clicktoupload} height={h(0.07)} width={w(0.3)} />
                <AppText
                  text="Preferred size (1600X1100) Maximum 10MB"
                  fontSize={9}
                  color={"rgba(56, 70, 100, .5)"}
                />
              </View>
            ) : (
              <Image
                source={{ uri: createCampaign?.campaignBanner }}
                style={{ height: h(0.25), borderRadius: 15, width: "100%" }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={openGallery}
            style={{
              borderWidth: 1,
              borderColor: colors.black30,
              height: h(0.25),
              borderRadius: 15,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: h(0.02),
            }}
          >
            {!createCampaign ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: h(0.05),
                }}
              >
                <Icon name={upload} size={w(0.15)} />
                <Icon name={clicktoupload} height={h(0.07)} width={w(0.3)} />
                <AppText
                  text="Preferred size (1600X1100) Maximum 10MB"
                  fontSize={9}
                  color={"rgba(56, 70, 100, .5)"}
                />
              </View>
            ) : (
              <Image
                source={{ uri: createCampaign?.campaignBanner }}
                style={{ height: h(0.25), borderRadius: 15, width: "100%" }}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.4}
          onPressIn={() => pressMove(buttonRef)}
          onPressOut={handleSubmit}
          style={{
            marginTop: h(0.03),
            alignSelf: "center",
          }}
        >
          <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default KycDocument;
