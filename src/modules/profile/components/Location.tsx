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
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_location from '../../../assets/images/icons/icon_location.png';

type Props = {
  location: string;
  color?: string;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const iconStyle: StyleProp<ImageStyle> = {
    tintColor: props.color ? props.color : '#FFF',
  };

  const txtStyle: StyleProp<TextStyle> = {
    color: props.color ? props.color : '#FFF',
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.root, props.style]}>
      <Image source={icon_location} style={[styles.icon, iconStyle]} />

      <Text style={[styles.txt, txtStyle]}>{props.location}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  icon: {
    width: 12,
    height: 16,
    resizeMode: 'cover',
  },
  txt: {
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
