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
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  text: string;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Text style={styles.txt}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    minWidth: 16,
    maxWidth: 28,
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
