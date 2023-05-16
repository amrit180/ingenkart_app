import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { Choose, Login } from "../screens";
import BrandAuthStack from "./BrandAuthStack";
import InfluencerAuthStack from "./InfluencerAuthStack";
import { useDispatch, useSelector } from "react-redux";
import InfluencerStack from "./InfluencerStack";
import BrandStack from "./BrandStack";
import { setNewNotification, setNotifications } from "../redux/userSlice";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";

const Stack = createStackNavigator();
const AuthStack = () => {
  const { user } = useSelector((s) => ({ ...s }));

  return user?.isLoading ? null : (
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
