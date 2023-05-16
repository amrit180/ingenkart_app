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
import { getProfile } from "../../functions/user";

const PublicBrandProfile = ({ route }) => {
  const userState = useSelector((state) => state.user);
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = route.params;
  console.log(id, "Public Profile");
  const [user, setUser] = useState({});

  // this state is used for segment selection

  const [state, setState] = useState({
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    xTabThree: 0,
    translateX: new Animated.Value(0),
  });
  useEffect(() => {
    getProfileOfBrand();
  }, []);

  // getting profile of brand with id
  const getProfileOfBrand = async () => {
    try {
      await getProfile(userState?.token, id)
        .then((res) => {
          setUser(res.data.user);
          console.log(res.data.user);
        })
        .catch((err) => console.log(err.respose.data));

      await getAllCampaigns();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const getAllCampaigns = async () => {
    setLoading(true);
    try {
      // console.log(user?.token, "profile");
      await getCampaign(userState?.token, 1, 5, "brand", id)
        .then((res) => {
          setCampaign(res.data.campaigns);
        })
        .catch((err) => console.log(err.response.data));
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
            text={user?.firstName}
            mt={h(0.06)}
            mb={h(0.03)}
            textAlign="center"
            fontFamily={"Montserrat_700Bold"}
            fontSize={18}
          />
          <AppText
            text={user?.userProfile?.tagLine}
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
                text={user?.city}
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
              text={user?.about}
              mt={h(0.03)}
              mb={h(0.02)}
              textAlign="center"
              fontSize={12}
              color="rgba(107, 107, 107, 1)"
            />
          </View>
          <AppText
            text={user?.userProfile?.websiteUrl}
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
              text={"All campaigns from " + user?.firstName}
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

export default PublicBrandProfile;
const renderItem = (item, i) => {
  return <WishlistCard data={item} key={i} mt={h(0.05)} />;
};
