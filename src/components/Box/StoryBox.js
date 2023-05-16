import { View, FlatList, TouchableOpacity, Alert, Text } from "react-native";
import React from "react";
import { h, w } from "../../config/utilFunction";
import { global } from "../../styles";
import Avatar from "../Avatar";
import colors from "../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { memo } from "react";

const StoryBox = ({ data }) => {
  const navigation = useNavigation();
  const { user } = useSelector((t) => ({ ...t }));
  return (
    <View
      style={[
        global.start,
        {
          height: h(0.12),
          backgroundColor: colors.white,
        },
      ]}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item?._id?.toString()}
        ListHeaderComponent={() => {
          return (
            <Avatar
              onPress={() => {
                if (user?.accountType === "basic") alert("Upgrade your plan");
              }}
              variant="addstory"
              avatar={user?.profilePicture?.url}
              mr={w(0.03)}
              ml={w(0.04)}
            />
          );
        }}
        renderItem={({ item, index }) => {
          return (
            <Avatar
              variant={
                item?.seen?.includes(user?._id)
                  ? "inactivestory"
                  : "activestory"
              }
              avatar={item?.userId?.profilePicture?.url}
              mr={w(0.02)}
              ml={index == 0 ? w(0.04) : 0}
              onPress={() => navigation.navigate("Story", item?.posts)}
            />
          );
        }}
      />
    </View>
  );
};

export default memo(StoryBox);
