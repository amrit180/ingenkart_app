import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";

import AppText from "../../AppText";
import colors from "../../../assets/colors";
import { getDate, h, w } from "../../../config/utilFunction";
import UrlCard from "./UrlCard";
import { global } from "../../../styles";
import { ApproveOrReshoot } from "../../../functions/brand";
import { useSelector } from "react-redux";
import LinkCard from "./LinkCard";

const ChatCard = ({ item, side, displayPic, displayTime, uid, room }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const approveOrReject = async (isApproved) => {
    await ApproveOrReshoot(user?.token, {
      isApproved: isApproved,
      connectionId: uid,
      room: room,
      brandId: user?._id,
    }).catch((err) => console.log(err.response.data));
  };

  return (
    <Pressable style={{ marginTop: h(0.01) }}>
      {!displayTime && (
        <Text style={{ textAlign: "center", color: colors.hugColor40 }}>
          {getDate(item.timeStamps)}
        </Text>
      )}
      {!displayPic && (
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            borderRadius: 100,
            height: w(0.06),
            width: w(0.06),
            alignSelf: side === "right" ? "flex-end" : "flex-start",
            marginBottom: h(0.01),
            marginTop: h(0.02),
          }}
        />
      )}
      <View
        style={{
          backgroundColor:
            side === "right" ? colors.chatBlue : colors.receiverBg,
          maxWidth: "75%",
          alignSelf: side === "right" ? "flex-end" : "flex-start",
          borderRadius: 10,
          borderTopRightRadius: side === "right" ? 0 : 10,
          borderTopLeftRadius: side === "right" ? 10 : 0,
          paddingHorizontal: 12,
          paddingVertical: 7,
        }}
      >
        {item?.urlLinks?.length > 0 ? (
          <>
            <AppText
              text={"Caption & Notes"}
              fontFamily={"Poppins_600SemiBold"}
              fontSize={16}
              color={side === "right" ? colors.white : colors.black}
            />

            <AppText
              text={item.text}
              fontSize={13}
              color={side === "right" ? colors.white : colors.hugColor}
            />
          </>
        ) : (
          <AppText
            text={item.text}
            fontSize={13}
            color={side === "right" ? colors.white : colors.hugColor}
          />
        )}
      </View>
      {item?.urlLinks?.length > 0 &&
        (item.urlLinks[0].platform == "demo" ? (
          <>
            <UrlCard side={side} item={item} />
            {side !== "right" &&
            !item?.uploader?.isApproved &&
            !item?.uploader?.isReshoot ? (
              <View
                style={[
                  global.between,
                  { maxWidth: "75%", marginTop: h(0.01) },
                ]}
              >
                <TouchableOpacity
                  onPress={() => approveOrReject(false)}
                  style={{
                    backgroundColor: colors.white,
                    elevation: 4,
                    height: h(0.055),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 4,
                    width: w(0.32),
                  }}
                >
                  <AppText
                    text="Reshoot"
                    color={"rgba(129, 129, 129, 1)"}
                    fontFamily={"Poppins_500Medium"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => approveOrReject(true)}
                  style={{
                    backgroundColor: colors.chatBlue,
                    elevation: 4,
                    height: h(0.055),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 4,
                    width: w(0.32),
                  }}
                >
                  <AppText
                    text="Approve"
                    color={colors.white}
                    fontFamily={"Poppins_500Medium"}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </>
        ) : (
          <>
            <LinkCard item={item} side={side} />
          </>
        ))}

      {/* <Text>{JSON.stringify(item, null, 4)}</Text> */}
    </Pressable>
  );
};

export default ChatCard;
