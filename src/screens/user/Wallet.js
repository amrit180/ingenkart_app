import React, { useState } from "react";
import { ScrollView, View, Animated, Text } from "react-native";

const Wallet = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  const translateY = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [-500, 0],
    extrapolate: "clamp",
  });

  return (
    <ScrollView
      onScroll={() => {
        setScrollY(scrollY + 1);
        if (scrollY >= 500) {
          setIsAnimated(true);
        }
      }}
    >
      <View style={styles.header}>
        <Text>This is the header</Text>
      </View>
      <View style={[styles.content, { transform: [{ translateY }] }]}>
        <Text>This is the content</Text>
      </View>
    </ScrollView>
  );
};

const styles = {
  header: {
    position: "sticky",
    top: 0,
  },
  content: {
    height: 100,
  },
};

export default Wallet;
