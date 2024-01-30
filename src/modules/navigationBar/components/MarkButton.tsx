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
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {MARK_NOW} from '../../../constants/navigationBar/Config';
import {executeCheckinAsync, resetStatus, status} from '../store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {lastCheckDate, setUser} from '../../../stores/user/slice';
import {
  getCurrentUnixTimestampInSeconds,
  isTimestampToday,
} from '../../../utils/date';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const statusValue = useAppSelector(status);

  const lastCheckDateValue = useAppSelector(lastCheckDate);

  const todayIsCheckedIn = isTimestampToday(lastCheckDateValue as number);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (statusValue === 'success') {
      dispatch(resetStatus());

      const checkedDays =
        store.getState().navigationBar.payload?.checkedDays || 0;

      dispatch(
        setUser({
          checkedDays,
          lastCheckDate: getCurrentUnixTimestampInSeconds(),
        }),
      );

      return;
    }

    if (statusValue === 'failed') {
      dispatch(resetStatus());

      showError(store.getState().navigationBar.error);

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handlePress = () => {
    dispatch(executeCheckinAsync(store.getState().user.token));
  };

  return (
    <TouchableOpacity
      style={props.style}
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={todayIsCheckedIn}>
      <LinearGradient
        colors={['#D988FF', '#8B5CFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.container}>
        <Text style={styles.txt}>{MARK_NOW}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#FFF',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
