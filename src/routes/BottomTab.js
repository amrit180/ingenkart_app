import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BHomepage,
  ChatLists,
  Discover,
  IDiscover,
  IHomepage,
  Reels,
  Settings,
} from "../screens";
import { Platform, View } from "react-native";
import { Icon } from "../components";
import {
  account,
  accountActive,
  chat,
  chatActive,
  discover,
  discoverActive,
  home,
  homeActive,
  raccount,
  rchat,
  rdiscover,
  reels,
  reelsActive,
  rhome,
} from "../container/icons";

import colors from "../assets/colors";

import { useSelector } from "react-redux";

import { h } from "../config/utilFunction";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const isReels = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    isReels.current = false;
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === "ios" ? h(0.11) : h(0.08),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={user?.role === "brand" ? BHomepage : IHomepage}
        options={{
          tabBarInactiveTintColor: "#0o0o0o",
          tabBarShowLabel: false,
          tabBarStyle: {
            height: Platform.OS === "ios" ? h(0.11) : h(0.08),
          },
          tabBarBackground: () => {
            isReels.current = false;
            return (
              <View
                style={{
                  backgroundColor: colors.white,
                  width: "100%",
                  height: Platform.OS === "ios" ? h(0.11) : h(0.08),
                  zIndex: -5,
                }}
              ></View>
            );
          },
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                size={45}
                name={
                  color === "#0o0o0o"
                    ? isReels.current
                      ? rhome
                      : home
                    : homeActive
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Discover"
        component={user?.role === "brand" ? Discover : IDiscover}
        options={{
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#0o0o0o",
          tabBarStyle: {
            height: Platform.OS === "ios" ? h(0.11) : h(0.08),
          },
          tabBarBackground: () => {
            isReels.current = false;

            return (
              <View
                style={{
                  backgroundColor: colors.white,
                  width: "100%",
                  height: Platform.OS === "ios" ? h(0.11) : h(0.08),
                  zIndex: -5,
                }}
              ></View>
            );
          },
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                size={45}
                name={
                  color === "#0o0o0o"
                    ? isReels.current
                      ? rdiscover
                      : discover
                    : discoverActive
                }
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#0o0o0o",
          tabBarStyle: {
            height: Platform.OS === "ios" ? h(0.11) : h(0.08),
          },
          tabBarBackground: () => {
            isReels.current = true;
            return (
              <View
                style={{
                  backgroundColor: "#121212",
                  width: "100%",
                  height: Platform.OS === "ios" ? h(0.11) : h(0.08),
                }}
              ></View>
            );
          },
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                size={45}
                name={color === "#0o0o0o" ? reels : reelsActive}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="ChatStack"
        component={ChatLists}
        options={{
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#0o0o0o",
          tabBarStyle: {
            height: Platform.OS === "ios" ? h(0.11) : h(0.08),
          },
          tabBarBackground: () => {
            isReels.current = false;
            return (
              <View
                style={{
                  backgroundColor: colors.white,
                  width: "100%",
                  height: Platform.OS === "ios" ? h(0.11) : h(0.08),
                  zIndex: -5,
                }}
              ></View>
            );
          },
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                size={45}
                name={
                  color === "#0o0o0o"
                    ? isReels.current
                      ? rchat
                      : chat
                    : chatActive
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={Settings}
        options={{
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#0o0o0o",
          tabBarStyle: {
            height: Platform.OS === "ios" ? h(0.11) : h(0.08),
          },
          tabBarBackground: () => {
            isReels.current = false;
            return (
              <View
                style={{
                  backgroundColor: colors.white,
                  width: "100%",
                  height: Platform.OS === "ios" ? h(0.11) : h(0.08),
                  zIndex: -5,
                }}
              ></View>
            );
          },
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                size={45}
                name={
                  color === "#0o0o0o"
                    ? isReels.current
                      ? raccount
                      : account
                    : accountActive
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
