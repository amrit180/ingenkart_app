import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppText,
  BoxShadow,
  Icon,
  Layout,
  ProfileHeader,
  SocialSegment,
  SquareCard,
} from "../../components";
import {
  age,
  barter,
  bguser,
  category,
  instagram,
  location,
} from "../../container/icons";
import { h, nFormatter, w } from "../../config/utilFunction";
import { useSelector } from "react-redux";
import colors from "../../assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import { global } from "../../styles";
import { getCampaign } from "../../functions/campaign";
import { data } from "../../assets/data/CategoryData";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const [campaign, setCampaign] = useState([]);
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
    const { data } = await getCampaign(user?.token, 1, 5).catch((err) =>
      console.log(err.response.data)
    );
    setCampaign(data.campaigns);
  };

  return (
    <Layout>
      <ProfileHeader />
      <ScrollView>
        <View style={{ backgroundColor: colors.white, height: "100%" }}>
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
            text={user.role === "brand" ? user.companyName : user.name}
            mt={h(0.06)}
            mb={h(0.03)}
            textAlign="center"
            fontFamily={"Montserrat_700Bold"}
            fontSize={18}
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
              <Icon name={age} size={w(0.07)} />
              <AppText
                ml={w(0.01)}
                fontFamily={"Montserrat_500Medium"}
                fontSize={12}
                text={`Age: ${user?.age}`}
                color={"rgba(139, 139, 139, 1)"}
              />
            </View>
            <View style={global.center}>
              <Icon name={barter} size={w(0.07)} />
              <AppText
                ml={w(0.01)}
                fontFamily={"Montserrat_500Medium"}
                fontSize={12}
                text={`Barter: ${user?.barter ? "Yes" : "No"}`}
                color={"rgba(139, 139, 139, 1)"}
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: w(0.05), marginTop: h(0.03) }}>
            <AppText text={user?.bio} fontSize={15} color={colors.black70} />

            <View style={[global.start, { marginTop: h(0.02) }]}>
              <Icon name={category} size={w(0.07)} />
              <AppText
                ml={w(0.01)}
                fontFamily={"Montserrat_500Medium"}
                fontSize={12}
                text={`${
                  user?.categories === ""
                    ? "Categories"
                    : user?.categories
                        .map((v) => data.filter((k) => k.id === v)[0].name)
                        .join(", ")
                }`}
                color={"rgba(139, 139, 139, 1)"}
              />
            </View>
            <View
              style={{
                marginTop: h(0.03),
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderRadius: 15,
                  overflow: "hidden",
                  height: h(0.08),
                  borderWidth: 1,
                  borderColor: colors.black30,
                  backgroundColor: colors.white,
                  position: "relative",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: h(0.07),
                    width: "25%",
                    borderRightWidth: 1,
                    borderRightColor: colors.black30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppText
                    fontFamily={"Montserrat_600SemiBold"}
                    text={`${nFormatter(user?.budget?.min)}-${nFormatter(
                      user?.budget?.max
                    )}`}
                  />
                  <AppText
                    text="Budget"
                    fontSize={8}
                    color={"rgba(147, 147, 147, 1)"}
                  />
                </View>
                <View
                  style={{
                    height: h(0.07),
                    width: "25%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderRightColor: colors.black30,
                  }}
                >
                  <AppText fontFamily={"Montserrat_600SemiBold"} text="309" />
                  <AppText
                    text="Connections"
                    fontSize={8}
                    color={"rgba(147, 147, 147, 1)"}
                  />
                </View>
                <View
                  style={{
                    height: h(0.07),
                    width: "25%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderRightColor: colors.black30,
                  }}
                >
                  <AppText fontFamily={"Montserrat_600SemiBold"} text="130K" />
                  <AppText
                    text="Followers"
                    fontSize={8}
                    color={"rgba(147, 147, 147, 1)"}
                  />
                </View>
                <View
                  style={{
                    height: h(0.07),
                    width: "25%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppText fontFamily={"Montserrat_600SemiBold"} text="80%" />
                  <AppText
                    text="Success Rate"
                    fontSize={8}
                    color={"rgba(147, 147, 147, 1)"}
                  />
                </View>
              </View>
              <BoxShadow
                height={h(0.08)}
                width={"100%"}
                radius={15}
                top={h(0.004)}
              />
            </View>

            <SocialSegment setState={setState} state={state} />
            <View style={[global.evenly, { marginTop: h(0.03) }]}>
              <View>
                <AppText
                  text={"3.2M"}
                  fontFamily={"Montserrat_700Bold"}
                  fontSize={23}
                />
                <AppText
                  text="VIEWS"
                  fontSize={10}
                  color={"rgba(101, 101, 101, 1)"}
                  textAlign="center"
                />
              </View>
              <View>
                <AppText
                  text="209K"
                  fontFamily={"Montserrat_700Bold"}
                  fontSize={23}
                />
                <AppText
                  text="SUBSCRIBERS"
                  fontSize={10}
                  color={"rgba(101, 101, 101, 1)"}
                  textAlign="center"
                />
              </View>
              <View>
                <AppText
                  text="420"
                  fontFamily={"Montserrat_700Bold"}
                  fontSize={23}
                />
                <AppText
                  text="VIDEOS"
                  fontSize={10}
                  color={"rgba(101, 101, 101, 1)"}
                  textAlign="center"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                alignItems: "flex-start",
                marginBottom: h(0.2),
              }}
            >
              {campaign.slice(1).map((v, i) => renderItem(v, i))}
            </View>
            <AppText
              text="Comming Soon"
              textAlign={"center"}
              fontFamily={"Montserrat_700Bold"}
              fontSize={23}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default UserProfile;
const renderItem = (item, i) => {
  return <SquareCard data={item} key={i} mt={h(0.05)} />;
};
