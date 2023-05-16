import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {h, w} from '../config/utilFunction';
import colors from '../assets/colors';
import Icon from './Icon';
import {comment, redheart, share, whiteheartoutline} from '../container/icons';

const ReelsButton = ({variant, liked, mb, onPress}) => {
  switch (variant) {
    case 'like':
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: w(0.1),
            width: w(0.1),
            backgroundColor: colors.white45,
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: h(mb) || 0,
          }}>
          <Icon name={liked ? redheart : whiteheartoutline} size={w(0.05)} />
        </TouchableOpacity>
      );
    case 'comment':
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: w(0.1),
            width: w(0.1),
            backgroundColor: colors.white45,
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: h(mb) || 0,
          }}>
          <Icon name={comment} size={w(0.05)} />
        </TouchableOpacity>
      );
    case 'share':
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: w(0.1),
            width: w(0.1),
            backgroundColor: colors.white45,
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: h(mb) || 0,
          }}>
          <Icon name={share} height={h(0.05)} width={w(0.05)} />
        </TouchableOpacity>
      );
  }
};

export default ReelsButton;
