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
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_envelope from '../../../assets/images/icons/icon_envelope.png';
import HasNewIndicator from '../../../components/HasNewIndicator';
import {useAppSelector} from '../../../hooks';
import {unreadNotificationsCount} from '../store/slice';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const unreadNotificationsCountValue = useAppSelector(
    unreadNotificationsCount,
  );

  const tabBarHeight = useContext(TabBarHeightContext);

  const handlePress = useCallback(() => {
    navigation.push('Notification', {tabBarHeight});
  }, [navigation, tabBarHeight]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[props.style, styles.root]}
      onPress={handlePress}>
      <Image source={icon_envelope} style={styles.img} />

      {unreadNotificationsCountValue > 0 && (
        <HasNewIndicator style={styles.indicator} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 20,
    height: 16,
    resizeMode: 'cover',
  },
  indicator: {
    position: 'absolute',
    top: 23 - 8 - 4,
    right: 23 - 10 - 4,
  },
});
