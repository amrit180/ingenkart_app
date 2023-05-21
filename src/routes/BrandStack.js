import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import BottomTab from "./BottomTab";
import {
  BrandProfile,
  CampaignMedia,
  CreateCampaign,
  EditProfile,
  InfluencerInfo,
  KYCFORM,
  Kycform,
  MessageScreen,
  Notification,
  PublicProfile,
  Settings,
  SingleCampaign,
  Story,
  UserProfile,
  Wallet,
  Wishlist,
} from "../screens";

const Stack = createStackNavigator();
const BrandStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        presentation: "card",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="UserProfile" component={BrandProfile} />
      <Stack.Screen name="PublicProfile" component={PublicProfile} />
      <Stack.Screen name="CreateCampaign" component={CreateCampaign} />
      <Stack.Screen name="InfluencerInfo" component={InfluencerInfo} />
      <Stack.Screen name="CampaignMedia" component={CampaignMedia} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Kycform" component={Kycform} />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          // animationEnabled: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="SingleCampaign"
        component={SingleCampaign}
        options={{
          // animationEnabled: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BrandStack;
