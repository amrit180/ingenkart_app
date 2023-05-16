import {
  ScrollView,
  TouchableOpacity,
  View,
  RefreshControl,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import {
  CampaignBox,
  CreateBox,
  CreatorBox,
  ExploreBox,
  HomeHeader,
  Hr,
  Icon,
  StoryBox,
  Layout,
} from "../../components";
import StoryData from "../../assets/data/StoryData";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { getCampaign } from "../../functions/campaign";
import { getStoryAPI } from "../../functions/user";
import TopCreator from "../../assets/data/TopCreator";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../container/icons";
import { setNewNotification, setNotifications } from "../../redux/userSlice";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

const BHomepage = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => ({ ...state }));
  const [campaign, setCampaign] = useState([]);
  const [storyData, setStoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  let dispatch = useDispatch();
  const queryRef = query(
    collection(db, "notifications"),
    where("userId", "==", user?._id),
    orderBy("timeStamps", "desc"),
    limit(10)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const newMessages = snapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // console.log(newMessages);
      dispatch(
        setNewNotification({
          newNotification: newMessages.length !== user?.notification?.length,
        })
      );
      dispatch(
        setNotifications({
          notification: newMessages,
        })
      );
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    getAllCampaigns();
  }, []);
  useEffect(() => {
    if (user) {
      getAllStories();
    }
  }, [user]);

  const getAllStories = async () => {
    getStoryAPI(user?.token)
      .then((res) => {
        // console.log("STORY DATA SUCCESS==>", res.data);
        setStoryData(res.data?.stories);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log("STORY DATA ERROR", err.response.data);
        setRefreshing(false);
      });
  };
  const getAllCampaigns = async () => {
    const { data } = await getCampaign(user?.token, 1, 5).catch((err) =>
      console.log(err.response.data)
    );
    setCampaign(data.campaigns);
    // console.log(JSON.stringify(data.campaigns, null, 4), 'campaign');
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getAllCampaigns();
    getEditorChoiceCampaigns();
    getAllStories();
  }, []);
  return (
    <Layout>
      <HomeHeader />
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateCampaign")}
        activeOpacity={0.5}
        style={{
          position: "absolute",
          bottom: h(0.03),
          zIndex: 2000,
          right: w(0.05),
        }}
      >
        <Icon name={create} size={w(0.16)} />
      </TouchableOpacity>
      <ScrollView
        style={{ backgroundColor: colors.white }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Pressable>
          <StoryBox data={storyData} />
          <Hr alignSelf="center" width={"90%"} borderWidth={0.5} />
          <CreateBox />
          <Hr alignSelf="center" width={"90%"} borderWidth={0.5} mt={h(0.05)} />
          <CreatorBox data={TopCreator} />
          <Hr alignSelf="center" width={"90%"} borderWidth={0.8} mt={h(0.05)} />
          <ExploreBox />
        </Pressable>
      </ScrollView>
    </Layout>
  );
};

export default BHomepage;
