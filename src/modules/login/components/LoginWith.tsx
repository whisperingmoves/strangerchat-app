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
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {LOGIN_WITH} from '../../../constants/login/Config';

import icon_facebook from '../../../assets/images/icons/icon_facebook.png';
import icon_google from '../../../assets/images/icons/icon_google.png';
import icon_twitter from '../../../assets/images/icons/icon_twitter.png';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const iconList = [icon_facebook, icon_google, icon_twitter];

  return (
    <View style={[styles.root, props.style]}>
      <View style={styles.loginWith}>
        <View style={styles.verticalLine} />

        <Text style={styles.loginWithTxt}>{LOGIN_WITH}</Text>

        <View style={styles.verticalLine} />
      </View>

      <View style={styles.loginWithBtn}>
        {iconList.map((item, index) => {
          return (
            <TouchableOpacity activeOpacity={0.7} key={index}>
              <Image source={item} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'column',
    gap: 30,
    paddingHorizontal: 45,
  },
  loginWith: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  verticalLine: {
    width: 30,
    height: 0,
    borderWidth: 1,
    borderColor: '#C7C4CC',
  },
  loginWithTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  loginWithBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
