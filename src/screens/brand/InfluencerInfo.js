import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import {
  AppText,
  CreateCampaignHeader,
  DropDownGender,
  DropDownInfo,
  Hr,
  Icon,
  Input,
  Layout,
} from "../../components";
import colors from "../../assets/colors";
import { h, w } from "../../config/utilFunction";
import { useDispatch, useSelector } from "react-redux";
import { data } from "../../assets/data/CategoryData";
import { checked, unchecked } from "../../container/icons";
import { global } from "../../styles";
import {
  setAgeFrom,
  setAgeTo,
  setBarter,
  setCategories,
  setRequiredInfluencers,
} from "../../redux/createCampaignSlice";
import { useNavigation } from "@react-navigation/native";

const InfluencerInfo = () => {
  const { createCampaign, user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  const navigation = useNavigation();

  const [selected, setSelected] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const toggleSwitch = () =>
    dispatch(setBarter({ barter: !createCampaign?.barter }));

  const followerRange = [
    { id: 1, name: "1K-20K", min: 1000, max: 20000 },
    { id: 2, name: "20K-50K", min: 20000, max: 50000 },
    { id: 3, name: "50K-100K", min: 50000, max: 100000 },
    { id: 4, name: "100K-250K", min: 10000, max: 25000 },
    { id: 5, name: "250K-500K", min: 250000, max: 500000 },
    { id: 6, name: "250K-500K", min: 250000, max: 500000 },
    { id: 7, name: "500K-1M", min: 500000, max: 1000000 },
    { id: 7, name: "1M+", min: 1000000, max: 10000000 },
  ];

  const gender = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 4, name: "Others" },
    { id: 5, name: "Male & Female" },
    { id: 3, name: "All" },
  ];
  const disableCondition =
    createCampaign?.campaignCategories?.length < 1 ||
    createCampaign?.age?.min < 1 ||
    createCampaign?.influencerRequired < 1 ||
    createCampaign?.followersRange < 1 ||
    createCampaign?.gender === "";

  const movetonext = () => {
    if (disableCondition) {
      dispatch(
        setError({
          error: true,
          message: "Complete all fields",
        })
      );
    } else {
      navigation.navigate("CampaignMedia");
    }
  };

  return (
    <Layout>
      <CreateCampaignHeader index={1} handleSubmit={movetonext} />
      <ScrollView>
        <Pressable>
          <View
            style={{
              backgroundColor: colors.white,
              paddingHorizontal: w(0.05),
              paddingTop: h(0.02),
              paddingBottom: h(0.2),
            }}
          >
            <AppText
              text="Influencer Info"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={26}
            />
            <AppText
              text="By providing this information, you enable us to tailor your influencer journey ."
              fontSize={13}
              color={colors.black50}
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
                  text="Select Category"
                  fontFamily={"Montserrat_500Medium"}
                  fontSize={12}
                  color={colors.black30}
                />
              </View>
              {data?.map((v, i) => (
                <TouchableOpacity
                  key={i}
                  style={{ width: "100%" }}
                  onPress={() => {
                    createCampaign?.categories.includes(v.id)
                      ? dispatch(
                          setCategories({
                            categories: createCampaign?.categories.filter(
                              (d) => d !== v.id
                            ),
                          })
                        )
                      : dispatch(
                          setCategories({
                            categories: [...createCampaign?.categories, v.id],
                          })
                        );
                  }}
                >
                  <View style={global.start}>
                    <Icon
                      name={
                        createCampaign?.categories.includes(v.id)
                          ? checked
                          : unchecked
                      }
                      size={w(0.05)}
                    />
                    <AppText text={v.name} ml={w(0.03)} />
                  </View>

                  <Hr
                    alignSelf="center"
                    width={data?.length - 1 === i ? 0 : "85%"}
                    borderWidth={0.5}
                    mt={h(0.01)}
                    mb={h(0.01)}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <AppText
              text="Select Age"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={13}
              color={colors.black50}
              mt={h(0.02)}
            />
            <View style={[global.between, { marginTop: h(0.02) }]}>
              <Input
                type="outline"
                variant="number"
                maxLength={3}
                width={0.4}
                fontSize={14}
                placeholder="From"
                value={createCampaign?.age.min}
                onChangeText={(t) => dispatch(setAgeFrom({ min: t }))}
              />
              <AppText
                text="To"
                fontFamily={"Poppins_600SemiBold"}
                fontSize={13}
                color={colors.black50}
                mt={h(0.02)}
              />
              <Input
                type="outline"
                variant="number"
                maxLength={3}
                width={0.4}
                fontSize={14}
                placeholder="Till"
                value={createCampaign?.age.max}
                onChangeText={(t) => dispatch(setAgeTo({ max: t }))}
              />
            </View>
            <AppText
              text="Budget"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={13}
              color={colors.black50}
              mt={h(0.02)}
            />
            <View
              style={[
                global.between,
                {
                  marginTop: h(0.02),
                  minHeight: h(0.07),
                  width: "100%",
                  borderRadius: 15,
                  position: "relative",
                  borderColor: colors.black30,
                  borderWidth: 1,
                  paddingHorizontal: w(0.03),
                },
              ]}
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
                  text="Barter"
                  fontFamily={"Montserrat_500Medium"}
                  fontSize={12}
                  color={colors.black30}
                />
              </View>
              <AppText
                text={"Barter: " + `${createCampaign.barter ? "Yes" : "No"}`}
                fontFamily={"Montserrat_500Medium"}
                fontSize={15}
              />
              <Switch
                trackColor={{
                  false: "rgba(216, 216, 216, 1)",
                  true: colors.green,
                }}
                thumbColor={colors.white}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={createCampaign?.barter}
              />
            </View>
            <AppText
              text="Number of Influencers"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={13}
              color={colors.black50}
              mt={h(0.02)}
            />
            <Input
              type="outline"
              variant="number"
              textAlign={"left"}
              maxLength={3}
              width={0.9}
              fontSize={14}
              mt={h(0.02)}
              placeholder="Required Influencers"
              value={createCampaign?.requiredInfluencers}
              onChangeText={(t) =>
                dispatch(setRequiredInfluencers({ requiredInfluencers: t }))
              }
            />
            <AppText
              text="Follower Range"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={13}
              color={colors.black50}
              mt={h(0.02)}
            />
            <DropDownInfo
              data={followerRange}
              selected={selected}
              setSelected={setSelected}
            />
            <AppText
              text="Gender"
              fontFamily={"Poppins_600SemiBold"}
              fontSize={13}
              color={colors.black50}
              mt={h(0.02)}
            />
            <DropDownGender
              data={gender}
              selected={selectedGender}
              setSelected={setSelectedGender}
            />
          </View>
        </Pressable>
      </ScrollView>
    </Layout>
  );
};

export default InfluencerInfo;
