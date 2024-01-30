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

import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';

import {userId} from '../../stores/user/slice';
import {useAppSelector} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {socket} from '../../apis/socket';

export default () => {
  const insets = useSafeAreaInsets();

  const userIdValue = useAppSelector(userId);

  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    setTimeout(() => {
      if (userIdValue) {
        navigation.reset({
          index: 0,
          routes: [{name: 'NavigationBar'}],
        });

        socket.connect();
      } else {
        navigation.replace('Login');
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  return (
    <LinearGradient
      style={[styles.root, statusBarStyle]}
      colors={['#D988FF', '#8B5CFF']}>
      <Text style={styles.txt}>{DeviceInfo.getApplicationName()}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
