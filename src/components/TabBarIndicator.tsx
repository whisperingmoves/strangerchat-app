import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return <Animated.View style={[styles.root, props.style]} />;
};

const styles = StyleSheet.create({
  root: {
    width: 18,
    height: 4,
    backgroundColor: '#8B5CFF',
    borderRadius: 2,
  },
});
