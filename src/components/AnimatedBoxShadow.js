import {Animated, View} from 'react-native';
import React from 'react';
import colors from '../assets/colors';

const AnimatedBoxShadow = ({size, top, height, width, radius, color}) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: top,
        height: size || height,
        width: size || width,
        borderRadius: radius || 500,
        backgroundColor: color || colors.black10,
        zIndex: -1,
      }}
    />
  );
};

export default AnimatedBoxShadow;
