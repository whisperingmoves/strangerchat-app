import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_details from '../../../assets/images/icons/icon_details.png';
import {DETAILS} from '../../../constants/chatDetail/Config';

type Props = {
  style: ViewStyle;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={props.style}>
      <LinearGradient
        colors={['#D988FF', '#8B5CFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.root}>
        <Image style={styles.icon} source={icon_details} />

        <Text style={styles.txt}>{DETAILS}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 86,
    height: 36,
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6,
    alignItems: 'center',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  icon: {
    width: 14,
    height: 12,
    resizeMode: 'cover',
  },
  txt: {
    color: '#FFF',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
