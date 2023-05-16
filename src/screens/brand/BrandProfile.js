import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppText,
  BoxShadow,
  CampaignCard,
  ExploreCard,
  Hr,
  Icon,
  Layout,
  ProfileHeader,
  SingleCampaignHeader,
  SocialSegment,
  SquareCard,
  WishlistCard,
} from "../../components";
import {
  age,
  barter,
  bguser,
  category,
  instagram,
  instagramsmall,
  linkedin,
  location,
} from "../../container/icons";
import { h, w } from "../../config/utilFunction";
import { useSelector } from "react-redux";
import colors from "../../assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import { global } from "../../styles";
import { getCampaign } from "../../functions/campaign";
import { empty } from "../../container/images";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { setNewNotification, setNotifications } from "../../redux/userSlice";

const BrandProfile = () => {
  const user = useSelector((state) => state.user);
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState(false);
  // this state is used for segment selection

  const [state, setState] = useState({
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    xTabThree: 0,
    translateX: new Animated.Value(0),
  });
  useEffect(() => {
    getAllCampaigns();
  }, []);

  const getAllCampaigns = async () => {
    setLoading(true);
    try {
      // console.log(user?.token, "profile");
      const { data } = await getCampaign(
        user?.token,
        1,
        5,
        user?.role,
        user?._id
      ).catch((err) => console.log(err.response.data));
      setCampaign(data.campaigns);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <SingleCampaignHeader />
      <ScrollView>
        <View
          style={{
            backgroundColor: colors.white,
            height: "100%",
            minHeight: h(1),
            paddingBottom: h(0.1),
          }}
        >
          <ImageBackground
            source={bguser}
            style={{ width: "100%", height: h(0.125) }}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.07)", "rgba(255, 255, 255, 0.89)"]}
              style={{
                width: w(0.25),
                height: w(0.25),
                borderRadius: 100,
                backgroundColor: colors.white,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                alignSelf: "center",
                bottom: -w(0.12),
              }}
            >
              <Image
                source={{ uri: user?.profilePicture?.url }}
                style={{ width: w(0.2), height: w(0.2), borderRadius: 100 }}
                resizeMode="cover"
              />
            </LinearGradient>
          </ImageBackground>
          <AppText
            text={user.companyName}
            mt={h(0.06)}
            mb={h(0.03)}
            textAlign="center"
            fontFamily={"Montserrat_700Bold"}
            fontSize={18}
          />
          <AppText
            text={user.tagLine}
            mt={-h(0.03)}
            mb={h(0.02)}
            textAlign="center"
            fontSize={13}
          />
          <View style={[global.center]}>
            <View style={global.center}>
              <Icon name={location} size={w(0.07)} />
              <AppText
                ml={w(0.01)}
                fontFamily={"Montserrat_500Medium"}
                fontSize={12}
                text="Mumbai"
                color={"rgba(139, 139, 139, 1)"}
              />
            </View>
            <View style={[global.center, { marginHorizontal: w(0.05) }]}>
              <Icon name={linkedin} size={w(0.07)} />
              <AppText
                ml={w(0.01)}
                fontFamily={"Montserrat_500Medium"}
                fontSize={12}
                text="LinkedIn"
                color={"rgba(139, 139, 139, 1)"}
              />
            </View>
            <View style={global.center}>
              <Icon name={instagramsmall} size={w(0.07)} />
              <AppText
                ml={w(0.01)}
                fontFamily={"Montserrat_500Medium"}
                fontSize={12}
                text="Instagram"
                color={"rgba(139, 139, 139, 1)"}
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: w(0.1) }}>
            <AppText
              text={user.bio}
              mt={h(0.03)}
              mb={h(0.02)}
              textAlign="center"
              fontSize={12}
              color="rgba(107, 107, 107, 1)"
            />
          </View>
          <AppText
            text={user.website}
            mt={-h(0.01)}
            mb={h(0.02)}
            textAlign="center"
            fontSize={13}
            color={colors.chatBlue}
          />
          <Hr alignSelf="center" width={"90%"} borderWidth={0.5} />
          <View style={{ paddingHorizontal: w(0.05), paddingTop: h(0.02) }}>
            <AppText
              fontFamily={"Poppins_600SemiBold"}
              fontSize={26}
              text="Campaigns"
            />
            <AppText
              fontSize={13}
              text={"All campaigns from " + user.companyName}
              color={colors.black70}
            />

            <View>
              {loading ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: h(0.4),
                  }}
                >
                  <ActivityIndicator size={40} color={colors.black} />
                </View>
              ) : campaign?.length > 0 ? (
                campaign?.map((item, i) => renderItem(item, i))
              ) : (
                <Image
                  source={empty}
                  style={{ height: 200, width: "100%", marginTop: h(0.05) }}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default BrandProfile;
const renderItem = (item, i) => {
  return <WishlistCard data={item} key={i} mt={h(0.05)} />;
};
