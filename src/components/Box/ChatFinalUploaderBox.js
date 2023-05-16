import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AppText from "../AppText";
import { fs, h, w } from "../../config/utilFunction";
import {
  bggreylink,
  blackadd,
  blacklink,
  cross,
  greyplus,
  instagram,
  instagramlogo,
  reelslogo,
  shorts,
  youtube,
} from "../../container/icons";
import BoxShadow from "../BoxShadow";
import colors from "../../assets/colors";
import Input from "../Input";
import Icon from "../Icon";
import { global } from "../../styles";
import Button from "../Button";

const ChatFinalUploaderBox = ({ handleSubmit, scrollTo }) => {
  const [links, setLinks] = useState({
    url: "",
    platform: "youtube",
  });
  const [links1, setLinks1] = useState({
    url: "",
    platform: "shorts",
  });
  const [links2, setLinks2] = useState({
    url: "",
    platform: "reels",
  });
  const [links3, setLinks3] = useState({
    url: "",
    platform: "instagram",
  });

  const [text, setText] = useState("");

  const handler = () => {
    // !data.text.replace(/\s/g, '').length ||
    // data.links.length == 0 ||
    // data.text.length > 5
    //   ? handleSubmit(data)
    //   : console.log('no links found');
    // !data.text.replace(/\s/g, '').length ||
    // data.links.length == 0 ||
    // data.text.length > 5
    //   ? scrollTo(0)
    //   : console.log('no links found');
    // !data.text.replace(/\s/g, '').length ||
    // data.links.length == 0 ||
    // data.text.length > 5
    //   ? setData(initialState)
    //   : console.log('no links found');
    let data = [];
    data = [...data, links, links1, links2, links3];
    handleSubmit({ links: data, text });
    scrollTo(0);
    setLinks({
      url: "",
      platform: "youtube",
    });
    setLinks1({
      url: "",
      platform: "shorts",
    });
    setLinks2({
      url: "",
      platform: "reels",
    });
    setLinks3({
      url: "",
      platform: "instagram",
    });
    setText("");
  };

  return (
    <View>
      <AppText text="Submit" fontFamily={"Poppins_700Bold"} fontSize={26} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AppText fontSize={12} mr={w(0.01)} text="Paste URL" />

        <Icon name={blacklink} size={w(0.02)} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "column" }}>
          <View style={global.start}>
            <View
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
                <Icon
                  name={links?.platform === "youtube" && youtube}
                  size={w(0.09)}
                />
                <TextInput
                  value={links?.url}
                  placeholder="Youtube"
                  style={{ width: "75%", color: colors.black }}
                  onChangeText={(t) => {
                    setLinks({
                      ...links,
                      platform: "youtube",
                      url: t,
                    });
                  }}
                />

                {links?.platform === "youtube" && links?.url == "" ? (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={{
                      position: "absolute",
                      right: w(0.03),
                    }}
                  >
                    <Icon name={blackadd} size={w(0.05)} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => {
                      setLinks({
                        ...links,
                        platform: "youtube",
                        url: "",
                      });
                    }}
                    style={{
                      position: "absolute",
                      right: w(0.03),
                    }}
                  >
                    <Icon name={cross} size={15} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
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
                <Icon
                  name={links1?.platform === "shorts" && shorts}
                  size={w(0.09)}
                />
                <TextInput
                  value={links1?.url}
                  placeholder="shorts"
                  style={{ width: "75%", color: colors.black }}
                  onChangeText={(t) => {
                    setLinks1({
                      ...links1,
                      platform: "shorts",
                      url: t,
                    });
                  }}
                />

                {links1?.platform === "shorts" && links1?.url == "" ? (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={{
                      position: "absolute",
                      right: w(0.03),
                    }}
                  >
                    <Icon name={blackadd} size={w(0.05)} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => {
                      setLinks1({
                        ...links1,
                        platform: "shorts",
                        url: "",
                      });
                    }}
                    style={{
                      position: "absolute",
                      right: w(0.03),
                    }}
                  >
                    <Icon name={cross} size={15} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View style={global.start}>
            <View
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
                <Icon
                  name={links2?.platform === "reels" && reelslogo}
                  size={w(0.09)}
                />
                <TextInput
                  value={links2?.url}
                  placeholder="Reels"
                  style={{ width: "75%", color: colors.black }}
                  onChangeText={(t) => {
                    setLinks2({
                      ...links2,
                      platform: "reels",
                      url: t,
                    });
                  }}
                />

                {links2?.platform === "reels" && links2?.url == "" ? (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={{
                      position: "absolute",
                      right: w(0.03),
                    }}
                  >
                    <Icon name={blackadd} size={w(0.05)} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => {
                      setLinks({
                        ...links,
                        platform: "reels",
                        url: "",
                      });
                    }}
                    style={{
                      position: "absolute",
                      right: w(0.03),
                    }}
                  >
                    <Icon name={cross} size={15} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
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
                <Icon
                  name={links3?.platform === "instagram" && instagram}
                  size={w(0.09)}
                />
                <TextInput
                  value={links3?.url}
                  placeholder="instagram"
                  style={{ width: "75%", color: colors.black }}
                  onChangeText={(t) => {
                    setLinks3({
                      ...links3,
                      platform: "instagram",
                      url: t,
                    });
                  }}
                />

                {links?.platform === "instagram" && links3?.url == "" ? (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    style={{
                      position: "absolute",
                      right: w(0.03),
                    }}
                  >
                    <Icon name={blackadd} size={w(0.05)} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => {
                      setLinks({
                        ...links,
                        platform: "instagram",
                        url: "",
                      });
                    }}
                    style={{
                      position: "absolute",
                      right: w(0.03),
                    }}
                  >
                    <Icon name={cross} size={15} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

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
          onChangeText={(text) => setText(text)}
          textAlignVertical={"top"}
          fontFamily={"Poppins_400Regular"}
          width={0.9}
          height={0.25}
          textAlign="left"
          fontSize={14}
          pH={w(0.05)}
          value={text}
        />
        <AppText
          text={`${text?.length}/2500`}
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

export default ChatFinalUploaderBox;
