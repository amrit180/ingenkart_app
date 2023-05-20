import React, { useRef, useEffect } from "react";
import {
  Animated,
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const ScrollAnimation = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const StickyComponent = () => {
    const translateY = scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styles.stickyContainer, { transform: [{ translateY }] }]}
      >
        <Text style={styles.stickyText}>Sticky Component</Text>
      </Animated.View>
    );
  };
  useEffect(() => {
    Animated.timing(scrollY, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 200 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <StickyComponent />
        {/* Your scrollable content */}
        <View style={styles.content}>
          <Text style={styles.text}>Scrollable Content</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollAnimation;

const styles = StyleSheet.create({
  stickyContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "blue",
    padding: 16,
  },
  stickyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    height: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
