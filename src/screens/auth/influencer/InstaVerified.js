import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WebView from "react-native-webview";
import { Layout } from "../../../components";
import { h, w } from "../../../config/utilFunction";
import { getAccessToken } from "../../../functions/auth";
import { useSelector } from "react-redux";
import { addInstaFollower } from "../../../functions/influencer";
const testurl =
  "https://instagramtestapi.web.app/instagram?code=AQCyAu9QB1HAIV7YwidbNYVX-mVFC__5O3vHGHycJG2nmaTvOn0YzUgJ2MVWK3_19i6vGVIGjYE-xIYiFj32x9Ac0wjKYpRjlAQz95P92xMhfVXIIH1vJ5GXCGjizG9b1BGnYtVaNga6zmxwNxu2V8GM-V9Xb3eLwd5hEmDumRa9lXLcB6gqIWvKCaL6srqtdJYFYFDas2BPVC7y6Z9uJbXs46rRIAqJa-F2dYlrxgxMwg#_";
const InstaVerified = ({ navigation }) => {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const { user } = useSelector((s) => ({ ...s }));

  useEffect(() => {
    if (code && url.includes("https://instagramtestapi.web.app/instagram")) {
      retrieveAccessToken(code);
    }
  }, [code]);

  const onNavigationStateChange = ({ url }) => {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    let params = {};
    let match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    setCode(params?.code);
  };
  const retrieveAccessToken = async (code) => {
    try {
      await getAccessToken(user?._id, code, user?.token);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <Layout>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: "https://api.instagram.com/oauth/authorize?client_id=794174702313387&redirect_uri=https://instagramtestapi.web.app/instagram&scope=user_profile,user_media&response_type=code",
        }}
        onNavigationStateChange={(t) => {
          onNavigationStateChange(t);
          setUrl(t.url);
        }}
      />

      {url.includes("https://instagramtestapi.web.app/instagram") && (
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile", { id: user?._id })}
          style={{
            position: "absolute",
            width: w(0.2),
            height: h(0.05),
            top: h(0.6),
            alignSelf: "center",
            zIndex: 1000,
          }}
        />
      )}
    </Layout>
  );
};

export default InstaVerified;
