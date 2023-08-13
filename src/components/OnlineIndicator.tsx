import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

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
    borderRadius: 4,
    backgroundColor: '#57F482',
    borderColor: '#FFF',
    borderWidth: 1,
  },
});
