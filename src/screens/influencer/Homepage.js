import React, { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  CampaignBox,
  CreatorBox,
  DiscoverBox,
  HomeHeader,
  Hr,
  Layout,
  StoryBox,
} from "../../components";
import StoryData from "../../assets/data/StoryData";
import { h } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { getCampaign } from "../../functions/campaign";
import TopCreator from "../../assets/data/TopCreator";
import { useDispatch, useSelector } from "react-redux";
import { getMyCampaigns, getEditorChoiceAPI } from "../../functions/influencer";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { setNewNotification, setNotifications } from "../../redux/userSlice";
import { getStoryAPI } from "../../functions/user";

const IHomepage = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [campaign, setCampaign] = useState([]);
  const [appliedCampaign, setAppliedCampaign] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [joinedCampaign, setJoinedCampaign] = useState([]);
  const [editorChoiceCampaigns, setEditorChoiceCampaigns] = useState([]);
  const [storyData, setStoryData] = useState([]);
  const isFocused = useIsFocused();
  let dispatch = useDispatch();
  useEffect(() => {
    getAllCampaigns();
    mconyCampaigns();
  }, [isFocused]);

  useEffect(() => {
    if (user) {
      getEditorChoiceCampaigns();
    }
  }, [isFocused, user]);
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", user?._id),
    orderBy("timeStamps", "desc"),
    limit(10)
  );

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

  const getAllCampaigns = () => {
    getCampaign(user?.token, 1, 5, user?.role, user?._id, user?.categories)
      .then((res) => {
        // console.log("CAMPAIGN INFLUENCER==>", res.data);
        setCampaign(res.data.campaigns);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log("ERROR IN FETCHING CAMPAIGN==>", err.response.data);
        setRefreshing(false);
      });
  };

  const mconyCampaigns = async () => {
    const res = await getMyCampaigns(user?.token, user?._id, 1, 5).catch(
      (err) => console.log(err.response.data)
    );
    if (res.data.success) {
      setAppliedCampaign([...res.data.appliedCampaigns]);
      setJoinedCampaign([...res.data.joinedCampaigns]);
      // console.log(JSON.stringify(res.data, null, 4));
    }
  };
  // get all the Editor's choice campaign
  const getEditorChoiceCampaigns = () => {
    getEditorChoiceAPI(user?.token)
      .then((res) => {
        // console.log("editor choice SUCCESS data", res.data);
        setEditorChoiceCampaigns(res.data.campaigns);
      })
      .catch((err) =>
        console.log("Editor choice GET Error", err.response.data.message)
      );
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
      <StatusBar barStyle={"dark-content"} backgroundColor={colors.white} />
      <ScrollView
        style={{ backgroundColor: colors.white }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <Text>{JSON.stringify(storyData)} </Text> */}
        <Pressable>
          <StoryBox data={storyData} />
          <Hr alignSelf="center" width={"90%"} borderWidth={0.5} />
          <DiscoverBox data={editorChoiceCampaigns} squareCardData={campaign} />
          <CreatorBox data={TopCreator} />
          <Hr alignSelf="center" width={"90%"} borderWidth={0.8} />
          <CampaignBox
            data={joinedCampaign.concat(appliedCampaign)}
            mv={h(0.015)}
          />
        </Pressable>
      </ScrollView>
    </Layout>
  );
};

export default IHomepage;
