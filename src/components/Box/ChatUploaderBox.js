import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import AppText from "../AppText";
import { h, w } from "../../config/utilFunction";
import { bggreylink, blacklink, cross, greyplus } from "../../container/icons";
import BoxShadow from "../BoxShadow";
import colors from "../../assets/colors";
import Input from "../Input";
import Icon from "../Icon";
import { global } from "../../styles";
import Button from "../Button";

const initialState = {
  links: [],
  text: "",
};

const ChatUploaderBox = ({ handleSubmit, scrollTo }) => {
  const [data, setData] = useState(initialState);
  const [link, setLink] = useState("");
  const handler = () => {
    !data.text.replace(/\s/g, "")?.length ||
    data.links?.length == 0 ||
    data.text?.length > 5
      ? handleSubmit(data)
      : console.log("no links found");
    !data.text.replace(/\s/g, "")?.length ||
    data.links?.length == 0 ||
    data.text?.length > 5
      ? scrollTo(0)
      : console.log("no links found");
    !data.text.replace(/\s/g, "")?.length ||
    data.links?.length == 0 ||
    data.text?.length > 5
      ? setData(initialState)
      : console.log("no links found");
  };
  return (
    <View>
      <AppText text="Submit" fontFamily={"Poppins_700Bold"} fontSize={26} />
      {data?.links?.length > 0 && (
        <FlatList
          data={data.links}
          keyExtractor={(item) => Math.random()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
          }}
          style={{ maxHeight: h(0.2) }}
          renderItem={({ item, i }) => {
            return (
              <Pressable
                style={{
                  marginTop: h(0.005),
                  position: "relative",
                  marginBottom: h(0.02),
                  marginRight: w(0.05),
                }}
              >
                <BoxShadow
                  height={h(0.07)}
                  width={w(0.7)}
                  radius={15}
                  top={h(0.003)}
                />
                <View
                  style={[
                    global.start,
                    {
                      borderWidth: 1,
                      borderColor: colors.black30,
                      borderRadius: 15,
                      color: colors.black,
                      height: h(0.07),
                      paddingHorizontal: w(0.03),

                      position: "relative",
                      backgroundColor: colors.white,

                      width: w(0.7),
                    },
                  ]}
                >
                  <Icon name={bggreylink} size={w(0.05)} />
                  <AppText
                    text={`${
                      item.url?.length > 25
                        ? item.url.substring(0, 25) + "..."
                        : item.url
                    }`}
                    fontSize={15}
                    ml={w(0.01)}
                  />
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => {
                      let arr = [];
                      arr = data.links;
                      arr.splice(i, 1);
                      setData({ ...data, links: arr });
                    }}
                    style={{
                      position: "absolute",
                      right: w(0.03),
                    }}
                  >
                    <Icon name={cross} size={15} />
                  </TouchableOpacity>
                </View>
              </Pressable>
            );
          }}
        />
      )}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AppText fontSize={12} mr={w(0.01)} text="Paste URL" />

        <Icon name={blacklink} size={w(0.02)} />
      </View>

      <View
        style={{
          marginTop: h(0.02),
          position: "relative",
          marginBottom: h(0.05),
        }}
      >
        <Input
          variant="text"
          placeholder={"Paste any Drive or files links"}
          value={link}
          maxLength={10000}
          onChangeText={(text) => setLink(text)}
          width={0.9}
          fontSize={14}
          textAlign="left"
          pH={w(0.05)}
          fontFamily={"Poppins_400Regular"}
        />

        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            let arr = [];
            arr = data.links;
            arr.push({
              platform: "demo",
              url: link,
            });
            setData({ ...data, links: arr });
            setLink("");
            Keyboard.dismiss();
          }}
          style={{
            // height: h(0.05),
            // width: w(0.05),
            backgroundColor: colors.white,
            position: "absolute",
            right: w(0.05),
            top: w(0.04),
          }}
        >
          <Icon name={greyplus} size={w(0.06)} />
        </TouchableOpacity>
      </View>
      <AppText fontSize={12} text="Add NOTES" mb={h(0.02)} />

      <View
        style={{
          position: "relative",
          marginBottom: h(0.04),
        }}
      >
        <Input
          variant={"text"}
          maxLength={2500}
          multiline={true}
          placeholder={`${
            ". Add captions" +
            "\n" +
            "\n" +
            ". Drive links for any files" +
            "\n" +
            "\n" +
            ". Youtube links " +
            "\n" +
            "\n" +
            ". any other URLs" +
            "\n" +
            "\n" +
            ". Any other notes"
          }`}
          onChangeText={(text) => setData({ ...data, text: text })}
          textAlignVertical={"top"}
          fontFamily={"Poppins_400Regular"}
          width={0.9}
          height={0.27}
          textAlign="left"
          fontSize={14}
          pH={w(0.05)}
          value={data.text}
        />
        <AppText
          text={`${data.text?.length}/2500`}
          fontSize={12}
          color={colors.black50}
          position={"absolute"}
          bottom={10}
          right={10}
        />
      </View>
      <Button
        onPress={handler}
        variant={"standard"}
        height={h(0.07)}
        width={w(0.9)}
        name="Submit"
      />
    </View>
  );
};

export default ChatUploaderBox;
