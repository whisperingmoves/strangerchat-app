import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {
  INVALID_MOBILE_NUMBER,
  MOBILE_NUMBER_CAN_NOT_BE_EMPTY,
  WELCOME,
  WELCOME_MESSAGE,
} from '../../constants/login/Config';
import Agree from './components/Agree';
import GetCodeButton from './components/Button';
import LoginWith from './components/LoginWith';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getLocationAsync,
  Mobile,
  resetStatus,
  scene,
  sendCodeAsync,
  setScene,
  status,
} from './store/slice';
import {isNumeric} from '../../utils/validation';
import {showError} from '../../utils/notification';
import {store} from '../../stores/store';
import MobileNumber from './components/MobileNumber';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export default () => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<StackNavigationProp<any>>();

  const [mobile, setMobile] = useState<Mobile>('');

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'login') {
      dispatch(resetStatus());

      dispatch(setScene('getLocation'));

      dispatch(getLocationAsync());
    } else if (statusValue === 'success' && sceneValue === 'getLocation') {
      dispatch(resetStatus());

      navigation.push('VerificationCode', {mobile});
    } else if (
      statusValue === 'failed' &&
      (sceneValue === 'login' || sceneValue === 'getLocation')
    ) {
      dispatch(resetStatus());

      const {error} = store.getState().login;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  const handlePress = () => {
    let errorMsg = '';

    if (!mobile) {
      errorMsg = MOBILE_NUMBER_CAN_NOT_BE_EMPTY;
    } else if (mobile.length < 11) {
      errorMsg = INVALID_MOBILE_NUMBER;
    }

    if (errorMsg) {
      showError(errorMsg);

      return;
    }

    dispatch(setScene('login'));

    dispatch(sendCodeAsync(mobile));
  };

  const handleChangeText = (text: string) => {
    if (text && !isNumeric(text)) {
      return;
    }

    setMobile(text);
  };

  return (
    <ScrollView style={[styles.root, statusBarStyle]}>
      <Text style={styles.titleTxt}>{WELCOME}</Text>

      <Text style={styles.descTxt}>{WELCOME_MESSAGE}</Text>

      <MobileNumber
        style={styles.mobileNumber}
        onChangeText={handleChangeText}
        input={mobile}
        onSubmitEditing={handlePress}
      />

      <Agree style={styles.agree} />

      <GetCodeButton style={styles.getCodeBtn} onPress={handlePress} />

      <LoginWith style={styles.loginWith} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 34,
    color: '#554C5F',
    marginTop: 84,
  },
  descTxt: {
    color: '#8E8895',
    fontSize: 16,
    marginTop: 16,
  },
  mobileNumber: {
    marginTop: 70,
  },
  agree: {
    marginTop: 20,
  },
  getCodeBtn: {
    marginTop: 64,
  },
  loginWith: {
    marginTop: 160,
  },
});
