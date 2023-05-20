import { View, Text, Pressable, Switch, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import AppText from "../AppText";
import ChooseImage from "../ChooseImage";
import {
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
    sortBy: "influencer",
    sortOrder: "desc",
  },
  {
    id: 2,
    name: "Least to most influencers",
    value: "Least to most influencers",
    sortBy: "influencer",
    sortOrder: "asc",
  },
  {
    id: 3,
    name: "Budget High to Low",
    value: "Budget High to Low",
    sortBy: "budget",
    sortOrder: "desc",
  },
  {
    id: 4,
    name: "Budget Low to High",
    value: "Budget Low to High",
    sortBy: "budget",
    sortOrder: "asc",
  },
];

const BrandSearchBox = ({ setFilter, scrollTo }) => {
  const [filterType, setFilterType] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [active, setActive] = useState("");

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  console.log(filterType, isEnabled, active);
  const handleClear = () => {
    setFilterType("");
    setIsEnabled(false);
    setActive("");
  };
  const handleFilter = () => {
    setFilter({
      filterType,
      isEnabled,
      active,
    });
  };
  return (
    <View style={{ height: h(0.9) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText
          text="Search filters"
          fontFamily={"Poppins_600SemiBold"}
          fontSize={26}
        />
        <View style={global.between}>
          {data.map((item, i) => (
            <Pressable key={i} onPress={() => setActive(item.name)}>
              <ChooseImage
                radius={15}
                ft={10}
                bheight={0.09}
                iheight={0.085}
                iwidth={0.25}
                bwidth={0.26}
                txttop={h(0.02)}
                top={10}
                name={item.icon}
                height={0.1}
                width={0.12}
                check={item.name === active}
                text={item.name}
              />
            </Pressable>
          ))}
        </View>
        <View style={{ marginTop: h(0.03) }}>
          <View
            style={{
              height: h(0.21),
              width: "100%",
              borderColor: colors.borderColor,
              borderWidth: 1,
              borderRadius: 15,
              paddingHorizontal: w(0.05),
              paddingVertical: h(0.018),
              backgroundColor: colors.white,
            }}
          >
            {sortType?.map((item, i) => (
              <Pressable key={i} onPress={() => setFilterType(item.value)}>
                <View style={global.between}>
                  <AppText
                    text={item.name}
                    color={colors.black50}
                    fontSize={13}
                  />
                  <Icon
                    name={filterType === item.value ? verified : radio}
                    size={w(0.05)}
                  />
                </View>
                {i < sortType?.length - 1 && (
                  <Hr
                    width={"100%"}
                    borderWidth={0.5}
                    mt={h(0.01)}
                    mb={h(0.01)}
                  />
                )}
              </Pressable>
            ))}
          </View>
          <BoxShadow height={h(0.21)} width="100%" radius={15} top={h(0.003)} />
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
                fontSize={15}
              />
              <Switch
                trackColor={{
                  false: "rgba(216, 216, 216, 1)",
                  true: colors.green,
                }}
                thumbColor={colors.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
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
              height={h(0.07)}
              width={w(0.38)}
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
              height={h(0.07)}
              width={w(0.38)}
              name="Filter"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BrandSearchBox;
