import {
  Image,
  Linking,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { next } from "../../container/icons";
import { global } from "../../styles";
import AppText from "../AppText";
import BoxShadow from "../BoxShadow";
import Hr from "../Hr";
import Icon from "../Icon";

import { useNavigation } from "@react-navigation/native";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";

const SettingBox = ({ user, numElement = 1, data }) => {
  let dispatch = useDispatch();
  const navigation = useNavigation();
  const Logout = async () => {
    await signOut(firebaseAuth).then(() => {
      dispatch(logout());
      navigation.replace("Login");
    });
  };
  const onPresEvent = (name) => {
    switch (name) {
      case "Edit your account":
        navigation.navigate("EditProfile");
        break;
      case "Your Subscription/get subscription":
        break;
      case "Wallet":
        navigation.navigate("Wallet");
        break;
      case "Transactions":
        break;
      case "Applied Campaigns":
        navigation.navigate("TopTabs");
        break;
      case "Shortlisted Campaigns":
        navigation.navigate("TopTabs");
        break;
      case "Completed Campaigns":
        break;
      case "Privacy Policy":
        Linking.openURL("https://ingenkart.com/privacy");

        break;
      case "Terms and Conditions":
        Linking.openURL("https://ingenkart.com/terms");
        break;
      case "Chat Support":
        Linking.openURL("mailto:connect@ingenkart.com");
        break;
      case "Logout":
        Logout();
        break;
    }
  };
  const renderItems = ({ item, i, last }) => {
    return (
      <View key={i}>
        <TouchableOpacity
          onPress={() => onPresEvent(item.name)}
          style={[global.between, { paddingHorizontal: w(0.03) }]}
        >
          <View style={[global.between, { justifyContent: "flex-start" }]}>
            <Icon name={item.icon} size={h(0.05)} />
            <AppText text={item.name} fontSize={15} ml={w(0.03)} />
          </View>

          <Pressable>
            <Icon name={next} size={w(0.05)} />
          </Pressable>
        </TouchableOpacity>
        {!last && (
          <Hr
            height={0}
            width={300}
            borderWidth={0.5}
            alignSelf="flex-end"
            mt={h(0.01)}
            mb={h(0.01)}
            mr={w(0.05)}
          />
        )}
      </View>
    );
  };
  return (
    <View
      style={{
        position: "relative",
        height: h(0.075 * numElement),
        marginBottom: h(0.02),
      }}
    >
      <View
        style={{
          borderColor: user
            ? "rgba(187, 187, 187, 1)"
            : "rgba(237, 237, 237, 1)",
          borderWidth: 1,
          width: "100%",
          height: h(0.075 * numElement),
          borderRadius: 15,
          position: "relative",
          backgroundColor: colors.white,
          justifyContent: "center",
        }}
      >
        {user && (
          <View
            style={[
              global.between,
              {
                justifyContent: "flex-start",
                paddingHorizontal: w(0.03),
                paddingVertical: w(0.03),
                overflow: "hidden",
              },
            ]}
          >
            <Image
              source={{ uri: user?.profilePicture.url }}
              style={{
                height: w(0.2),
                width: w(0.2),
                borderRadius: 100,
                marginRight: w(0.03),
              }}
            />
            <View style={{ width: "70%" }}>
              <View style={global.between}>
                <AppText
                  text={user?.name}
                  fontFamily={"Poppins_500Medium"}
                  fontSize={18}
                />
              </View>
              <AppText
                text={user?.bio.substr(0, 60) + "..."}
                color={colors.black60}
              />
            </View>
          </View>
        )}

        {data?.map((item, i) => {
          let last = data?.length - 1 == i;
          return renderItems({ item, i, last });
        })}
      </View>
      {user && (
        <BoxShadow
          radius={15}
          height={h(0.075 * numElement)}
          width={"100%"}
          top={h(0.005)}
        />
      )}
    </View>
  );
};

export default SettingBox;
