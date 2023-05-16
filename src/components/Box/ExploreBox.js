import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { global } from "../../styles";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import AppText from "../AppText";

import ChooseImage from "../ChooseImage";
import { useNavigation } from "@react-navigation/native";
import { data } from "../../assets/data/CategoryData";

const ExploreBox = () => {
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
            text="Explore Creators"
          />
          <AppText
            fontSize={13}
            text="Chose desired category to explore and collaborate with
            industry leading influencers."
            color={colors.black70}
          />
        </View>
      </View>
      <View style={[global.between, { flexWrap: "wrap" }]}>
        {data.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigation.navigate("Discover", { categoryName: item.name })
            }
          >
            <ChooseImage
              mt={h(0.07)}
              name={item.image}
              bheight={0.13}
              iheight={0.125}
              bwidth={0.4}
              iwidth={0.39}
              height={0.18}
              width={0.3}
              check={false}
              top={60}
              txtcolor="rgba(121, 121, 121, 1)"
              text={item.name}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ExploreBox;
