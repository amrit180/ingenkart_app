import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChatListItem, Hr, Layout, Search, SoloHeader } from "../../components";
import { useSelector } from "react-redux";
import colors from "../../assets/colors";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { global } from "../../styles";
import { h, w } from "../../config/utilFunction";
import { empty } from "../../container/images";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const ChatLists = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigation = useNavigation();
  const userId = user?._id;
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const q = query(
    collection(db, "userChatList"),
    where("userId", "==", userId),
    orderBy("timeStamps", "desc"),
    limit(10)
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLists(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          item?.isBlocked
            ? Alert.alert("You are not authorized to this chat")
            : navigation.navigate("MessageScreen", {
                id: item.id,
                uid: item.connectionId,
                name: item.receiverName,
                imageUrl: item.imageUrl,
                room: item.room,
                uploader: item.uploader,
                connectionId: item.connectionId,
                isClosed: item.isClosed,
              });
        }}
      >
        <ChatListItem item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <Layout>
      <StatusBar barStyle={"dark-content"} backgroundColor={colors.white} />
      <SoloHeader title={"Inbox"} />
      <Search
        filter={false}
        icon={true}
        placeholder="Search..."
        placeholderColor={colors.black30}
        onPress={() => SwipeSheet(-h(1))}
      />
      {loading ? (
        <View style={[global.center, { height: h(0.6), width: w(1) }]}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={"large"}
          />
        </View>
      ) : lists?.length == 0 ? (
        <Image
          source={empty}
          style={{ height: 200, width: "100%", marginTop: h(0.05) }}
          resizeMode="contain"
        />
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: colors.white }}>
              <Hr alignSelf="center" width={"90%"} borderWidth={0.5} />
            </View>
          )}
        />
      )}
    </Layout>
  );
};

export default ChatLists;
