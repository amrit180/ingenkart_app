import {
  View,
  Text,
  FlatList,
  StatusBar,
  Pressable,
  Animated,
  Image,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Video } from "expo-av";
import { h, w } from "../../config/utilFunction";
import { AppText, CommentSheet, Loader, ReelsButton } from "../../components";
import colors from "../../assets/colors";
import { useLayoutEffect } from "react";
import { getAllReels, likeOrUnlikeReels } from "../../functions/influencer";
import { useSelector } from "react-redux";
import { unmuteicon, muteicon } from "../../container/icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useIsFocused, useScrollToTop } from "@react-navigation/native";

const Reels = () => {
  const [activePostId, setActivePostId] = useState(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const childref = useRef(null);
  const [mute, setMute] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const { user } = useSelector((s) => ({ ...s }));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reelLike, setReelLike] = useState([]);
  const videoRef = useRef(null);
  let limit = 10;
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const ref = useRef(null);

  useScrollToTop(ref);
  useEffect(() => {
    getReels();
  }, []);
  const getReels = async () => {
    setLoading(true);
    const res = await getAllReels(user?.token, page, limit, user?._id, [
      ...user?.categories,
    ]).catch((err) => console.log(err.response.data));
    // console.log(res.data);
    if (res.data.success) {
      setData([...res.data.reels]);
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const res = await getAllReels(user?.token, 1, limit, user?._id, [
      ...user?.categories,
    ]).catch((err) => console.log(err.response.data));
    // console.log(res.data);
    if (res.data.success) {
      setData([...res.data.reels]);
      setRefreshing(false);
    }
  }, []);
  const loadMore = async () => {
    try {
      const res = await getAllReels(user?.token, page + 1, limit, user?._id, [
        ...user?.categories,
      ]);
      console.log(res.data);

      if (res.data.success) {
        setData((prevData) => [...prevData, ...res.data.reels]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const muteAnimation = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    });
  };

  const muteVideo = () => {
    setMute((v) => !v);
    muteAnimation();
  };

  const videoId = useRef(null);

  const likeToggle = async () => {
    await likeOrUnlikeReels(
      user?.token,
      activePostId,
      user?._id,
      !reelLike.filter((v) => v === user?._id)?.length > 0
    )
      .then((res) => {
        if (res.data.success) {
          setReelLike(res.data.reel.likes);
        }
      })
      .catch((err) => console.log(err.response.data));
  };
  const SwipeSheet = useCallback((value) => {
    childref.current.scrollTo(value);
  }, []);
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    videoId.current = viewableItems[0].item?._id;
    setReelLike(viewableItems[0].item.likes);
    setActivePostId(viewableItems[0].item?._id);
    setCurrentIndex(viewableItems[0].index);
  }, []);

  if (loading)
    return (
      <>
        <StatusBar barStyle={"light-content"} backgroundColor={colors.black} />
        <Loader text={"Loading"} height={"100%"} />
      </>
    );
  else
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <>
          <StatusBar
            barStyle={"light-content"}
            backgroundColor={colors.black}
          />
          <FlatList
            data={data}
            keyExtractor={(item) => item?._id}
            pagingEnabled={true}
            snapToInterval={h(1)}
            decelerationRate="fast"
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 50, // Only consider visible items when at least 50% of the item is visible
            }}
            ref={ref}
            onEndReached={loadMore}
            onEndReachedThreshold={2}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={muteVideo}>
                  <Video
                    source={{
                      uri: item.videoUrl,
                    }}
                    shouldPlay={videoId.current == item?._id && isFocused}
                    isMuted={mute}
                    posterSource={item?.coverImageUrl}
                    usePoster={true}
                    resizeMode="cover"
                    isLooping
                    style={{ height: h(1), width: "100%" }}
                    ref={videoRef}
                  />
                </Pressable>
              );
            }}
          />
          <View style={{ position: "absolute", bottom: h(0.1), left: w(0.05) }}>
            <View
              style={{
                backgroundColor: colors.white45,
                paddingVertical: 4,
                paddingHorizontal: 9,
                borderRadius: 6,
              }}
            >
              <AppText
                text={data[currentIndex]?.displayName}
                fontFamily={"Montserrat_700Bold"}
                color={colors.white}
                fontSize={12}
              />
            </View>
          </View>
          <Animated.Image
            source={mute ? muteicon : unmuteicon}
            style={{
              height: w(0.15),
              width: w(0.15),
              opacity: opacity,
              position: "absolute",
              top: "50%",
              alignSelf: "center",
              zIndex: 10000,
            }}
            resizeMode="contain"
          />
          <View
            style={{
              position: "absolute",
              bottom: h(0.04),
              left: w(0.05),
              width: "75%",
            }}
          >
            <AppText
              text={data[currentIndex]?.description}
              color={colors.white}
              fontSize={12}
            />
          </View>

          <View
            style={{ position: "absolute", bottom: h(0.07), right: w(0.03) }}
          >
            <ReelsButton
              onPress={likeToggle}
              variant="like"
              mb={0.02}
              liked={reelLike.filter((v) => v === user?._id)?.length > 0}
            />
            <ReelsButton
              variant="comment"
              mb={0.02}
              onPress={() => SwipeSheet(-h(0.7))}
            />
            <ReelsButton variant="share" />
          </View>
          <CommentSheet childref={childref} reelId={activePostId} />
        </>
      </GestureHandlerRootView>
    );
};

export default Reels;
