import {
  View,
  Pressable,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../../assets/colors";
import {
  AppText,
  AuthHeader,
  BoxShadow,
  Button,
  DropDownBudget,
  DropDownGender,
  DropDownGenderAuth,
  Icon,
  Input,
  Layout,
  SheetEmail,
} from "../../../components";
import { useNavigationState } from "@react-navigation/native";
import { h, w } from "../../../config/utilFunction";

import { pressMove } from "../../../config/animation";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBarter,
  setDOB,
  setError,
  setGender,
} from "../../../redux/authSlice";
import moment from "moment";
import as from "@react-native-async-storage/async-storage";

import { global } from "../../../styles";
import { calender, locationblack } from "../../../container/icons";

import { HelperText } from "react-native-paper";

const gender = [
  { id: 1, name: "Male" },
  { id: 2, name: "Female" },
  { id: 3, name: "Others" },
];

const budget = [
  { id: 1, name: "0K-10K", min: 0, max: 10000 },
  { id: 2, name: "10K-25K", min: 10000, max: 25000 },
  { id: 3, name: "25K-50K", min: 25000, max: 50000 },
  { id: 4, name: "50K-100K", min: 50000, max: 100000 },
  { id: 5, name: "1L+", min: 100000, max: 10000000 },
];

const PersonalInfo = ({ navigation }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [selectedBudget, setSelectedBudget] = useState(
    budget.filter((v) => v.min === auth?.budget?.min)[0] || null
  );

  const buttonRef = useRef(new Animated.Value(0)).current;
  const nsheetRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(
    new Date(moment().subtract(14, "years").format())
  );
  const [showDate, setShowDate] = useState(
    moment(auth?.DOB).format("DD/MM/YYYY")
  );

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (
      auth?.gender === "" ||
      auth?.DOB === "" ||
      auth?.state == "" ||
      auth?.city == ""
    ) {
      console.log("error");
      dispatch(setError({ error: true }));
    } else {
      console.log("noerror");
      dispatch(setError({ error: false }));
      await as.setItem("@auth_user", JSON.stringify(auth));
      navigation.navigate("LogoUpload");
    }
  };
  const toggleSwitch = () =>
    dispatch(selectBarter({ barter: !auth?.barterAvailability }));
  return (
    <Layout>
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          paddingHorizontal: w(0.075),
        }}
      >
        <AuthHeader index={2} progress={0.4} />
        <AppText
          fontFamily={"Poppins_600SemiBold"}
          fontSize={26}
          text="Personal info"
          mt={h(0.025)}
        />
        <AppText
          fontSize={13}
          text="By providing this information, you enable us to tailor your influencer journey."
          color={colors.black50}
          mt={h(0.01)}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: h(0.05),
            paddingTop: h(0.03),
          }}
        >
          <DropDownGenderAuth
            type="inline"
            data={gender}
            selected={gender.filter((v) => v.name == auth?.gender)[0]}
            setSelected={(t) => dispatch(setGender({ gender: t.name }))}
          />
          <DropDownBudget
            mt={h(0.04)}
            type="inline"
            data={budget}
            selected={selectedBudget}
            setSelected={setSelectedBudget}
          />
          <View style={{ position: "relative", marginTop: h(0.04) }}>
            <BoxShadow
              height={h(0.07)}
              width={"100%"}
              radius={13}
              top={h(0.005)}
            />
            <View
              style={[
                global.between,
                {
                  minHeight: h(0.07),
                  width: "100%",
                  borderRadius: 13,
                  position: "relative",
                  borderColor: colors.black30,
                  borderWidth: 1,
                  backgroundColor: colors.white,
                  paddingHorizontal: w(0.07),
                },
              ]}
            >
              <AppText
                text={"Barter: " + `${auth?.barterAvailability ? "Yes" : "No"}`}
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
                value={auth?.barterAvailability}
              />
            </View>
          </View>
          {open && (
            <DateTimePicker
              display={Platform.OS === "ios" ? "spinner" : "default"}
              value={date}
              maximumDate={new Date(moment().subtract(14, "years").format())}
              onChange={(e, tdate) => {
                setOpen(false);
                setDate(e.nativeEvent.timestamp);
                dispatch(setDOB({ DOB: moment(date).format() }));
                setShowDate(
                  moment(e.nativeEvent.timestamp).format("DD/MM/YYYY")
                );
              }}
            />
          )}

          <View style={{ position: "relative", marginTop: h(0.04) }}>
            <BoxShadow
              height={h(0.07)}
              width={"100%"}
              radius={13}
              top={h(0.005)}
            />
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={[
                global.between,
                {
                  minHeight: h(0.07),
                  width: "100%",
                  borderRadius: 13,
                  position: "relative",
                  borderColor: colors.black30,
                  backgroundColor: colors.white,
                  borderWidth: 1,
                  paddingHorizontal: w(0.07),
                },
              ]}
            >
              {auth?.DOB !== "" && (
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
                    text="DOB"
                    fontFamily={"Montserrat_500Medium"}
                    fontSize={12}
                    color={colors.black}
                  />
                </View>
              )}
              <AppText
                text={`${auth?.DOB === "" ? "DOB" : showDate}`}
                fontFamily={"Montserrat_500Medium"}
                fontSize={15}
              />

              <Icon name={calender} size={w(0.05)} />
            </TouchableOpacity>
          </View>
          <View style={{ position: "relative", marginTop: h(0.04) }}>
            <BoxShadow
              height={h(0.07)}
              width={"100%"}
              radius={13}
              top={h(0.005)}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Location")}
              style={[
                global.between,
                {
                  minHeight: h(0.07),
                  width: "100%",
                  borderRadius: 15,
                  backgroundColor: colors.white,
                  position: "relative",
                  borderColor: colors.black30,
                  borderWidth: 1,
                  paddingHorizontal: w(0.07),
                },
              ]}
            >
              {auth?.state !== "" && auth?.city !== "" && (
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
                    text="Location"
                    fontFamily={"Montserrat_500Medium"}
                    fontSize={12}
                    color={colors.black}
                  />
                </View>
              )}
              <AppText
                text={`${
                  auth?.state === "" && auth?.city === ""
                    ? "Location"
                    : auth?.state + ", " + auth?.city
                }`}
                fontFamily={"Montserrat_500Medium"}
                fontSize={15}
              />

              <Icon name={locationblack} size={w(0.05)} />
            </TouchableOpacity>
          </View>
          {auth?.error && (
            <HelperText type="error" visible={auth?.error}>
              Complete all the fields
            </HelperText>
          )}
          <TouchableOpacity
            activeOpacity={0.4}
            onPressIn={() => pressMove(buttonRef)}
            onPressOut={handleSubmit}
            style={{
              marginTop: auth?.error ? 0 : h(0.03),
              alignSelf: "center",
            }}
          >
            <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default PersonalInfo;
