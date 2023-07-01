import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import BottomTab from "./BottomTab";
import {
  BankDetails,
  BrandProfile,
  Campaigns,
  EditCategory,
  EditProfile,
  InstaVerified,
  KycDocument,
  Kycform,
  LocationInf,
  MessageScreen,
  Notification,
  PublicBrandProfile,
  PublicProfile,
  Settings,
  SingleCampaign,
  Story,
  Subscription,
  UserProfile,
  Wallet,
  Wishlist,
} from "../screens";

const Stack = createStackNavigator();
const InfluencerStack = () => {
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
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          // animationEnabled: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="InstagramCheck" component={InstaVerified} />
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          // animationEnabled: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="UserProfile" component={PublicProfile} />
      <Stack.Screen name="Kycform" component={Kycform} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditCategory" component={EditCategory} />
      <Stack.Screen name="Campaigns" component={Campaigns} />
      <Stack.Screen name="TopTabs" component={Campaigns} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="KycDocument" component={KycDocument} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="Location" component={LocationInf} />

      <Stack.Screen
        name="SingleCampaign"
        component={SingleCampaign}
        options={{
          // animationEnabled: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          // animationEnabled: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="BrandProfile"
        component={PublicBrandProfile}
        options={{
          // animationEnabled: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default InfluencerStack;
