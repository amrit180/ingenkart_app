import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../assets/colors";
import Icon from "./Icon";
import { search, slider } from "../container/icons";
import { h, w } from "../config/utilFunction";
import { global } from "../styles";
import Hr from "./Hr";

const Search = ({
  filter,
  placeholder,
  icon,
  placeholderColor,
  onPress,
  onChangeText,
  value,
  onFocus,
}) => {
  if (filter) {
    return (
      <View style={[global.evenly, { marginTop: h(0.01) }]}>
        <View
          style={[
            global.start,
            {
              paddingHorizontal: w(0.02),
              borderWidth: 1,
              borderColor: "rgba(226, 226, 226, 1)",
              borderRadius: 5000,
              width: w(0.7),
              backgroundColor: colors.white,
              height: h(0.06),
            },
          ]}
        >
          {icon && <Icon name={search} size={w(0.07)} />}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            onChangeText={onChangeText}
            value={value}
            onFocus={onFocus}
            style={{
              color: colors.black,
              height: h(0.05),
              flex: 1,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: h(0.06),
            backgroundColor: colors.white,
            width: w(0.2),
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "rgba(226, 226, 226, 1)",
            borderRadius: 5000,
          }}
        >
          <Icon name={slider} size={w(0.07)} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{ backgroundColor: colors.white }}>
        <View
          style={[
            global.evenly,
            { backgroundColor: colors.white, paddingVertical: h(0.01) },
          ]}
        >
          <View
            style={[
              global.start,
              {
                paddingHorizontal: w(0.02),
                borderWidth: 1,
                borderColor: colors.searchborder,
                borderRadius: 5000,
                width: w(0.9),
                backgroundColor: colors.searchbg,
              },
            ]}
          >
            {icon && <Icon name={search} size={w(0.07)} />}
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={placeholderColor}
            />
          </View>
        </View>
        <Hr alignSelf="center" width={"100%"} borderWidth={0.5} mt={h(0.01)} />
      </View>
    );
  }
};

export default Search;
