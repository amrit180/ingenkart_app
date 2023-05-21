import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useRef, useState } from "react";
import {
  AppText,
  Button,
  Input,
  Layout,
  SingleCampaignHeader,
} from "../../components";
import { h, w } from "../../config/utilFunction";
import { pressMove } from "../../config/animation";
import { useNavigation } from "@react-navigation/native";
import { addKycBankDetails } from "../../functions/user";
import { useSelector } from "react-redux";

const BankDetails = () => {
  const { user } = useSelector((s) => ({ ...s }));
  const [values, setValues] = useState({
    bankAccountName: "",
    accountNumber: "",
    ifscCode: "",
  });
  const navigation = useNavigation();
  const buttonRef = useRef(new Animated.Value(0)).current;
  const handleSubmit = () => {
    addKycBankDetails(
      values.bankAccountName,
      values.accountNumber,
      values.ifscCode,
      user?._id,
      user?.token
    )
      .then(() => navigation.replace("Settings"))
      .catch((err) => console.log(err.response.data));
  };
  return (
    <Layout>
      <SingleCampaignHeader brandName={"Kyc Details"} right={false} />
      <View style={{ paddingHorizontal: w(0.05), marginTop: h(0.05) }}>
        <AppText
          text={"Add your Bank Account"}
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
          placeholder={"Account Number"}
          fontSize={14}
          mt={h(0.02)}
          mb={h(0.01)}
          textAlign={"left"}
          value={values.accountNumber}
          onChangeText={(t) => setValues({ ...values, accountNumber: t })}
        />

        <Input
          variant={"text"}
          type="outline"
          height={0.06}
          width={0.9}
          placeholder={"Account Name"}
          fontSize={14}
          mb={h(0.01)}
          textAlign={"left"}
          value={values.bankAccountName}
          onChangeText={(t) => setValues({ ...values, bankAccountName: t })}
        />
        <Input
          variant={"text"}
          type="outline"
          height={0.06}
          width={0.9}
          placeholder={"Ifsc Code"}
          fontSize={14}
          mb={h(0.01)}
          textAlign={"left"}
          value={values.ifscCode}
          onChangeText={(t) => setValues({ ...values, ifscCode: t })}
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

export default BankDetails;
