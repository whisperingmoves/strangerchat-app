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
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_dropdown from '../../../assets/images/icons/icon_dropdown.png';
import {MOBILE_NUMBER} from '../../../constants/login/Config';

type Props = {
  style: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
  input: string;
  onSubmitEditing: () => void;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Text style={styles.areaCodeTxt}>+86</Text>

      <Image style={styles.dropDownIcon} source={icon_dropdown} />

      <View style={styles.verticalLine} />

      <TextInput
        style={styles.textInput}
        placeholder={MOBILE_NUMBER}
        placeholderTextColor={'#C7C4CC'}
        maxLength={11}
        keyboardType={'phone-pad'}
        value={props.input}
        onChangeText={props.onChangeText}
        returnKeyType={'send'}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 56,
    borderColor: '#C7C4CC',
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaCodeTxt: {
    color: '#1B1B1B',
    fontSize: 20,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  dropDownIcon: {
    marginLeft: 6,
    width: 8,
    height: 4,
    resizeMode: 'cover',
  },
  verticalLine: {
    width: 0,
    height: 21,
    borderWidth: 1,
    borderColor: '#C7C4CC',
    marginLeft: 16,
  },
  textInput: {
    flex: 1,
    color: '#1B1B1B',
    fontSize: 20,
    marginLeft: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
