import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {TOP_UP} from '../../../constants/Config';

type Props = {
  style: ViewStyle;
};

export default (props: Props) => {
  return <Text style={[styles.root, props.style]}>{TOP_UP}</Text>;
};

const styles = StyleSheet.create({
  root: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
