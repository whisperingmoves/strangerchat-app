import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Route, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {
  VERIFICATION_CODE,
  VERIFICATION_CODE_DESC,
} from '../../constants/verificationCode/Config';
import CodeInput from './components/CodeInput';
import ReSendButton from './components/ReSendButton';

import BackHeader from '../../components/BackHeader';
import {Mobile} from '../login/store/slice';

type Props = {
  route: Route<string, {mobile: Mobile}>;
};

export default (props: Props) => {
  const {mobile} = props.route.params;

  const navigation = useNavigation<StackNavigationProp<any>>();

  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.root, statusBarStyle]}>
      <BackHeader onPress={handlePress} style={styles.backHeader} />

      <Text style={styles.titleTxt}>{VERIFICATION_CODE}</Text>

      <Text
        style={styles.descTxt}>{`${VERIFICATION_CODE_DESC} ${mobile}`}</Text>

      <CodeInput style={styles.codeInput} mobile={mobile} />

      <ReSendButton style={styles.resendBtn} mobile={mobile} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
  },
  backHeader: {
    marginTop: 16,
    marginLeft: -10,
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 34,
    color: '#554C5F',
    marginTop: 54,
  },
  descTxt: {
    color: '#8E8895',
    fontSize: 16,
    marginTop: 16,
  },
  codeInput: {
    marginTop: 60,
  },
  resendBtn: {
    marginTop: 30,
  },
});
