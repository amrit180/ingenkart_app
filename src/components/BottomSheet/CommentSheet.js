import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import colors from "../../assets/colors";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { h, w } from "../../config/utilFunction";
import { useSelector } from "react-redux";
import CommentBox from "../Box/CommentBox";
import { Platform } from "react-native";
import { send } from "../../container/icons";
import Icon from "../Icon";
import { addCommentOnReels } from "../../functions/influencer";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");
const MAX_TRANSALTE_Y = -height / 1.1;

const CommentSheet = ({ childref, reelId }) => {
  const translateY = useSharedValue(0);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const user = useSelector((state) => state.user);
  const [reload, setReload] = useState(false);
  const transY = useSharedValue(0);
  const scrollTo = useCallback((destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
    transY.value = destination;
  }, []);

  childref.current = {
    scrollTo: scrollTo,
  };

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSALTE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -height / 1.5) {
        scrollTo(0);
      } else if (translateY.value < -height / 1.5) {
        scrollTo(MAX_TRANSALTE_Y);
      }
    });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  const rBottomSheetBackground = useAnimatedStyle(() => {
    return {
      top: Math.abs(translateY.value) < 200 ? height : 0,
    };
  });
  const rBottomSheetCommentStyle = useAnimatedStyle(() => {
    return {
      bottom: Math.abs(translateY.value) < 200 ? -100 : 0,
    };
  });
  const sendComment = () => {
    addCommentOnReels(reelId, user?._id, text, user?.token)
      .then((res) => {
        setText("");
        setReload(!reload);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <>
      <GestureDetector gesture={gesture}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              {
                position: "absolute",
                height: h(0.05),
                width: "100%",
                backgroundColor: colors.white,
                top: height,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                paddingHorizontal: w(0.05),
                zIndex: 100,
              },
              rBottomSheetStyle,
            ]}
          >
            <View
              style={{
                width: w(0.17),
                height: 5,
                backgroundColor: colors.black50,
                alignSelf: "center",
                marginVertical: 15,
                borderRadius: 13,
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </GestureDetector>
      <Animated.View
        style={[
          {
            position: "absolute",

            height: height,
            width: "100%",
            backgroundColor: colors.white,
            top: height + h(0.049),

            // paddingHorizontal: w(0.05),
            zIndex: 100,
          },
          rBottomSheetStyle,
        ]}
      >
        <CommentBox reelId={reelId} reload={reload} />
      </Animated.View>
      <TouchableWithoutFeedback onPress={() => scrollTo(0)}>
        <Animated.View
          style={[
            {
              backgroundColor: colors.overlay,
              zIndex: 10,
              height,
              width: "100%",
              position: "absolute",
            },
            rBottomSheetBackground,
          ]}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          rBottomSheetCommentStyle,
          {
            height: w(0.17),
            width: "100%",
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderTopColor: colors.black10,
            zIndex: 2000,
            position: "absolute",
          },
        ]}
      >
        <KeyboardAvoidingView
          // keyboardVerticalOffset={Platform.OS == "ios" && 50}
          behavior={Platform.OS == "ios" && "height"}
        >
          <Animated.View
            style={[
              {
                flexDirection: "row",
                height: w(0.17),
                width: "100%",
                backgroundColor: colors.white,
                paddingHorizontal: w(0.05),
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: colors.black10,
              },
            ]}
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
            <TouchableOpacity onPress={sendComment}>
              <Icon name={send} size={38} />
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </>
  );
};

export default CommentSheet;
