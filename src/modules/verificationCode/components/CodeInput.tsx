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

import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {GeoPosition} from 'react-native-geolocation-service';
import {Language, setUser} from '../../../stores/user/slice';
import {socket} from '../../../apis/socket';
import {getLocales} from 'react-native-localize';

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

  const [languageCode, setLanguageCode] = useState<Language>('');

  useEffect(() => {
    if (statusValue === 'success') {
      dispatch(resetStatus());

      const payload: any = {
        ...store.getState().verificationCode.payload,
        mobile: props.mobile,
      };

      if (languageCode) {
        payload.language = languageCode;
      }

      dispatch(setUser(payload));

      navigation.reset({
        index: 0,
        routes: [{name: 'NavigationBar'}],
      });

      socket.connect();

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

      const locales = getLocales();

      if (locales.length > 0) {
        params.language = locales[0].languageCode;

        setLanguageCode(locales[0].languageCode);
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
