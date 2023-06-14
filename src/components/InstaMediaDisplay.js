import { View, Text, Image } from "react-native";
import React from "react";
import InstaCard from "./Card/InstaCard";
import * as VideoThumbnails from "expo-video-thumbnails";
import { h, w } from "../config/utilFunction";
import { useState } from "react";

const InstaMediaDisplay = ({ data, dp, mt }) => {
  if (data.media_type === "IMAGE") {
    const value = {
      ...data,
      profile_pic: dp,
    };
    return <InstaCard data={value} />;
  }
};

export default InstaMediaDisplay;
