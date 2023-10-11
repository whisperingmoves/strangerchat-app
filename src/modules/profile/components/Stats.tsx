import React from 'react';
import {StyleSheet, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Base from './Base';
import Line from './Line';
import {FOLLOW, FOLLOWING} from '../../../constants/Config';
import {VISITED_ME} from '../../../constants/profile/Config';

type Props = {
  followingCount: number;
  followCount: number;
  visitedCount: number;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Base count={props.followingCount} label={FOLLOWING} />

      <Line />

      <Base count={props.followCount} label={FOLLOW} />

      <Line />

      <Base count={props.visitedCount} label={VISITED_ME} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
