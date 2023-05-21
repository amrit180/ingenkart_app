import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Platform,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  ChatFooter,
  CreateCampaignHeader,
  Icon,
  ChatCard,
  SubmissionCard,
  MessageUploaderSheet,
  MessageFinalUploaderSheet,
  Layout,
  ChatInfoSheet,
  AppText,
  Input,
  Button,
} from "../../components";
import colors from "../../assets/colors";
import { send } from "../../container/icons";
import { getDate, h, w } from "../../config/utilFunction";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../firebase";
import { reportChat, sendChat } from "../../functions/user";
const MessageScreen = ({ route }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const { uid, id, imageUrl, name, room, uploader, connectionId, isClosed } =
    route.params;
  const [message, setMessage] = useState([]);
  const [chatClosed, setChatClosed] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const sheetRef = useRef(null);
  const nsheetRef = useRef(null);
  const chatsheetRef = useRef(null);
  const userId = user?._id;
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState("");

  const SwipeSheet = useCallback(async (value) => {
    sheetRef.current.scrollTo(value);
  }, []);
  const SwipeSheet2 = useCallback(async (value) => {
    nsheetRef.current.scrollTo(value);
  }, []);
  const SwipeSheet3 = useCallback(async (value) => {
    chatsheetRef.current.scrollTo(value);
  }, []);
  const q = query(
    collection(db, "messages"),
    where("connectionId", "==", uid),
    orderBy("timeStamps", "desc"),
    limit(20)
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessage(newMessages);
      setLastVisible(snapshot.docs[snapshot.docs?.length - 1]);
    });
    setLoading(false);

    return unsubscribe;
  }, []);

  const handleLoadMore = () => {
    collection("messages")
      .where("connectionId", "==", uid)
      .orderBy("timeStamps", "desc")
      .startAfter(lastVisible)
      .limit(20)
      .onSnapshot((snapshot) => {
        if (snapshot.size > 0) {
          let newMessages = [...messages];
          snapshot.forEach((doc) => {
            newMessages.push({ ...doc.data(), id: doc.id });
          });
          setMessage([...messages, ...newMessages]);
          console.log(JSON.stringify(newMessages, null, 4));

          setLastVisible(snapshot.docs[snapshot.docs?.length - 1]);
        } else {
          setFooter(true);
        }
      });
  };

  // formating data to send to server
  let data = {
    connectionId: uid,
    docModel: "User",
    imageUrl: user?.profilePicture?.url,
    senderId: userId,
    text: text,
    room: room,
    timeStamps: moment().format(),
    uploader: { ...uploader, isRequired: false },
    urlLinks: [],
  };

  const sendMessage = async () => {
    if (text.replace(/\s/g, "")?.length > 0) {
      await addDoc(collection(db, "messages"), data);
      if (updateId !== "") {
        await updateDoc(doc(db, "userChatList", id), {
          lastMessage: text,
          timeStamps: moment().format(),
        });
      }
      // await sendChat(data, user?.token)
      //   .then((res) => {
      //     console.log(res.data);
      //     if (res.data.success) {
      //       setText("");
      //     }
      //   })
      //   .catch((err) => console.log(err.message));
      setText("");
    }
  };
  // adding messages to firebase and database
  const handleSubmit = async (value) => {
    if (data) {
      data.urlLinks = value.links;
      data.text = value.text;
      data.uploader.status = true;
    }

    // console.log(data);
    await addDoc(collection(db, "messages"), data);
    if (updateId !== "") {
      await updateDoc(doc(db, "messages", updateId), {
        uploader: {
          ...uploader,
          status: true,
        },
      });
      await updateDoc(doc(db, "userChatList", id), {
        uploader: {
          ...uploader,
          status: true,
        },
        timeStamps: moment().format(),
      });
    }

    // await sendChat(data, user?.token)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data.success) {
    //       setText("");
    //     }
    //   })
    //   .catch((err) => console.log(err.message));
  };

  const reportChatforuser = () => {
    reportChat(user?.token, user?._id, connectionId, reason)
      .then((res) => {
        setReason("");
        setVisible(!visible);
        navigation.navigate("ChatStack");
      })
      .catch((err) => console.log(err.response.data));
  };

  const renderItem = ({ item, index }) => {
    let displayPic =
      index < message?.length - 1 &&
      message[index + 1].senderId == item.senderId;
    let displayTime =
      index < message?.length - 1 &&
      getDate(message[index + 1].createdAt) == getDate(item.createdAt);
    console.log(item.senderId, userId);
    return userId === item.senderId ? (
      item.uploader.isRequired ? (
        <SubmissionCard item={item} side={"right"} />
      ) : (
        <ChatCard
          room={room}
          uid={uid}
          item={item}
          side={"right"}
          displayPic={displayPic}
          displayTime={displayTime}
        />
      )
    ) : item.uploader.isRequired ? (
      <SubmissionCard
        item={item}
        side={"left"}
        onPress={() => {
          console.log(item.uploader.isRequired, item.uploader.status);
          if (
            item.uploader.isApproved == false &&
            item.uploader.isRequired &&
            item.uploader.status == false
          ) {
            SwipeSheet(-h(0.72));
            setUpdateId(item.id);
          } else if (
            item.uploader.isApproved == true &&
            item.uploader.status == false
          ) {
            SwipeSheet2(-h(0.72));
            setUpdateId(item.id);
          }
        }}
      />
    ) : (
      <ChatCard
        room={room}
        uid={uid}
        item={item}
        side={"left"}
        displayPic={displayPic}
        displayTime={displayTime}
      />
    );
  };
  return (
    <Layout>
      <CreateCampaignHeader
        avatar={imageUrl}
        headerName={name}
        index={3}
        mt={Platform.OS === "android" ? 0 : h(0.05)}
        rightPress={() => SwipeSheet3(-h(0.5))}
      />
      {Platform.OS === "ios" && (
        <View
          style={{
            backgroundColor: colors.white,
            height: 50,
            width: "100%",
            zIndex: 10000,
            position: "absolute",
          }}
        />
      )}
      <Pressable
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
          backgroundColor: colors.white,
        }}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior={Platform.OS == "ios" && "padding"}
        >
          <FlatList
            data={message}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            inverted={true}
            ListFooterComponent={() => {
              return <ChatFooter name={name} avatar={imageUrl} />;
            }}
            contentContainerStyle={{
              paddingHorizontal: w(0.05),
              paddingBottom: h(0.4),
              paddingTop: h(0.05),
            }}
          />
          {isClosed == false && (
            <Pressable
              style={{
                flexDirection: "row",
                height: w(0.2),
                width: "100%",
                backgroundColor: colors.white,
                elevation: 4,
                alignItems: "center",
                paddingHorizontal: w(0.07),
                borderTopWidth: 1,
                borderTopColor: colors.black10,
              }}
            >
              <TextInput
                style={{
                  backgroundColor: colors.resend20,
                  width: w(0.75),
                  marginRight: w(0.05),
                  borderRadius: 23,
                  color: colors.black,
                  paddingLeft: w(0.03),
                  height: h(0.05),
                }}
                placeholder="Reply..."
                placeholderTextColor="rgba(13, 8, 44, 0.6)"
                value={text}
                onChangeText={(text) => setText(text)}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Icon name={send} size={38} />
              </TouchableOpacity>
            </Pressable>
          )}
        </KeyboardAvoidingView>
      </Pressable>
      <MessageUploaderSheet childref={sheetRef} handleSubmit={handleSubmit} />
      <MessageFinalUploaderSheet
        childref={nsheetRef}
        handleSubmit={handleSubmit}
      />
      <ChatInfoSheet
        childref={chatsheetRef}
        item={route.params}
        setChatClosed={setChatClosed}
        chatClosed={chatClosed}
        setVisible={setVisible}
      />
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setVisible(!visible)}
        collapsable={true}
      >
        <Pressable
          style={{
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Input
            variant={"text"}
            width={0.7}
            height={0.25}
            textAlign={"left"}
            type="outline"
            placeholder={"Issue?"}
            fontSize={16}
            multiline={true}
            value={reason}
            onChangeText={(t) => setReason(t)}
          />
          <Button
            onPress={reportChatforuser}
            variant={"standard"}
            name={"Submit"}
            width={w(0.7)}
            height={h(0.07)}
            mt={10}
          />
        </Pressable>
      </Modal>
    </Layout>
  );
};

export default MessageScreen;
