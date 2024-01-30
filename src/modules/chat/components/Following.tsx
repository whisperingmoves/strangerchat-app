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
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import icon_people from '../../../assets/images/icons/icon_people.png';
import {FOLLOWING} from '../../../constants/Config';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const tabBarHeight = useContext(TabBarHeightContext);

  const handlePress = useCallback(() => {
    navigation.push('MyFollowing', {tabBarHeight});
  }, [navigation, tabBarHeight]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Image source={icon_people} />

      <Text style={styles.txt}>{FOLLOWING}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F0F3',
  },
  txt: {
    color: '#554C5F',
    fontSize: 14,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
