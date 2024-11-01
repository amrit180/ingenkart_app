import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../assets/colors';

const RailSelected = () => <View style={styles.root} />;

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 3,
    backgroundColor: colors.black70,
    borderRadius: 5,
  },
});
