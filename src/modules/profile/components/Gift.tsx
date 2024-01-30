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

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import icon_gift from '../../../assets/images/icons/icon_gift.png';
import {giftsReceived} from '../../../stores/user/slice';
import {useAppSelector} from '../../../hooks';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const tabBarHeight = useContext(TabBarHeightContext);

  const handlePress = useCallback(() => {
    navigation.push('MyGift', {tabBarHeight});
  }, [navigation, tabBarHeight]);

  const giftsReceivedValue = useAppSelector(giftsReceived);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Image style={styles.icon} source={icon_gift} />

      <Text style={styles.txt}>{giftsReceivedValue}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00000033',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 6,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  txt: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
