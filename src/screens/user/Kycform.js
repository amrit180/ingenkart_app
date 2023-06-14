import { View, Text, TouchableOpacity, Animated, Image } from "react-native";
import React, { useRef, useState } from "react";
import {
  AppText,
  Button,
  Icon,
  Input,
  Layout,
  SingleCampaignHeader,
} from "../../components";
import { h, w } from "../../config/utilFunction";
import { pressMove } from "../../config/animation";
import colors from "../../assets/colors";
import { clicktoupload, upload } from "../../container/icons";
import { useNavigation } from "@react-navigation/native";
import { addKycDetails } from "../../functions/user";
import { useSelector } from "react-redux";

const Kycform = () => {
  const buttonRef = useRef(new Animated.Value(0)).current;
  const { user } = useSelector((s) => ({ ...s }));

  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const [values, setValues] = useState({
    name: "",
    address: "",
    pannumber: "",
  });

  function isValidPAN(panNumber) {
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    return panRegex.test(panNumber);
  }
  const handleSubmit = () => {
    if (isValidPAN(values.pannumber)) {
      setError(true);
    } else {
      setError(false);
      addKycDetails(
        values.name,
        values.address,
        values.pannumber,
        user?._id,
        user?.token
      )
        .then(() => {
          navigation.navigate("KycDocument");
        })
        .catch((err) => console.log(err.response.data));
    }
  };

  return (
    <Layout>
      <SingleCampaignHeader brandName={"Kyc Details"} right={false} />
      <View style={{ paddingHorizontal: w(0.05), marginTop: h(0.05) }}>
        <AppText
          text={"Verify your KYC details here"}
          fontSize={22}
          fontFamily={"Poppins_600SemiBold"}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Input
          variant={"text"}
          type="outline"
          height={0.06}
          width={0.9}
          placeholder={"Full Name (As per PAN Card)"}
          fontSize={14}
          mt={h(0.02)}
          mb={h(0.01)}
          textAlign={"left"}
          value={values.name}
          onChangeText={(t) => setValues({ ...values, name: t })}
        />

        <Input
          variant={"text"}
          type="outline"
          height={0.06}
          width={0.9}
          placeholder={"Current Address"}
          fontSize={14}
          mb={h(0.01)}
          textAlign={"left"}
          value={values.address}
          onChangeText={(t) => setValues({ ...values, address: t })}
        />
        <Input
          variant={"text"}
          type="outline"
          height={0.06}
          width={0.9}
          placeholder={"PAN"}
          fontSize={14}
          mb={h(0.01)}
          textAlign={"left"}
          error={error && values.pannumber.match(regex)}
          message="Invalid Pan Number"
          value={values.pannumber}
          onChangeText={(t) => setValues({ ...values, pannumber: t })}
        />
        <TouchableOpacity
          activeOpacity={0.4}
          onPressIn={() => pressMove(buttonRef)}
          onPressOut={handleSubmit}
          style={{
            marginTop: h(0.2),
            alignSelf: "center",
          }}
        >
          <Button variant="round" size={w(0.13)} buttonRef={buttonRef} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Kycform;
