import React from 'react';
import {StyleSheet, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Gift from './Gift';
import Friends from './Friends';
import Setting from './Setting';
import PlaceHolder from '../../../components/PlaceHolder';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Gift />

      <PlaceHolder />

      <Friends />

      <Setting />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
