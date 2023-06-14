import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  ChooseCategory,
  ICreateBrandProfile,
  ILogoUpload,
  IPersonalInfo,
  InstaVerified,
  Location,
  SocialConnect,
} from "../screens";
const Stack = createStackNavigator();

const InfluencerAuthStack = () => {
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
      <Stack.Screen name="CreateBrandProfile" component={ICreateBrandProfile} />
      <Stack.Screen name="PersonalInfo" component={IPersonalInfo} />
      <Stack.Screen name="LogoUpload" component={ILogoUpload} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="InstagramCheck" component={InstaVerified} />
      <Stack.Screen name="SocialConnect" component={SocialConnect} />
      <Stack.Screen name="ChooseCategory" component={ChooseCategory} />
    </Stack.Navigator>
  );
};

export default InfluencerAuthStack;
