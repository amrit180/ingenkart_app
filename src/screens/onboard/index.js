import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, Pressable } from "react-native";
import colors from "../../assets/colors";
import { AppText, Carousel, Icon, Layout } from "../../components";
import { h, w } from "../../config/utilFunction";

import { logo } from "../../container/icons";
import {
  firstonboard,
  secondonboard,
  thirdonboard,
} from "../../container/images";
import { useGetOnboardingStatus } from "../../hooks";
import { global } from "../../styles";

const data = [
  {
    id: 1,
    image: firstonboard,
    text: "Create",
    content:
      "There is no boundaries when it comes to creativity. Creating content for entertainment, now take it to the next level!",
  },
  {
    id: 2,
    image: secondonboard,
    text: "Grow",
    content:
      "We have started from zero, so you can too! Let's create and grow together! ",
  },
  {
    id: 3,
    image: thirdonboard,
    text: "Earn",
    content: "Not sure how to make your efforts count? Now you have an answer!",
  },
];

const Onboard = ({ navigation }) => {
  const { setLaunchPad } = useGetOnboardingStatus();
  const skipToAuth = async () => {
    await AsyncStorage.setItem("@user_onboarded", "true")
      .then(() => {
        navigation.replace("AuthStack");
        setLaunchPad();
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <Layout>
      <View
      // style={{ backgroundColor: colors.white, height: "100%", width: w(1) }}
      >
        <View
          style={[
            global.between,
            { paddingHorizontal: w(0.05), paddingTop: h(0.025) },
          ]}
        >
          <Icon name={logo} size={w(0.13)} />
          <Pressable onPress={() => skipToAuth()}>
            <AppText fontFamily={"Inter_700Bold"} fontSize={14} text="Skip" />
          </Pressable>
        </View>
        <Carousel data={data} />
      </View>
    </Layout>
  );
};

export default Onboard;
