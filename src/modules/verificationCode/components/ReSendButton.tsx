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
import {Mobile, resetStatus, sendCodeAsync, status} from '../../login/slice';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import Loading from '../../../components/Loading';

type Props = {
  style: StyleProp<ViewStyle>;
  mobile: Mobile;
};

export default (props: Props) => {
  const [second, setSecond] = useState<number>(DURATION);
  const statusValue = useAppSelector(status);
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
    if (statusValue === 'success') {
      dispatch(resetStatus());

      LayoutAnimation.easeInEaseOut();

      setSecond(DURATION);

      createTimer();

      return;
    }

    if (statusValue === 'failed') {
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

    dispatch(sendCodeAsync(props.mobile));
  };

  return (
    <>
      <Loading visible={statusValue === 'loading'} />

      <TouchableOpacity
        style={props.style}
        activeOpacity={second === 0 ? 0.7 : 1}
        onPress={handlePress}>
        <Text style={[styles.txt, txtStyle]}>
          {second === 0 ? RESEND : RESEND_IN_SECONDS(second)}
        </Text>
      </TouchableOpacity>
    </>
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
