import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Pressable,
  Linking,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppText,
  Button,
  CarouselH,
  Error,
  Hr,
  Icon,
  Layout,
  Loader,
  ProductCard,
  SingleCampaignHeader,
} from "../../components";
import uuid from "react-native-uuid";
import {
  VideoUrlFormat,
  h,
  isGenderEligible,
  nFormatter,
  textDeliverable,
  w,
} from "../../config/utilFunction";
import { global } from "../../styles";
import colors from "../../assets/colors";
import {
  instagram,
  instareels,
  play,
  story,
  thumbdown,
  thumbup,
  wishlistoutline,
  wishlistsolid,
} from "../../container/icons";
import ImageView from "react-native-image-viewing";
import { connectToCampaign } from "../../functions/influencer";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignInfo } from "../../functions/campaign";
import { setError } from "../../redux/errorSlice";
import { useBookmark } from "../../hooks";
import { useCallback } from "react";

const SingleCampaign = ({ route }) => {
  const params = route.params;
  const [item, setItem] = useState(null);
  const { user, err } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [apply, setApply] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [visible, setVisble] = useState(false);
  const { storeBookmark } = useBookmark();
  const dispatch = useDispatch();
  useEffect(() => {
    getCampaignData();
  }, []);
  useEffect(() => {
    if (!loading && item) allImage();
  }, [loading]);

  const getCampaignData = useCallback(async () => {
    setLoading(true);
    console.log("idparam", params.id);
    const res = await getCampaignInfo(user?.token, params.id).catch((err) => {
      console.log(err.response.data);
      setLoading(false);
    });

    if (res.data.success) {
      setItem(res.data.campaign);

      setLoading(false);
      // console.log(JSON.stringify(res.data.campaign, null, 4));
    } else {
      setError({
        error: true,
        message: "something went wrong",
        type: "error",
      });
      setLoading(false);
    }
  }, []);

  const allImage = () => {
    setImageList([
      { id: uuid.v4(), uri: item.campaignBanner },
      ...item?.productReference.map((v) => {
        return {
          id: uuid.v4(),
          uri: v.imageUrl,
        };
      }),
      ...item?.referenceImage?.map((v) => {
        return {
          id: uuid.v4(),
          uri: v,
        };
      }),
    ]);
  };
  // console.log(JSON.stringify(item.campaignBanner, null, 4));
  const applyCampaign = async () => {
    setApply(true);
    await connectToCampaign(user?.token, {
      campaignId: item?._id,
      influencerId: user?._id,
      apply: !alreadyApplied(),
    })
      .then((res) => {
        console.log("res", res.data.success);
        if (res.data.success) {
          if (alreadyApplied()) {
            setItem({
              ...item,
              appliedInfluencer: item.appliedInfluencer.filter(
                (v) => v !== user?._id
              ),
            });
          } else {
            setItem({
              ...item,
              appliedInfluencer: [...item.appliedInfluencer, user?._id],
            });
          }
          setApply(false);
        } else {
          dispatch(
            setError({
              error: true,
              message: "something went wrong",
              type: "error",
            })
          );
          setApply(false);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch(
          setError({
            error: true,
            message: "something went wrong",
            type: "error",
          })
        );
        setApply(false);
      });
  };

  const alreadyApplied = () => {
    return item?.appliedInfluencer.includes(user?._id);
  };
  const shortlistedInfluencer = () => {
    return item?.shortlistedInfluencer?.includes(user?._id);
  };

  if (loading)
    return (
      <Layout>
        <SingleCampaignHeader
          brandName={params.brandName}
          brandPic={params.imageUrl}
        />
        <Loader text={"Fetching your response"} />
      </Layout>
    );
  else
    return (
      <>
        <SafeAreaView style={{ backgroundColor: colors.white }}>
          <SingleCampaignHeader
            brandName={item?.brand?.name}
            brandPic={item?.brand?.profilePicture.url}
          />

          <ScrollView
            style={{ backgroundColor: colors.white }}
            showsVerticalScrollIndicator={false}
          >
            <CarouselH data={imageList} onPress={() => setVisble(true)} />
            <ImageView
              images={imageList}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setVisble(false)}
            />

            <View
              style={[
                global.start,
                {
                  marginTop: h(0.02),
                  paddingHorizontal: w(0.05),
                },
              ]}
            >
              <View
                style={{
                  borderColor: "rgba(169, 169, 169, 1)",
                  borderWidth: 0.5,
                  borderRadius: 13,
                }}
              >
                <Image
                  source={{ uri: item?.brand?.profilePicture.url }}
                  style={{
                    height: w(0.14),
                    width: w(0.14),
                    borderRadius: 13,
                  }}
                />
              </View>
              <AppText
                ml={w(0.03)}
                text={item?.campaignName}
                fontFamily={"Montserrat_700Bold"}
                fontSize={18}
                width={"80%"}
              />
            </View>
            <View
              style={[
                global.start,
                {
                  flexWrap: "wrap",
                  paddingHorizontal: w(0.05),
                  marginTop: h(0.02),
                },
              ]}
            >
              <AppText
                fontSize={13}
                text={item?.brand?.name}
                color={colors.desciption}
                fontFamily={"Poppins_600SemiBold"}
              />
              <AppText
                fontSize={13}
                text={" requires "}
                color={colors.desciption}
              />
              <AppText
                fontSize={13}
                text={
                  item?.gender?.charAt(0).toUpperCase() + item?.gender?.slice(1)
                }
                color={colors.desciption}
                fontFamily={"Poppins_600SemiBold"}
              />
              <AppText
                fontSize={13}
                text={" influencers, "}
                color={colors.desciption}
              />
              <AppText
                fontSize={13}
                text={item?.campaignPlatform?.platformName}
                color={colors.desciption}
                fontFamily={"Poppins_600SemiBold"}
              />
              <AppText
                fontSize={13}
                text={" with "}
                color={colors.desciption}
              />
              <AppText
                fontSize={13}
                text={
                  nFormatter(item?.followersRange?.min) +
                  "-" +
                  nFormatter(item?.followersRange?.max)
                }
                color={colors.desciption}
                fontFamily={"Poppins_600SemiBold"}
              />
              <AppText
                fontSize={13}
                text={" followers and age between "}
                color={colors.desciption}
              />
              <AppText
                fontSize={13}
                text={item?.age?.min + "-" + item?.age?.max}
                color={colors.desciption}
                fontFamily={"Poppins_600SemiBold"}
              />
              <AppText
                fontSize={13}
                text={" years, that are"}
                color={colors.desciption}
              />
              <AppText
                fontSize={13}
                text={" active in the categories - "}
                color={colors.desciption}
              />
              {item?.campaignCategories?.map((v, i) => (
                <AppText
                  fontSize={13}
                  text={`${v.categoryName}${
                    i === item?.campaignCategories?.length - 1 ? "." : ", "
                  }`}
                  key={i}
                  color={colors.desciption}
                  fontFamily={"Poppins_600SemiBold"}
                />
              ))}
            </View>
            <View style={{ paddingHorizontal: w(0.05), marginTop: h(0.02) }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderRadius: 15,
                  overflow: "hidden",
                  height: h(0.07),
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
                    height: h(0.05),
                    width: "25%",
                    borderRightWidth: 1,
                    borderRightColor: colors.black30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppText
                    fontFamily={"Montserrat_600SemiBold"}
                    text={`${
                      item?.isBarter
                        ? "Barter"
                        : "₹" +
                          nFormatter(item?.influencerBudget?.min) +
                          "-" +
                          "₹" +
                          nFormatter(item?.influencerBudget?.max)
                    }`}
                  />
                  <AppText
                    text="Budget"
                    fontSize={8}
                    color={"rgba(147, 147, 147, 1)"}
                  />
                </View>
                <View
                  style={{
                    height: h(0.05),
                    width: "25%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderRightColor: colors.black30,
                  }}
                >
                  <Icon name={instagram} size={w(0.05)} />
                  <AppText
                    text="Platform"
                    fontSize={8}
                    color={"rgba(147, 147, 147, 1)"}
                  />
                </View>
                <View
                  style={{
                    height: h(0.05),
                    width: "25%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderRightColor: colors.black30,
                  }}
                >
                  <AppText
                    fontFamily={"Montserrat_600SemiBold"}
                    text={
                      nFormatter(item?.followersRange?.min) +
                      "-" +
                      nFormatter(item?.followersRange?.max)
                    }
                  />
                  <AppText
                    text="Followers"
                    fontSize={8}
                    color={"rgba(147, 147, 147, 1)"}
                  />
                </View>
                <View
                  style={{
                    height: h(0.05),
                    width: "25%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppText
                    fontFamily={"Montserrat_600SemiBold"}
                    text={
                      item?.gender?.charAt(0).toUpperCase() +
                      item?.gender?.slice(1)
                    }
                  />
                  <AppText
                    text="Sex"
                    fontSize={8}
                    color={"rgba(147, 147, 147, 1)"}
                  />
                </View>
              </View>
              <AppText
                mt={h(0.05)}
                text="Deliverables."
                fontFamily={"Montserrat_700Bold"}
                fontSize={16}
                mb={h(0.01)}
              />
              <Hr
                alignSelf="center"
                width={"100%"}
                borderWidth={0.5}
                mb={h(0.02)}
              />
              {item?.deliverableType?.map((v, i) => (
                <View
                  key={i}
                  style={[global.between, { marginBottom: h(0.02) }]}
                >
                  <View style={global.start}>
                    <Icon
                      name={
                        v === "instaReel" || v === "youtubeShorts"
                          ? instareels
                          : story
                      }
                      size={w(0.07)}
                    />
                    <AppText
                      text={`${textDeliverable(v)}`}
                      color={colors.desciption}
                      fontFamily={"Montserrat_700Bold"}
                      fontSize={12}
                      ml={w(0.01)}
                    />
                  </View>
                  <AppText text={"1X"} color={colors.desciption} />
                </View>
              ))}
            </View>
            <View style={{ paddingHorizontal: w(0.05), marginTop: h(0.02) }}>
              <AppText
                mt={h(0.05)}
                text="Products"
                fontFamily={"Montserrat_700Bold"}
                fontSize={16}
                mb={h(0.01)}
              />
              <Hr
                alignSelf="center"
                width={"100%"}
                borderWidth={0.5}
                mb={h(0.02)}
              />
              <AppText
                text="These products are listed by company and is to be used for ceating content"
                fontSize={13}
                color={colors.black50}
                mb={h(0.01)}
              />
            </View>
            <View style={{ paddingLeft: w(0.05) }}>
              <FlatList
                data={item?.productReference}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item) => item?.fileName}
                renderItem={renderItem}
              />
            </View>
            <View style={{ paddingHorizontal: w(0.05), marginTop: h(0.02) }}>
              <AppText
                mt={h(0.05)}
                text="Reference Images"
                fontFamily={"Montserrat_700Bold"}
                fontSize={16}
                mb={h(0.01)}
              />
              <Hr
                alignSelf="center"
                width={"100%"}
                borderWidth={0.5}
                mb={h(0.02)}
              />
              <AppText
                text="Reference Images are a guide to how exactly the content should look if it is in the form of post or story"
                fontSize={13}
                color={colors.black50}
                mb={h(0.01)}
              />
            </View>
            <View style={{ paddingLeft: w(0.05) }}>
              <FlatList
                data={item?.referenceImage}
                horizontal
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: w(0.8),
                      height: h(0.25),
                      borderRadius: 15,
                      overflow: "hidden",
                      marginRight: w(0.03),
                    }}
                  >
                    <ImageBackground
                      source={{ uri: item }}
                      style={{
                        width: w(0.8),
                        height: h(0.27),
                        borderRadius: 15,
                        overflow: "hidden",
                      }}
                    />
                  </View>
                )}
              />
            </View>
            {item?.referenceVideo?.length > 0 && (
              <>
                <View
                  style={{ paddingHorizontal: w(0.05), marginTop: h(0.02) }}
                >
                  <AppText
                    mt={h(0.05)}
                    text="Reference Video"
                    fontFamily={"Montserrat_700Bold"}
                    fontSize={16}
                    mb={h(0.01)}
                  />
                  <Hr
                    alignSelf="center"
                    width={"100%"}
                    borderWidth={0.5}
                    mb={h(0.02)}
                  />
                  <AppText
                    text="Reference Video acts as the guide for making content around the product mentioned above"
                    fontSize={13}
                    color={colors.black50}
                    mb={h(0.01)}
                  />
                </View>

                <View style={{ paddingLeft: w(0.05) }}>
                  <FlatList
                    data={item?.referenceVideo}
                    horizontal
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          width: w(0.8),
                          height: h(0.25),
                          borderRadius: 15,
                          overflow: "hidden",
                          marginRight: w(0.03),
                        }}
                      >
                        <ImageBackground
                          source={{
                            uri: VideoUrlFormat(item),
                          }}
                          style={{
                            width: w(0.8),
                            height: h(0.27),
                            borderRadius: 15,
                            overflow: "hidden",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Pressable onPress={() => Linking.openURL(item)}>
                            <Icon name={play} size={w(0.13)} />
                          </Pressable>
                        </ImageBackground>
                      </View>
                    )}
                  />
                </View>
              </>
            )}
            <View style={{ paddingHorizontal: w(0.05) }}>
              <View>
                <AppText
                  mt={h(0.05)}
                  text="Do's"
                  fontFamily={"Montserrat_700Bold"}
                  fontSize={16}
                  mb={h(0.01)}
                />
                <Hr
                  alignSelf="center"
                  width={"100%"}
                  borderWidth={0.5}
                  mb={h(0.02)}
                />
                {item?.dos?.map((v, i) => (
                  <View
                    key={i}
                    style={[
                      global.start,
                      { marginBottom: h(0.02), alignItems: "flex-start" },
                    ]}
                  >
                    <Icon name={thumbup} size={w(0.06)} />
                    <AppText
                      text={`${v}`}
                      color={colors.desciption}
                      fontSize={15}
                      ml={w(0.01)}
                      width={"93%"}
                    />
                  </View>
                ))}
              </View>
              <View style={{ marginBottom: h(0.1) }}>
                <AppText
                  mt={h(0.05)}
                  text="Dont's"
                  fontFamily={"Montserrat_700Bold"}
                  fontSize={16}
                  mb={h(0.01)}
                />
                <Hr
                  alignSelf="center"
                  width={"100%"}
                  borderWidth={0.5}
                  mb={h(0.02)}
                />
                {item?.donts?.map((v, i) => (
                  <View
                    key={i}
                    style={[
                      global.start,
                      { marginBottom: h(0.02), alignItems: "flex-start" },
                    ]}
                  >
                    <Icon name={thumbdown} size={w(0.06)} />
                    <AppText
                      text={`${v}`}
                      color={colors.desciption}
                      fontSize={15}
                      ml={w(0.01)}
                      width={"93%"}
                    />
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        {item?.brand?._id !== user?._id && (
          <View
            style={[
              global.evenly,
              {
                height: h(0.1),
                elevation: 5,
                width: w(1),
                position: "absolute",
                bottom: 0,
                backgroundColor: colors.white,
              },
            ]}
          >
            <TouchableOpacity
              style={{
                width: w(0.12),
                height: w(0.12),
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: "rgba(169, 169, 169, 1)",
                backgroundColor: colors.white,

                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => storeBookmark(item)}
            >
              <Icon
                name={
                  user?.wishlist?.filter((v) => v?._id == item?._id)?.length > 0
                    ? wishlistsolid
                    : wishlistoutline
                }
                size={w(0.07)}
              />
            </TouchableOpacity>

            {!user?.userProfile?.isInstaVerified ? (
              <Button
                onPress={() => {
                  dispatch(
                    setError({
                      error: true,

                      message: "First add your Social account",
                      type: "error",
                    })
                  );
                }}
                variant="standard"
                height={w(0.12)}
                width={w(0.7)}
                name={"Ineligible"}
                fontSize={14}
                isLoading={apply}
              />
            ) : isGenderEligible(user?.gender, item?.gender) ? (
              <Button
                onPress={
                  shortlistedInfluencer()
                    ? null
                    : apply
                    ? null
                    : alreadyApplied()
                    ? applyCampaign
                    : applyCampaign
                }
                variant="standard"
                height={w(0.12)}
                width={w(0.7)}
                name={`${
                  shortlistedInfluencer()
                    ? "Shortlisted"
                    : alreadyApplied()
                    ? "Applied"
                    : "Apply Now"
                }`}
                fontSize={14}
                isLoading={apply}
              />
            ) : (
              <Button
                onPress={() => {
                  dispatch(
                    setError({
                      error: true,
                      message: "Ineligiblity due to Age and Gender",
                      type: "error",
                    })
                  );
                }}
                variant="standard"
                height={w(0.12)}
                width={w(0.7)}
                name={"Ineligible"}
                fontSize={14}
                isLoading={apply}
              />
            )}
          </View>
        )}
      </>
    );
};

export default SingleCampaign;

const renderItem = ({ item }) => (
  <ProductCard name={item?.name} price={item?.price} url={item?.imageUrl} />
);
