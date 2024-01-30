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

import React, {useEffect, useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {
  RESEND,
  RESEND_IN_SECONDS,
} from '../../../constants/verificationCode/Config';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  Mobile,
  resetStatus,
  scene,
  sendCodeAsync,
  setScene,
  status,
} from '../../login/store/slice';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';

type Props = {
  style: StyleProp<ViewStyle>;
  mobile: Mobile;
};

export default (props: Props) => {
  const [second, setSecond] = useState<number>(DURATION);

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer = createTimer();

    return () => {
      clearInterval(timer);
    };
  }, []);

  const createTimer = () => {
    const interval = setInterval(() => {
      setSecond(data => {
        if (data - 1 <= 0) {
          clearInterval(interval);
          return 0;
        }
        return data - 1;
      });
    }, 1000);

    return interval;
  };

  const txtStyle: StyleProp<TextStyle> = {
    color: second === 0 ? '#8B5CFF' : '#C7C4CC',
  };

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'verificationCode') {
      dispatch(resetStatus());

      LayoutAnimation.easeInEaseOut();

      setSecond(DURATION);

      createTimer();

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'verificationCode') {
      dispatch(resetStatus());

      const {error} = store.getState().login;

      showError(error);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handlePress = () => {
    if (second !== 0) {
      return;
    }

    dispatch(setScene('verificationCode'));

    dispatch(sendCodeAsync(props.mobile));
  };

  return (
    <TouchableOpacity
      style={props.style}
      activeOpacity={second === 0 ? 0.7 : 1}
      onPress={handlePress}>
      <Text style={[styles.txt, txtStyle]}>
        {second === 0 ? RESEND : RESEND_IN_SECONDS(second)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: '#8B5CFF',
    fontSize: 14,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

const DURATION = 60;
