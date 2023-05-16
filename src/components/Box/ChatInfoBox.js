import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../../assets/colors";
import { h } from "../../config/utilFunction";
import Hr from "../Hr";
import AppText from "../AppText";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { blockChat, closeChat, reportChat } from "../../functions/user";

import { Modal, Portal, Button, PaperProvider } from "react-native-paper";

const ChatInfoBox = ({ item, chatClosed, setChatClosed, setVisible }) => {
  const navigation = useNavigation();
  const { user } = useSelector((s) => ({ ...s }));

  const closeChatFromBrand = () => {
    closeChat(user?.token, item.connectionId)
      .then((res) => {
        setChatClosed(true);
        navigation.navigate("ChatStack");
      })
      .catch((err) => console.log(err.response.data));
  };
  const blockChatforuser = () => {
    blockChat(user?.token, user?._id, item.connectionId)
      .then((res) => {
        navigation.navigate("ChatStack");
      })
      .catch((err) => console.log(err.response.data));
  };
  const reportChatforuser = () => {
    setVisible(true);
  };

  return (
    <>
      {/* modal end */}
      <TouchableOpacity
        onPress={reportChatforuser}
        style={{
          height: h(0.5) / 5,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppText text={"Report Chat"} color={colors.danger} fontSize={20} />
      </TouchableOpacity>
      <Hr width={"90%"} alignSelf="center" borderWidth={1} />
      <TouchableOpacity
        onPress={blockChatforuser}
        style={{
          height: h(0.5) / 5,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppText text={"Block Chat"} color={colors.danger} fontSize={20} />
      </TouchableOpacity>
      <Hr width={"90%"} alignSelf="center" borderWidth={1} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SingleCampaign", {
            id: item.connectionId.split(item.room)[1],
          });
          console.log(item.connectionId.split(item.room)[1]);
        }}
        style={{
          //   backgroundColor: colors.black,
          height: h(0.5) / 5,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppText text={"View campaign details"} fontSize={20} />
      </TouchableOpacity>
      <Hr width={"90%"} alignSelf="center" borderWidth={1} />
      {user?.role === "influencer" ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BrandProfile", {
              id: item.room.split(user?._id)[0],
            });
            console.log(item.room.split(user?._id)[0]);
          }}
          style={{
            //   backgroundColor: colors.black,
            height: h(0.5) / 5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText text={"View brand details"} fontSize={20} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            closeChatFromBrand();
          }}
          style={{
            //   backgroundColor: colors.black,
            height: h(0.5) / 5,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText text={"Stop Chat"} fontSize={20} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default ChatInfoBox;
