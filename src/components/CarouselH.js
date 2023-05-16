import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { h, w } from "../config/utilFunction";
import { fullscreen } from "../container/icons";
import Icon from "./Icon";

const { width } = Dimensions.get("screen");
export default function CarouselH({ data, onPress }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => [
    setCurrentIndex(viewableItems[0].index),
  ]).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: "absolute",
          bottom: h(0.03),
          zIndex: 100,
          right: w(0.05),
        }}
      >
        <Icon name={fullscreen} size={w(0.1)} />
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width,
              }}
            >
              <Image
                source={{ uri: item.uri }}
                style={{ width, height: h(0.27) }}
                resizeMode="cover"
              />
            </View>
          );
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
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
      <View
        style={{
          flexDirection: "row",
          paddingTop: 5,
          justifyContent: "center",
        }}
      >
        {data.map((v, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [7, 14, 7],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[styles.dots, { opacity, width: dotWidth }]}
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
    // height: h(0.3),
    // zIndex: 5000,
    // backgroundColor: 'red',
  },
  dots: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: "#000000",
    marginHorizontal: 3,
    marginTop: 5,
  },
});
