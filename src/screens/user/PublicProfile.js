import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  Animated,
  Pressable,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppText,
  BoxShadow,
  Button,
  Icon,
  Input,
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
  commingsoon,
  instagram,
  location,
} from "../../container/icons";
import {
  calculateAge,
  getRandomInteger,
  h,
  nFormatter,
  w,
} from "../../config/utilFunction";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../assets/colors";
import { LinearGradient } from "expo-linear-gradient";
import { global } from "../../styles";
import { getCampaign } from "../../functions/campaign";
import { data } from "../../assets/data/CategoryData";
import { getProfile, testinstaUsername } from "../../functions/user";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { empty } from "../../container/images";
import { addInstaFollower, getInstaPost } from "../../functions/influencer";
import InstaMediaDisplay from "../../components/InstaMediaDisplay";
import { setTestUsername } from "../../redux/userSlice";

const PublicProfile = ({ route }) => {
  const userState = useSelector((state) => state.user);
  const [campaign, setCampaign] = useState([]);
  const [instaPost, setInstaPost] = useState([]);

  const [instaData, setInstaData] = useState({
    followersCount: 0,
    followingsCount: 0,
    postCount: 0,
    dp: "",
  });
  // this state is used for segment selection
  const { id } = route.params;
  // console.log(id, "Public Profile");
  const [user, setUser] = useState({});
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
  useEffect(() => {
    if (user) {
      getFollowers();
    }
  }, [user, user?.testUsername]);

  // getting profile of brand with id
  const getProfileOfBrand = async () => {
    try {
      await getProfile(userState?.token, id)
        .then((res) => {
          setUser(res.data.user);
          console.log(
            res.data.user,
            "userProfile ================================================<<<<<<<<<<<<<<<"
          );
        })
        .catch((err) => console.log(err.respose.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const getFollowers = async () => {
    try {
      // const res = await getInstaPost(user?._id, user?.token);
      // if (res.data.success) {
      //   setInstaPost(res.data.posts);
      // }
      const { data } = await axios.get(
        `https://www.instagram.com/api/v1/users/web_profile_info/?username=${user?.testUsername}`,
        {
          headers: {
            "User-Agent":
              "Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)",
          },
        }
      );
      console.log(data.data.user.edge_followed_by.count);

      setInstaData({
        followersCount: data.data.user.edge_followed_by?.count,
        followingsCount: data.data.user.edge_follow?.count,
        postCount: data.data.user.edge_owner_to_timeline_media?.count,
        dp: data.data.user?.profile_pic_url_hd,
      });
      await addInstaFollower(
        user?._id,
        data.data.user.edge_followed_by?.count,
        data.data.user.edge_follow?.count,
        data.data.user?.profile_pic_url_hd
      );
    } catch (e) {
      console.log(e.respose.data);
    }
  };

  return (
    <Layout>
      <ProfileHeader
        name={user?.firstName?.toLowerCase() + user?.lastName?.toLowerCase()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable style={{ backgroundColor: colors.white, height: "100%" }}>
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
            text={
              user.role === "brand"
                ? user.companyName
                : user.firstName + " " + user.lastName
            }
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
                text={`Age: ${calculateAge(user?.DOB?.split("T")[0])}`}
                color={"rgba(139, 139, 139, 1)"}
              />
            </View>
            <View style={global.center}>
              <Icon name={barter} size={w(0.07)} />
              <AppText
                ml={w(0.01)}
                fontFamily={"Montserrat_500Medium"}
                fontSize={12}
                text={`Barter: ${
                  user?.userProfile?.barterAvailability ? "Yes" : "No"
                }`}
                color={"rgba(139, 139, 139, 1)"}
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: w(0.05), marginTop: h(0.03) }}>
            <AppText text={user?.about} fontSize={15} color={colors.black70} />

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
                        ?.map((v) => data.filter((k) => k.id === v)[0].name)
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
                    text={`${nFormatter(
                      user.userProfile?.budget?.min
                    )}-${nFormatter(user?.userProfile?.budget?.max)}`}
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
                  <AppText
                    fontFamily={"Montserrat_600SemiBold"}
                    text={user?.userProfile?.campaignsJoined?.length}
                  />
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
                  <AppText fontFamily={"Montserrat_600SemiBold"} text="-" />
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
                  <AppText fontFamily={"Montserrat_600SemiBold"} text={"-"} />
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

            <SocialData user={user} state={state} instaData={instaData} />
          </View>
          {state.active === 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                marginTop: h(0.025),
                marginBottom: h(0.1),
              }}
            >
              {instaPost?.map((v, i) => {
                return (
                  <InstaMediaDisplay data={v} dp={instaData?.dp} key={i} />
                );
              })}
            </View>
          )}
        </Pressable>
      </ScrollView>
    </Layout>
  );
};

export default PublicProfile;
const renderItem = (item, i) => {
  return <SquareCard data={item} key={i} mt={h(0.05)} />;
};

const SocialData = ({ state, user, instaData }) => {
  if (state.active == 0)
    return <InstaProfile user={user} state={state} instaData={instaData} />;
  if (state.active == 1) return <CommingSoon />;
  if (state.active == 2) return <CommingSoon />;
};

