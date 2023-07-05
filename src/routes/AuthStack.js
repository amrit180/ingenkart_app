import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { Choose, InstaVerified, Login } from "../screens";
import BrandAuthStack from "./BrandAuthStack";
import InfluencerAuthStack from "./InfluencerAuthStack";
import { useDispatch, useSelector } from "react-redux";
import InfluencerStack from "./InfluencerStack";
import BrandStack from "./BrandStack";
import { HomepageLoader, SplashLoading } from "../components";

const Stack = createStackNavigator();
const AuthStack = () => {
  const user = useSelector((s) => s.user);

  return user?.isLoading ? (
    <SplashLoading />
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        presentation: "card",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        animationEnabled: true,
      }}
      initialRouteName={
        user?.email === ""
          ? "AuthStack"
          : user?.role === "brand"
          ? "BrandStack"
          : "InfluencerStack"
      }
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Choose" component={Choose} />
      <Stack.Screen name="BrandAuthStack" component={BrandAuthStack} />
      <Stack.Screen name="BrandStack" component={BrandStack} />
      <Stack.Screen name="InfluencerStack" component={InfluencerStack} />

      <Stack.Screen
        name="InfluencerAuthStack"
        component={InfluencerAuthStack}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
