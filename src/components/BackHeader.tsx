import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import backtrack from '../assets/icon_backtrack.png';

type Props = {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      style={props.style}
      activeOpacity={0.7}
      onPress={props.onPress}>
      <Image style={styles.img} source={backtrack} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 14,
    height: 14,
    resizeMode: 'cover',
  },
});
