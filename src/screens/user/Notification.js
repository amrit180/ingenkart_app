import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import {
  AppText,
  Hr,
  Layout,
  NotiComp,
  StackHomeHeader,
} from "../../components";

import colors from "../../assets/colors";
import { getDays, h, w } from "../../config/utilFunction";

import { useDispatch, useSelector } from "react-redux";
import { empty } from "../../container/images";
import { setNewNotification } from "../../redux/userSlice";

const Notification = () => {
  const { user } = useSelector((s) => ({ ...s }));
  let dispatch = useDispatch();
  console.log(user?.notification);
  useEffect(() => {
    dispatch(setNewNotification({ newNotification: false }));
  }, []);
  let isNewShown = false;
  let isWeekShown = false;
  let isMonthShown = false;
  let isAllShown = false;
  const renderItem = ({ item, index }) => {
    let label = "";
    let display = false;
    let displayNew = getDays(item.timeStamps) == 0;
    let displayWeek =
      getDays(item.timeStamps) > 0 && getDays(item.timeStamps) <= 7;
    let displayMonth =
      getDays(item.timeStamps) > 7 && getDays(item.timeStamps) <= 30;
    let displayAll = getDays(item.timeStamps) > 30;

    if (displayNew && !isNewShown) {
      label = "New";
      isNewShown = true;
      display = true;
    } else if (displayWeek && !isWeekShown) {
      label = "Week";
      isWeekShown = true;
      display = true;
    } else if (displayMonth && !isMonthShown) {
      label = "Month";
      isMonthShown = true;
      display = true;
    } else if (displayAll && !isAllShown) {
      label = "All";
      isAllShown = true;
      display = true;
    }

    return (
      <View style={{ backgroundColor: colors.white }}>
        {/* {displayAll && ( */}
        <View style={{ paddingHorizontal: w(0.05) }}>
          {index > 0 && display && (
            <Hr alignSelf="center" width={"100%"} borderWidth={1.6} />
          )}
          <AppText
            mt={display && h(0.01)}
            color={colors.black30}
            fontSize={10}
            text={label}
          />
        </View>
        {/* )} */}
        <NotiComp variant={item.type.toLowerCase()} data={item} />
      </View>
    );
  };

  return (
    <Layout>
      <StackHomeHeader name="Activity" user={user} />
      <View style={{ height: "100%", backgroundColor: colors.white }}>
        {user?.notification?.length > 0 ? (
          <FlatList
            data={user?.notification}
            keyExtractor={(item) =>
              item?.userId +
              Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) +
              1
            }
            renderItem={renderItem}
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: h(0.75),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={empty}
              style={{ height: 200, width: "100%", resizeMode: "contain" }}
              resizeMode="contain"
            />
          </View>
        )}
      </View>
    </Layout>
  );
};

export default Notification;
