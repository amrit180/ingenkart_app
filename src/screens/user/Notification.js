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
  const renderItem = ({ item, index }) => {
    let displayHr =
      index > 0 &&
      getDays(user?.notification[index - 1].timeStamps) ==
        getDays(item.timeStamps);

    return (
      <View style={{ backgroundColor: colors.white }}>
        {!displayHr && (
          <View style={{ paddingHorizontal: w(0.05) }}>
            {getDays(item.timeStamps) !== 0 && (
              <Hr alignSelf="center" width={"100%"} borderWidth={0.5} />
            )}
            <AppText
              mt={h(0.01)}
              color={colors.black30}
              fontSize={13}
              text={
                getDays(item.timeStamps) == 0
                  ? "New"
                  : getDays(item.timeStamps) < 7
                  ? "This Week"
                  : getDays(item.timeStamps) < 30
                  ? "This Month"
                  : "All"
              }
            />
          </View>
        )}
        <NotiComp variant={item.type.toLowerCase()} data={item} />
      </View>
    );
  };

  return (
    <Layout>
      <StackHomeHeader name="Activity" />
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
          // <></>
          <Image
            source={empty}
            style={{ height: 300, width: "100%" }}
            resizeMode="contain"
          />
        )}
      </View>
    </Layout>
  );
};

export default Notification;
