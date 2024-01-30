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
