import React from 'react';
import {StyleSheet, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Base from './Base';
import Line from './Line';
import {FOLLOW, FOLLOWING} from '../../../constants/Config';
import {VISITED_ME} from '../../../constants/profile/Config';
import {useAppSelector} from '../../../hooks';
import {
  FollowersCount,
  followersCount,
  FollowingCount,
  followingCount,
  VisitorsCount,
  visitorsCount,
} from '../../../stores/user/slice';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const followingCountValue = useAppSelector(followingCount);

  const followersCountValue = useAppSelector(followersCount);

  const visitorsCountValue = useAppSelector(visitorsCount);

  return (
    <View style={[styles.root, props.style]}>
      <Base count={followingCountValue as FollowingCount} label={FOLLOWING} />

      <Line />

      <Base count={followersCountValue as FollowersCount} label={FOLLOW} />

      <Line />

      <Base count={visitorsCountValue as VisitorsCount} label={VISITED_ME} />
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
