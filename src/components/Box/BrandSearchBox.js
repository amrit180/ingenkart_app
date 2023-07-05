import { View, Text, Pressable, Switch, ScrollView, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AppText from "../AppText";
import ChooseImage from "../ChooseImage";
import {
  checkIcon,
  facebook,
  instagram,
  radio,
  verified,
  youtube,
} from "../../container/icons";
import { h, w } from "../../config/utilFunction";
import { global } from "../../styles";
import BoxShadow from "../BoxShadow";
import colors from "../../assets/colors";
import Icon from "../Icon";
import Hr from "../Hr";
import RangeSlider from "../RangeSlider";
import Button from "../Button";

const data = [
  {
    id: 1,
    name: "Instagram",
    icon: instagram,
  },
  {
    id: 2,
    name: "Youtube",
    icon: youtube,
  },
  {
    id: 3,
    name: "Facebook",
    icon: facebook,
  },
];

const sortType = [
  {
    id: 1,
    name: "Most to least influencers",
    value: "Most to least influencers",
    sort: {
      sortBy: "influencer",
      sortOrder: "desc",
    },
  },
  {
    id: 2,
    name: "Least to most influencers",
    value: "Least to most influencers",
    sort: {
      sortBy: "influencer",
      sortOrder: "asc",
    },
  },
  {
    id: 3,
    name: "Budget High to Low",
    value: "Budget High to Low",
    sort: {
      sortBy: "budget",
      sortOrder: "desc",
    },
  },
  {
    id: 4,
    name: "Budget Low to High",
    value: "Budget Low to High",
    sort: {
      sortBy: "budget",
      sortOrder: "asc",
    },
  },
];

const BrandSearchBox = ({ setFilter, scrollTo, onPress, filter }) => {
  useEffect(() => {
    setFilter({ ...filter, isEnabled: false });
  }, []);
  const toggleSwitch = () =>
    setFilter({ ...filter, isEnabled: !filter.isEnabled });

  const handleClear = () => {
    setFilter(null);
  };
  const handleFilter = () => {
    onPress();
  };
  return (
    <View style={{ height: h(0.9) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText
          text="Search filters"
          fontFamily={"Poppins_600SemiBold"}
          fontSize={24}
        />
        <View style={global.between}>
          {data.map((item, i) => (
            <Pressable
              key={i}
              onPress={() => setFilter({ ...filter, active: item.name })}
            >
              <View
                style={[
                  global.center,
                  {
                    flexDirection: "column",
                    width: w(0.25),
                    height: h(0.075),
                    borderRadius: 15,
                    borderColor:
                      item.name === filter?.active
                        ? colors.borderYellow
                        : colors.black30,
                    borderWidth: 1,
                    backgroundColor: colors.white,
                  },
                ]}
              >
                <Icon name={item.icon} size={w(0.08)} />
                <AppText
                  text={item.name}
                  fontSize={10}
                  fontFamily={"Poppins_500Medium"}
                />
              </View>
              <BoxShadow
                height={h(0.075)}
                width={w(0.25)}
                radius={15}
                top={h(0.003)}
              />
              {item.name === filter?.active && (
                <Image
                  source={checkIcon}
                  style={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    resizeMode: "contain",
                  }}
                />
              )}
            </Pressable>
          ))}
        </View>
        <View style={{ marginTop: h(0.03) }}>
          <View
            style={{
              height: h(0.19),
              width: "100%",
              borderColor: colors.borderColor,
              borderWidth: 1,
              borderRadius: 15,
              paddingHorizontal: w(0.05),
              paddingVertical: h(0.015),
              backgroundColor: colors.white,
            }}
          >
            {sortType?.map((item, i) => (
              <Pressable
                key={i}
                onPress={() => setFilter({ ...filter, filterType: item.sort })}
              >
                <View style={global.between}>
                  <AppText
                    text={item.name}
                    color={colors.black50}
                    fontSize={11}
                  />
                  <Icon
                    name={filter?.filterType === item.sort ? verified : radio}
                    size={w(0.04)}
                  />
                </View>
                {i < sortType?.length - 1 && (
                  <Hr
                    width={"100%"}
                    borderWidth={1}
                    mt={h(0.01)}
                    mb={h(0.01)}
                  />
                )}
              </Pressable>
            ))}
          </View>
          <BoxShadow height={h(0.19)} width="100%" radius={15} top={h(0.003)} />
        </View>
        <View style={{ marginTop: h(0.03) }}>
          <View
            style={{
              height: h(0.06),
              width: "100%",
              borderColor: colors.borderColor,
              borderWidth: 1,
              borderRadius: 15,
              paddingHorizontal: w(0.05),
              // paddingVertical: h(0.018),
              justifyContent: "center",
              backgroundColor: colors.white,
            }}
          >
            <View style={global.between}>
              <AppText
                text={"Barter"}
                fontFamily={"Poppins_500Medium"}
                fontSize={13}
              />
              <Switch
                trackColor={{
                  false: "rgba(216, 216, 216, 1)",
                  true: colors.green,
                }}
                thumbColor={colors.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={filter?.isEnabled}
              />
            </View>
          </View>
          <BoxShadow height={h(0.06)} width="100%" radius={15} top={h(0.003)} />
        </View>
        {/* <View style={{ marginTop: h(0.02) }}>
          <AppText text={"Price Range"} fontFamily={"Poppins_500Medium"} />
          <RangeSlider from={1} to={3000} />
        </View>
        <View style={{ marginTop: h(0.02) }}>
          <AppText text={"Follower Range"} fontFamily={"Poppins_500Medium"} />
          <RangeSlider from={1} to={3000} />
        </View> */}
        <View
          style={{
            height: h(0.1),
            width: "100%",
            flexDirection: "row",
            marginTop: h(0.03),
            marginBottom: h(0.03),
          }}
        >
          <View
            style={[
              {
                flex: 0.5,

                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Button
              onPress={handleClear}
              variant={"outline"}
              height={h(0.065)}
              width={w(0.4)}
              fontSize={16}
              name="Clear Filters"
            />
          </View>
          <View
            style={[
              {
                flex: 0.5,

                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Button
              onPress={() => {
                handleFilter();
                scrollTo(0);
              }}
              variant={"standard"}
              height={h(0.065)}
              width={w(0.4)}
              name="Filter"
              fontSize={16}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BrandSearchBox;
