import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      style={[styles.root, props.style]}
      activeOpacity={0.7}
      onPress={props.onPress}>
      <Text style={styles.txt}>!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#B3261E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});
