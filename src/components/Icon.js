import {View, Text, Image} from 'react-native';
import React from 'react';

export default function Icon({name, size, width, height, styles}) {
  return size ? (
    <Image
      source={name}
      style={{
        width: size,
        height: size,

        resizeMode: 'contain',
      }}
    />
  ) : (
    <Image
      source={name}
      style={{
        width: width,
        height: height,
        resizeMode: 'contain',
      }}
    />
  );
}
