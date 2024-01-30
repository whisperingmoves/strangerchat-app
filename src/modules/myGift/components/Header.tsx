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

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_backtrack from '../../../assets/images/icons/icon_backtrack.png';
import {MY_GIFT} from '../../../constants/myGift/Config';

type Props = {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.onPress}
        style={styles.btn}>
        <Image source={icon_backtrack} style={styles.icon} />
      </TouchableOpacity>

      <Text style={styles.txt}>{MY_GIFT}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    position: 'absolute',
    left: 20,
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: '#FFF',
    resizeMode: 'cover',
  },
  txt: {
    color: '#FFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
