import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  tabBarHeight: number;
};

export default (props: Props) => {
  const style: StyleProp<ViewStyle> = {
    height: props.tabBarHeight,
  };

  return <View style={[styles.root, style]} />;
};

const styles = StyleSheet.create({
  root: {
    width: 1,
  },
});
