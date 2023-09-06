import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return <View style={[styles.root, props.style]} />;
};

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    backgroundColor: '#FF4288',
    borderRadius: 4,
  },
});
