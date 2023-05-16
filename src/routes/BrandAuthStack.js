import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  Choose,
  CreateBrandProfile,
  Location,
  Login,
  LogoUpload,
  PersonalInfo,
} from "../screens";

const Stack = createStackNavigator();
const BrandAuthStack = () => {
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
      <Stack.Screen name="CreateBrandProfile" component={CreateBrandProfile} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="LogoUpload" component={LogoUpload} />
    </Stack.Navigator>
  );
};

export default BrandAuthStack;
