import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import { h, w } from "../../config/utilFunction";
import colors from "../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { Icon, Layout } from "../../components";
import { cross } from "../../container/icons";
import { global } from "../../styles";
const { height } = Dimensions.get("screen");
const Story = ({ route }) => {
  const item = route.params;
  const navigation = useNavigation();
  const [content, setContent] = useState(item);
  const [current, setCurrent] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const onStart = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        next();
      }
    });
  };

  const next = () => {
    if (current !== content.length - 1) {
      let tempData = content;
      tempData[current].finished = 1;
      setContent(tempData);
      setCurrent(current + 1);
      progress.setValue(0);
    } else {
      close();
    }
  };
  const previous = () => {
    if (current - 1 >= 0) {
      let tempData = content;
      tempData[current].finished = 0;
      setContent(tempData);
      progress.setValue(0);
      setCurrent(current - 1);
    } else {
      close();
    }
  };

  const close = () => {
    progress.setValue(0);
    navigation.goBack();
  };

  return (
    <Layout>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.black} />

      <View
        style={{
          width: w(1),
          height: height,
          backgroundColor: colors.black,
        }}
      >
        <ImageBackground
          source={{ uri: content[current]?.storyMediaUrl }}
          onLoadEnd={() => {
            progress.setValue(0);
            onStart();
          }}
          style={{
            width: w(1),
            height: h(1),
            flexDirection: "row",
          }}
          resizeMode="contain"
        >
          <TouchableOpacity
            style={{ width: w(0.5), height: h(1) }}
            onPress={() => previous()}
          />
          <TouchableOpacity
            style={{ width: w(0.5), height: h(1) }}
            onPress={() => next()}
          />
        </ImageBackground>
        {/* below view is for  animated prgressbar  */}
        <View
          style={{
            position: "absolute",
            top: 10,
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {content.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: 3,
                  backgroundColor: colors.white45,
                  marginLeft: 5,
                  borderRadius: 5,
                  flexDirection: "row",
                }}
              >
                <Animated.View
                  style={{
                    flex:
                      current === index ? progress : content[index].finished,
                    height: 3,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                  }}
                />
              </View>
            );
          })}
        </View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[
            global.center,
            {
              backgroundColor: colors.white,
              borderRadius: 100,
              width: w(0.08),
              height: w(0.08),
              position: "absolute",
              top: h(0.04),
              right: w(0.03),
            },
          ]}
        >
          <Icon name={cross} size={w(0.05)} />
        </Pressable>
      </View>
    </Layout>
  );
};

export default Story;