const InstaProfile = ({ user, state, instaData }) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  let dispatch = useDispatch();
  const handleSubmit = async (username) => {
    try {
      await testinstaUsername(username, user?._id, user?.token).then(() => {
        dispatch(setTestUsername({ testUsername: username }));
        navigation.goBack();
      });
    } catch (e) {
      console.log(e.respose.data);
    }
  };
  return (
    <>
      {user?.testUsername ? (
        <View style={[global.evenly, { marginTop: h(0.03) }]}>
          <View>
            <AppText
              text={nFormatter(instaData?.followersCount)}
              fontFamily={"Montserrat_700Bold"}
              fontSize={23}
              textAlign="center"
            />
            <AppText
              text={"FOLLOWERS"}
              fontSize={10}
              color={"rgba(101, 101, 101, 1)"}
              textAlign="center"
            />
          </View>
          <View>
            <AppText
              text={nFormatter(instaData?.followingsCount)}
              fontFamily={"Montserrat_700Bold"}
              fontSize={23}
              textAlign="center"
            />
            <AppText
              text="FOLLOWINGS"
              fontSize={10}
              color={"rgba(101, 101, 101, 1)"}
              textAlign="center"
            />
          </View>
          <View>
            <AppText
              text={instaData.postCount}
              fontFamily={"Montserrat_700Bold"}
              fontSize={23}
              textAlign="center"
            />
            <AppText
              text="POSTS"
              fontSize={10}
              color={"rgba(101, 101, 101, 1)"}
              textAlign="center"
            />
          </View>
        </View>
      ) : (
        <View style={{ marginTop: h(0.05), marginBottom: h(0.1) }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Input
                  fontSize={14}
                  variant={"text"}
                  type="outline"
                  width={0.78}
                  textAlign="left"
                  value={username}
                  placeholder="Username"
                  onChangeText={(t) => setUsername(t)}
                />
                <Button
                  onPress={() => {
                    handleSubmit(username);
                    setUsername("");
                    setModalVisible(false);
                  }}
                  variant="standard"
                  height={h(0.07)}
                  mt={h(0.009)}
                  width={w(0.78)}
                  name="Submit"
                />
              </View>
            </View>
          </Modal>
          <Image
            source={empty}
            style={{ height: h(0.25), width: "100%", resizeMode: "contain" }}
          />
          <TouchableOpacity
            style={{ marginTop: h(0.02) }}
            onPress={() => setModalVisible(true)}
          >
            <AppText
              color={colors.black70}
              text={"Instagram not Connected,"}
              fontSize={15}
              textAlign={"center"}
            />
            <AppText
              text={"Connect Now."}
              fontSize={15}
              textAlign={"center"}
              textDecorationLine={"underline"}
              color={colors.chatBlue}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const YoutubeProfile = ({ user, state, instaData }) => {
  const navigation = useNavigation();
  return (
    <>
      {user?.userProfile?.isInstaVerified ? (
        <View style={[global.evenly, { marginTop: h(0.03) }]}>
          <View>
            <AppText
              text={nFormatter(instaData?.followersCount)}
              fontFamily={"Montserrat_700Bold"}
              fontSize={23}
              textAlign="center"
            />
            <AppText
              text={"FOLLOWERS"}
              fontSize={10}
              color={"rgba(101, 101, 101, 1)"}
              textAlign="center"
            />
          </View>
          <View>
            <AppText
              text={nFormatter(instaData?.followingsCount)}
              fontFamily={"Montserrat_700Bold"}
              fontSize={23}
              textAlign="center"
            />
            <AppText
              text="FOLLOWINGS"
              fontSize={10}
              color={"rgba(101, 101, 101, 1)"}
              textAlign="center"
            />
          </View>
          <View>
            <AppText
              text={user?.userProfile?.totalInstaPosts}
              fontFamily={"Montserrat_700Bold"}
              fontSize={23}
              textAlign="center"
            />
            <AppText
              text="POSTS"
              fontSize={10}
              color={"rgba(101, 101, 101, 1)"}
              textAlign="center"
            />
          </View>
        </View>
      ) : (
        <View style={{ marginTop: h(0.05), marginBottom: h(0.1) }}>
          <Image
            source={empty}
            style={{ height: h(0.25), width: "100%", resizeMode: "contain" }}
          />
          <TouchableOpacity
            style={{ marginTop: h(0.02) }}
            onPress={() => navigation.navigate("InstagramCheck")}
          >
            <AppText
              color={colors.black70}
              text={"Instagram not Connected,"}
              fontSize={15}
              textAlign={"center"}
            />
            <AppText
              text={"Connect Now."}
              fontSize={15}
              textAlign={"center"}
              textDecorationLine={"underline"}
              color={colors.chatBlue}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const CommingSoon = () => {
  return (
    <View
      style={[
        global.center,
        { width: "100%", height: h(0.2), marginTop: h(0.05) },
      ]}
    >
      <Icon name={commingsoon} size={w(0.5)} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    width: w(0.8),
    height: h(0.16),
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
