import React from 'react';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleSheet, View} from 'react-native';

type Props = {
  style?: ViewStyle;
};

export default (props: Props) => {
  return <View style={[styles.root, props?.style]} />;
};

const styles = StyleSheet.create({
  root: {
    width: 1,
    height: 36,
  },
});
