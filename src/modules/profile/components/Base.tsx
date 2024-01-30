// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React, {useCallback, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  FollowersCount,
  FollowingCount,
  VisitorsCount,
} from '../../../stores/user/slice';
import {UserIdContext} from '../context/UserIdContext';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

type Props = {
  count: FollowingCount | FollowersCount | VisitorsCount;
  label: string;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const profileUserIdValue = useContext(UserIdContext);

  const tabBarHeight = useContext(TabBarHeightContext);

  const handlePress = useCallback(() => {
    if (profileUserIdValue) {
      return;
    }

    navigation.push('MyFollowing', {tabBarHeight});
  }, [navigation, profileUserIdValue, tabBarHeight]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Text style={styles.countTxt}>{props.count}</Text>

      <Text style={styles.labelTxt}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 4,
    alignItems: 'center',
  },
  countTxt: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  labelTxt: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
