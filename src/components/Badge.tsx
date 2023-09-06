import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  text: string;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Text style={styles.txt}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    minWidth: 16,
    maxWidth: 28,
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
