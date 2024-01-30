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
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      style={[styles.root, props.style]}
      activeOpacity={0.7}
      onPress={props.onPress}>
      <Text style={styles.txt}>!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#B3261E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});
