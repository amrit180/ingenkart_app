import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import {
  AppText,
  BoxShadow,
  CreateCampaignHeader,
  DropDown,
  Hr,
  Icon,
  Input,
  Layout,
} from "../../components";

import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import DatePicker from "react-native-date-picker";
import {
  setBrandUserId,
  setCampaignName,
  setDeliverable,
  setDonts,
  setDos,
  setEndDate,
  setStartDate,
} from "../../redux/createCampaignSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  calender,
  checked,
  facebook,
  instagram,
  unchecked,
  youtube,
} from "../../container/icons";
import { global } from "../../styles";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { setError } from "../../redux/errorSlice";
const CreateCampaign = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const { createCampaign, err, user } = useSelector((state) => ({ ...state }));
  const navigation = useNavigation();
  let dispatch = useDispatch();
  const [text, setText] = useState("");
  const [selected, setSelected] = useState(null);
  const deliverable = [
    {
      id: 1,
      name: "Instagram",
      icon: instagram,
      types: [
        {
          id: 1,
          name: "Reels",
          value: "instaReel",
        },
        {
          id: 2,
          name: "Story",
          value: "instagramStory",
        },
        {
          id: 3,
          name: "Post",
          value: "instagramPost",
        },
      ],
    },
    {
      id: 2,
      name: "Youtube",
      icon: youtube,
      types: [
        {
          id: 1,
          name: "Video",
          value: "youTubeVideo",
        },
        {
          id: 2,
          name: "Shorts",
          value: "youtubeShorts",
        },
      ],
    },
    {
      id: 3,
      name: "Facebook",
      icon: facebook,
      types: [
        {
          id: 1,
          name: "Story",
          value: "facebookStory",
        },
        {
          id: 2,
          name: "Reels",
          value: "FacebookReel",
        },
        {
          id: 3,
          name: "Post",
          value: "FacebookPost",
        },
      ],
    },
  ];

  const disableCondition =
    createCampaign?.campaignName === "" ||
    createCampaign?.campaignPeriod?.startDate === "" ||
    createCampaign?.campaignPeriod?.endDate === "" ||
    createCampaign?.campaignPlatform?.platformName === "" ||
    createCampaign?.deliverableType?.length < 1;

  const movetonext = () => {
    if (disableCondition) {
      dispatch(
        setError({
          error: true,
          message: "Complete all fields",
        })
      );
    } else {
      dispatch(setBrandUserId({ brandUserId: user?._id }));
      navigation.navigate("InfluencerInfo");
    }
  };

  return (
    <Layout>
      <CreateCampaignHeader index={0} handleSubmit={movetonext} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors.white,
          paddingHorizontal: w(0.05),
          paddingTop: h(0.02),
          minHeight: h(1),
        }}
      >
        {/* <AppText text={JSON.stringify(createCampaign)} /> */}
        <Pressable>
          <AppText
            text="Create campaign"
            fontFamily={"Poppins_600SemiBold"}
            fontSize={26}
          />
          <AppText
            text="Create campaign and take the first step towards the grand journey ahead"
            fontSize={13}
            color={colors.black50}
          />
          <Input
            variant="text"
            placeholder="Campaign Name"
            type="outline"
            width={0.9}
            textAlign="left"
            mt={h(0.02)}
            fontSize={14}
            value={createCampaign?.campaignName}
            onChangeText={(t) =>
              dispatch(
                setCampaignName({
                  campaignName: t,
                })
              )
            }
          />

          <AppText
            text="Time Period"
            fontFamily={"Poppins_600SemiBold"}
            fontSize={13}
            color={colors.black50}
            mt={h(0.02)}
          />
          {open && (
            <DateTimePicker
              display={Platform.OS === "ios" ? "spinner" : "default"}
              value={new Date()}
              onChange={(e, tdate) => {
                setOpen(false);
                setDate(e.nativeEvent.timestamp);
                dispatch(
                  setStartDate({
                    startDate: moment(e.nativeEvent.timestamp).format(
                      "DD/MM/YYYY"
                    ),
                  })
                );
              }}
            />
          )}
          {open1 && (
            <DateTimePicker
              display={Platform.OS === "ios" ? "spinner" : "default"}
              value={new Date()}
              onChange={(e, tdate) => {
                setOpen1(false);
                setDate1(e.nativeEvent.timestamp);
                dispatch(
                  setEndDate({
                    endDate: moment(e.nativeEvent.timestamp).format(
                      "DD/MM/YYYY"
                    ),
                  })
                );
              }}
            />
          )}
          <View style={global.between}>
            <View>
              <View style={{ position: "relative", marginTop: h(0.04) }}>
                <BoxShadow
                  height={h(0.07)}
                  width={w(0.4)}
                  radius={13}
                  top={h(0.005)}
                />
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  style={[
                    global.between,
                    {
                      minHeight: h(0.07),
                      width: w(0.4),
                      borderRadius: 13,
                      position: "relative",
                      borderColor: colors.black30,
                      backgroundColor: colors.white,
                      borderWidth: 1,
                      paddingHorizontal: w(0.07),
                    },
                  ]}
                >
                  {createCampaign?.campaignPeriod?.startDate !== "" && (
                    <View
                      style={{
                        backgroundColor: colors.white,
                        position: "absolute",
                        top: -h(0.01),
                        left: w(0.03),
                        paddingHorizontal: w(0.01),
                      }}
                    >
                      <AppText
                        textAlign={"center"}
                        text="Start Date"
                        fontFamily={"Montserrat_500Medium"}
                        fontSize={12}
                        color={colors.black}
                      />
                    </View>
                  )}
                  <AppText
                    text={`${
                      createCampaign?.campaignPeriod?.startDate === ""
                        ? "Start Date"
                        : createCampaign?.campaignPeriod?.startDate
                    }`}
                    fontFamily={"Montserrat_500Medium"}
                    fontSize={15}
                  />

                  <Icon name={calender} size={w(0.05)} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View>
                <View style={{ position: "relative", marginTop: h(0.04) }}>
                  <BoxShadow
                    height={h(0.07)}
                    width={w(0.4)}
                    radius={13}
                    top={h(0.005)}
                  />
                  <TouchableOpacity
                    onPress={() => setOpen1(true)}
                    style={[
                      global.between,
                      {
                        minHeight: h(0.07),
                        width: w(0.4),
                        borderRadius: 13,
                        position: "relative",
                        borderColor: colors.black30,
                        backgroundColor: colors.white,
                        borderWidth: 1,
                        paddingHorizontal: w(0.07),
                      },
                    ]}
                  >
                    {createCampaign?.campaignPeriod?.startDate !== "" && (
                      <View
                        style={{
                          backgroundColor: colors.white,
                          position: "absolute",
                          top: -h(0.01),
                          left: w(0.03),
                          paddingHorizontal: w(0.01),
                        }}
                      >
                        <AppText
                          textAlign={"center"}
                          text="End Date"
                          fontFamily={"Montserrat_500Medium"}
                          fontSize={12}
                          color={colors.black}
                        />
                      </View>
                    )}
                    <AppText
                      text={`${
                        createCampaign?.campaignPeriod?.endDate === ""
                          ? "End Date"
                          : createCampaign?.campaignPeriod?.endDate
                      }`}
                      fontFamily={"Montserrat_500Medium"}
                      fontSize={15}
                    />

                    <Icon name={calender} size={w(0.05)} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <AppText
            text={"Socials & Deliverables"}
            fontFamily={"Poppins_600SemiBold"}
            fontSize={13}
            color={colors.black50}
            mt={h(0.02)}
          />
          <DropDown
            data={deliverable}
            selected={selected}
            setSelected={setSelected}
          />
          {selected && (
            <View
              style={{
                marginTop: h(0.05),
                minHeight: h(0.1),
                width: "100%",
                borderRadius: 15,
                position: "relative",
                borderColor: colors.black30,
                borderWidth: 1,
                paddingTop: h(0.03),
                paddingHorizontal: w(0.03),
              }}
            >
              <View
                style={{
                  backgroundColor: colors.white,
                  position: "absolute",
                  top: -h(0.01),
                  left: w(0.03),
                  paddingHorizontal: w(0.01),
                }}
              >
                <AppText
                  textAlign={"center"}
                  text="Deliverables"
                  fontFamily={"Montserrat_500Medium"}
                  fontSize={12}
                  color={colors.black30}
                />
              </View>
              {selected?.types.map((v, i) => (
                <TouchableOpacity
                  key={i}
                  style={{ width: "100%" }}
                  onPress={() => {
                    createCampaign?.deliverable.includes(v.value)
                      ? dispatch(
                          setDeliverable({
                            deliverable: createCampaign.deliverable.filter(
                              (d) => d !== v.value
                            ),
                          })
                        )
                      : dispatch(
                          setDeliverable({
                            deliverable: [
                              ...createCampaign?.deliverable,
                              v.value,
                            ],
                          })
                        );
                  }}
                >
                  <View style={global.start}>
                    <Icon
                      name={
                        createCampaign?.deliverable.includes(v.value)
                          ? checked
                          : unchecked
                      }
                      size={w(0.05)}
                    />
                    <AppText text={v.name} ml={w(0.03)} />
                  </View>

                  <Hr
                    alignSelf="center"
                    width={selected?.types?.length - 1 === i ? 0 : "85%"}
                    borderWidth={0.5}
                    mt={h(0.01)}
                    mb={h(0.01)}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
          <AppText
            text="Do’s Donts"
            fontFamily={"Poppins_600SemiBold"}
            fontSize={13}
            color={colors.black50}
            mt={h(0.02)}
          />
          <View
            style={{
              marginTop: h(0.05),
              minHeight: h(0.1),
              width: "100%",
              borderRadius: 15,
              position: "relative",
              borderColor: colors.black30,
              borderWidth: 1,
              paddingTop: h(0.03),
              paddingHorizontal: w(0.03),
            }}
          >
            <View
              style={{
                backgroundColor: colors.white,
                position: "absolute",
                top: -h(0.01),
                left: w(0.03),
                paddingHorizontal: w(0.01),
              }}
            >
              <AppText
                textAlign={"center"}
                text="Do's"
                fontFamily={"Montserrat_500Medium"}
                fontSize={12}
                color={colors.black30}
              />
            </View>
            {createCampaign?.dos.map((v, i) => (
              <View key={i}>
                <View style={[global.start, { alignItems: "flex-start" }]}>
                  <AppText text={"\u2022"} />
                  <AppText text={v} ml={w(0.01)} />
                </View>
                {createCampaign?.dos?.length - 1 === i && (
                  <TextInput
                    style={{ width: "100%", color: colors.black }}
                    placeholder="Type for more do's"
                    placeholderTextColor={colors.black30}
                    cursorColor={colors.black}
                    value={text}
                    onChangeText={(t) => setText(t)}
                    onSubmitEditing={() => {
                      dispatch(
                        setDos({
                          dos: [...createCampaign?.dos, text],
                        })
                      );
                      setText("");
                    }}
                  />
                )}
              </View>
            ))}
          </View>
          <View
            style={{
              marginTop: h(0.05),
              minHeight: h(0.1),
              width: "100%",
              borderRadius: 15,
              position: "relative",
              borderColor: colors.black30,
              borderWidth: 1,
              paddingTop: h(0.03),
              paddingHorizontal: w(0.03),
              marginBottom: h(0.5),
            }}
          >
            <View
              style={{
                backgroundColor: colors.white,
                position: "absolute",
                top: -h(0.01),
                left: w(0.03),
                paddingHorizontal: w(0.01),
              }}
            >
              <AppText
                textAlign={"center"}
                text="Dont's"
                fontFamily={"Montserrat_500Medium"}
                fontSize={12}
                color={colors.black30}
              />
            </View>
            {createCampaign?.donts.map((v, i) => (
              <View key={i}>
                <View style={[global.start, { alignItems: "flex-start" }]}>
                  <AppText text={"\u2022"} />
                  <AppText text={v} ml={w(0.01)} />
                </View>
                {createCampaign?.donts?.length - 1 === i && (
                  <TextInput
                    style={{ width: "100%", color: colors.black }}
                    placeholder="Type for more dont's"
                    placeholderTextColor={colors.black30}
                    cursorColor={colors.black}
                    value={text}
                    onChangeText={(t) => setText(t)}
                    onSubmitEditing={() => {
                      dispatch(
                        setDonts({
                          donts: [...createCampaign?.donts, text],
                        })
                      );
                      setText("");
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        </Pressable>
      </ScrollView>
    </Layout>
  );
};

export default CreateCampaign;
