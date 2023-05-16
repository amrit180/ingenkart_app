import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import {h, w} from '../config/utilFunction';
import AppText from './AppText';
import {global} from '../styles';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setError} from '../redux/errorSlice';

const Error = ({text}) => {
  const {err} = useSelector(state => ({...state}));
  const dispatch = useDispatch();
  const animateOpactiy = () => {
    dispatch(
      setError({
        error: false,
        message: '',
        type: 'error',
      }),
    );
  };
  useEffect(() => {
    setTimeout(() => animateOpactiy(), 3000);
  }, []);

  return (
    <Animated.View
      style={[
        global.between,
        {
          opacity: err.error ? 1 : 0,
          backgroundColor: colors.black,
          borderRadius: 7,
          height: h(0.07),
          width: '90%',
          alignSelf: 'center',
          position: 'absolute',
          zIndex: 10000,
          bottom: h(0.07),
          borderWidth: 0.5,
          borderColor: colors.grey181,
          paddingHorizontal: w(0.05),
          //   display: err.error ? 'flex' : 'none',
        },
      ]}>
      <AppText text={text} color={colors.white} />
    </Animated.View>
  );
};

export default Error;