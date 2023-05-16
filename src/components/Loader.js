import {View, Text} from 'react-native';
import React from 'react';
import AppText from './AppText';
import colors from '../assets/colors';
import {ActivityIndicator} from 'react-native-paper';

const Loader = ({height, text}) => {
  return (
    <View
      style={{
        borderRadius: 10,

        width: '100%',
        height: height || 200,
        backgroundColor: colors.black40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={'large'} color={colors.white} />
      <AppText color={colors.white} text={text + '...' || 'Loading...'} />
    </View>
  );
};

export default Loader;
