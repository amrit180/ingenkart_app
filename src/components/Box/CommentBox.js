import {
  View,
  Text,
  Pressable,
  FlatList,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { send } from "../../container/icons";
import Icon from "../Icon";
import { getCommentOnReels } from "../../functions/influencer";
import { useSelector } from "react-redux";
import AppText from "../AppText";
import CommentCard from "../Card/CommentCard";
import { useIsFocused } from "@react-navigation/native";

const CommentBox = ({ reelId, reload }) => {
  const { user } = useSelector((s) => ({ ...s }));
  const [page, setpage] = useState(1);
  const [comments, setComments] = useState([]);
  const limit = 5;
  const isFocused = useIsFocused();
  useEffect(() => {
    if (reelId) {
      getComments();
    }
  }, [reelId, isFocused, reload]);
  const getComments = () => {
    getCommentOnReels(reelId, page, limit, user?.token).then((res) => {
      console.log(res.data);
      setComments(res.data.comments);
    });
  };
  return (
    <View style={{}}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <CommentCard item={item} />;
        }}
      />
    </View>
  );
};

export default CommentBox;
