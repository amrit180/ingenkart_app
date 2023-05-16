import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../assets/colors";
import { pressMove } from "../config/animation";
import { h, w } from "../config/utilFunction";
import { onboardDone, rightArrow } from "../container/icons";
import Button from "./Button";
import Onboarding from "./Onboarding";
const { width } = Dimensions.get("screen");

export default function Carousel({ data }) {
  const buttonRef = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const navigation = useNavigation();
  const viewableItemsChanged = useRef(({ viewableItems }) => [
    setCurrentIndex(viewableItems[0].index),
  ]).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // for moving next slide and on last screen saving onboarding done
  const moveToNext = async () => {
    if (data?.length - 1 > currentIndex) {
      slidesRef.current.scrollToIndex({
        animated: true,
        index: data?.length - 1 > currentIndex && currentIndex + 1,
      });
    } else {
      await AsyncStorage.setItem("@user_onboarded", "true")
        .then(() => {
          navigation.replace("AuthStack");
        })
        .catch((err) => console.log(err.message));
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return <Onboarding {...item} index={index} />;
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        onPressIn={() => pressMove(buttonRef)}
        onPressOut={() => moveToNext()}
        style={{
          alignSelf: "center",
          marginTop: h(0.05),
          marginBottom: h(0.025),
        }}
      >
        <Button
          variant="round"
          size={w(0.13)}
          buttonRef={buttonRef}
          name={currentIndex == 2 ? onboardDone : rightArrow}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 5,
          justifyContent: "center",
        }}
      >
        {data.map((v, i) => {
          //   const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          //   const dotWidth = scrollX.interpolate({
          //     inputRange,
          //     outputRange: [10, 20, 10],
          //     extrapolate: 'clamp',
          //   });
          //   const opacity = scrollX.interpolate({
          //     inputRange,
          //     outputRange: [0.3, 1, 0.3],
          //     extrapolate: 'clamp',
          //   });

          return (
            <Animated.View
              style={[
                styles.dots,
                {
                  backgroundColor:
                    i == currentIndex ? colors.borderYellow : colors.white,
                },
              ]}
              key={i}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
  },
  dots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 5,
    borderColor: colors.black,
  },
});
