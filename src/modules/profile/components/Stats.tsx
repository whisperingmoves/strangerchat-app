import React, {useContext, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Base from './Base';
import Line from './Line';
import {FOLLOW, FOLLOWING} from '../../../constants/Config';
import {VISITED_ME} from '../../../constants/profile/Config';
import {useAppSelector} from '../../../hooks';
import {
  followersCount,
  followingCount,
  visitorsCount,
} from '../../../stores/user/slice';
import {
  followersCount as profileFollowersCount,
  followingCount as profileFollowingCount,
  visitorsCount as profileVisitorsCount,
} from '../store/slice';
import {UserIdContext} from '../context/UserIdContext';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const userFollowingCountValue = useAppSelector(followingCount);

  const userFollowersCountValue = useAppSelector(followersCount);

  const userVisitorsCountValue = useAppSelector(visitorsCount);

  const profileFollowingCountValue = useAppSelector(profileFollowingCount);

  const profileFollowersCountValue = useAppSelector(profileFollowersCount);

  const profileVisitorsCountValue = useAppSelector(profileVisitorsCount);

  const profileUserIdValue = useContext(UserIdContext);

  const followingCountValue = useMemo(
    () =>
      (profileUserIdValue
        ? profileFollowingCountValue
        : userFollowingCountValue) || 0,
    [profileFollowingCountValue, profileUserIdValue, userFollowingCountValue],
  );

  const followersCountValue = useMemo(
    () =>
      (profileUserIdValue
        ? profileFollowersCountValue
        : userFollowersCountValue) || 0,
    [profileFollowersCountValue, profileUserIdValue, userFollowersCountValue],
  );

  const visitorsCountValue = useMemo(
    () =>
      (profileUserIdValue
        ? profileVisitorsCountValue
        : userVisitorsCountValue) || 0,
    [profileUserIdValue, profileVisitorsCountValue, userVisitorsCountValue],
  );

  return (
    <View style={[styles.root, props.style]}>
      <Base count={followingCountValue} label={FOLLOWING} />

      <Line />

      <Base count={followersCountValue} label={FOLLOW} />

      <Line />

      <Base count={visitorsCountValue} label={VISITED_ME} />
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
