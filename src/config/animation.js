import {Animated} from 'react-native';

export const moveVertical = ({name, pos, duration}) => {
  Animated.timing(name, {
    toValue: pos,
    duration: duration,
    useNativeDriver: true,
  }).start();
};
export const scaleVertical = ({name, pos, duration}) => {
  Animated.timing(name, {
    toValue: pos,
    duration: duration,
    useNativeDriver: false,
  }).start();
};

export const pressMove = name => {
  Animated.timing(name, {
    toValue: 5,
    duration: 100,
    useNativeDriver: true,
  }).start(() => {
    Animated.timing(name, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  });
};
