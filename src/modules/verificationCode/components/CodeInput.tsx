import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import InputItem from './InputItem';
import {isNumeric} from '../../../utils/validation';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {Mobile} from '../../login/store/slice';
import {resetStatus, status, verifyCodeAsync} from '../store/slice';
import {
  UserNotFoundErrorMessage,
  VerifyCodeRequest,
} from '../../../apis/verification/verifyCode';
import {BAD_REQUEST} from '../../../constants/api/Config';
import {CODE_ERROR} from '../../../constants/verificationCode/Config';
import Loading from '../../../components/Loading';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {GeoPosition} from 'react-native-geolocation-service';

type Props = {
  style: StyleProp<ViewStyle>;
  mobile: Mobile;
};

export default (props: Props) => {
  const inputRefList = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const [values, setValues] = useState(inputRefList.map(() => ''));

  const navigation = useNavigation<StackNavigationProp<any>>();

  const statusValue = useAppSelector(status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (statusValue === 'success') {
      dispatch(resetStatus());

      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'NavigationBar'}],
      // });
      Alert.alert('success');

      return;
    }

    if (statusValue === 'failed') {
      dispatch(resetStatus());

      const {error} = store.getState().verificationCode;

      if (error === UserNotFoundErrorMessage) {
        navigation.push('Gender', {mobile: props.mobile});
      } else if (error === BAD_REQUEST) {
        showError(CODE_ERROR);
      } else {
        showError(error);
      }

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const focusNext = (index: number) => {
    if (index < inputRefList.length - 1) {
      inputRefList[index + 1].current?.focus();
    }
  };

  const focusPrev = (index: number) => {
    if (index > 0) {
      inputRefList[index - 1].current?.focus();
    }
  };

  useEffect(() => {
    Clipboard.getString().then(text => {
      if (!text || !isNumeric(text)) {
        return;
      }

      const characters = text.split('');

      const newValues = values.slice();

      characters.forEach((character, index) => {
        if (index < inputRefList.length) {
          newValues[index] = character;
          if (index === inputRefList.length - 1) {
            inputRefList[index].current?.blur();
          } else {
            focusNext(index);
          }
        }
      });

      setValues(newValues);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      values.filter(item => item !== '').length === 6 &&
      statusValue !== 'loading'
    ) {
      const params: VerifyCodeRequest = {
        mobile: props.mobile,
        code: values.join(''),
      };

      const position: GeoPosition | undefined = store.getState().login.position;

      if (position) {
        params.longitude = position.coords.longitude;
        params.latitude = position.coords.latitude;
      }

      dispatch(verifyCodeAsync(params));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = (newValue: string, index: number) => {
    const newValues = values.slice();

    newValues[index] = newValue;

    setValues(newValues);
  };

  return (
    <View style={[styles.root, props.style]}>
      <Loading visible={statusValue === 'loading'} />

      {inputRefList.map((input, index) => (
        <InputItem
          key={index}
          inputRef={input}
          value={values[index]}
          onChange={newValue => handleChange(newValue, index)}
          onBackspace={() => focusPrev(index)}
          onSubmitEditing={() => focusNext(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
});
