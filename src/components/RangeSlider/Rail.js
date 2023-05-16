import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../assets/colors';

const Rail = () => <View style={styles.root} />;

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.black30,
  },
});
