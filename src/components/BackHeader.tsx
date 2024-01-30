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
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {
  ImageStyle,
  ViewStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_backtrack from '../assets/images/icons/icon_backtrack.png';

type Props = {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      style={props.style}
      activeOpacity={0.7}
      onPress={props.onPress}>
      <Image style={[styles.img, props.iconStyle]} source={icon_backtrack} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 14,
    height: 14,
    resizeMode: 'cover',
  },
});
