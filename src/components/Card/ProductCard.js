import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { h, w } from "../../config/utilFunction";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../AppText";
import colors from "../../assets/colors";

const ProductCard = ({ url, price, name }) => {
  return (
    <View
      style={{
        width: w(0.8),
        height: h(0.25),
        borderRadius: 15,
        overflow: "hidden",
        marginRight: w(0.03),
      }}
    >
      <ImageBackground
        source={{ uri: url }}
        style={{
          width: w(0.8),
          height: h(0.27),
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        {name && (
          <LinearGradient
            colors={[
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0)",

              "rgba(0,0,0,0.3)",
            ]}
            style={{
              width: w(0.8),
              height: h(0.27),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              paddingHorizontal: w(0.05),
            }}
          >
            <AppText
              text={name}
              color={colors.white}
              mb={h(0.03)}
              fontFamily={"Montserrat_700Bold"}
              fontSize={12}
            />
            <AppText
              text={"₹" + price}
              color={colors.white}
              mb={h(0.03)}
              fontFamily={"Montserrat_700Bold"}
              fontSize={12}
            />
          </LinearGradient>
        )}
      </ImageBackground>
    </View>
  );
};

export default ProductCard;
